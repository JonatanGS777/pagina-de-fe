/**
 * set-admin-role.mjs
 * Asigna roles (admin / moderator / member) en Firestore → userProfiles/{uid}.role
 * usando las credenciales almacenadas del Firebase CLI.
 *
 * Uso:  node set-admin-role.mjs
 */

import { readFileSync } from 'fs';
import { homedir }      from 'os';
import { join }         from 'path';
import readline         from 'readline';

// ─── Configuración del proyecto ────────────────────────────────────────────
const PROJECT_ID = 'minist-la-gloria-es-del-senor';
const BASE_URL   = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

// ─── Leer access token del CLI de Firebase ─────────────────────────────────
function getAccessToken() {
    const cfgPath = join(homedir(), '.config', 'configstore', 'firebase-tools.json');
    const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));
    return cfg.tokens?.access_token;
}

// ─── Helper: petición autenticada ──────────────────────────────────────────
async function firestoreRequest(method, path, body) {
    const token = getAccessToken();
    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type':  'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
        const err = await res.text();
        throw new Error(`Firestore ${method} ${path} → ${res.status}: ${err}`);
    }
    return res.json();
}

// ─── Listar documentos de userProfiles ─────────────────────────────────────
async function listUsers() {
    const data = await firestoreRequest('GET', '/userProfiles');
    if (!data.documents) return [];

    return data.documents.map(doc => {
        const f  = doc.fields || {};
        const uid = doc.name.split('/').pop();
        return {
            uid,
            name:  f.name?.stringValue  || f.displayName?.stringValue || '—',
            email: f.email?.stringValue  || '—',
            role:  f.role?.stringValue   || 'member',
        };
    });
}

// ─── Actualizar rol en Firestore ────────────────────────────────────────────
async function setRole(uid, role) {
    await firestoreRequest(
        'PATCH',
        `/userProfiles/${uid}?updateMask.fieldPaths=role`,
        { fields: { role: { stringValue: role } } }
    );
}

// ─── Prompt helper ─────────────────────────────────────────────────────────
function prompt(question) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans.trim()); }));
}

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
    console.log('\n🔥 Conectando con Firestore del proyecto:', PROJECT_ID);
    console.log('─'.repeat(60));

    let users;
    try {
        users = await listUsers();
    } catch (e) {
        // El token puede haber expirado; intentar refrescarlo via firebase CLI
        if (e.message.includes('401')) {
            console.error('\n❌ Token expirado. Ejecuta: firebase login --reauth\n');
        } else {
            console.error('\n❌ Error conectando con Firestore:', e.message, '\n');
        }
        process.exit(1);
    }

    if (users.length === 0) {
        console.log('⚠️  No se encontraron usuarios en userProfiles.');
        process.exit(0);
    }

    console.log('\n👥 Usuarios registrados:\n');
    users.forEach((u, i) => {
        const roleBadge =
            u.role === 'admin'     ? '🔴 admin'     :
            u.role === 'moderator' ? '🟡 moderator' : '⚪ member';
        console.log(`  [${i + 1}] ${u.name.padEnd(30)} ${u.email.padEnd(35)} ${roleBadge}`);
    });

    console.log('\n');
    const idxStr = await prompt('Número del usuario al que asignar rol (o Enter para cancelar): ');
    if (!idxStr) { console.log('Cancelado.'); process.exit(0); }

    const idx = parseInt(idxStr, 10) - 1;
    if (isNaN(idx) || idx < 0 || idx >= users.length) {
        console.error('Número inválido.'); process.exit(1);
    }

    const selected = users[idx];
    console.log(`\n✅ Usuario seleccionado: ${selected.name} (${selected.email})`);
    console.log('   Rol actual:', selected.role);

    const roleStr = await prompt('\nRol a asignar  [admin / moderator / member]: ');
    const role = roleStr.toLowerCase();
    if (!['admin', 'moderator', 'member'].includes(role)) {
        console.error('Rol inválido. Usa: admin, moderator, o member.'); process.exit(1);
    }

    if (role === selected.role) {
        console.log(`\nℹ️  El usuario ya tiene el rol "${role}". Sin cambios.`);
        process.exit(0);
    }

    console.log(`\n🔄 Asignando rol "${role}" a ${selected.name}...`);
    await setRole(selected.uid, role);
    console.log(`✅ ¡Listo! ${selected.name} ahora tiene rol: ${role}\n`);
}

main().catch(e => { console.error(e); process.exit(1); });
