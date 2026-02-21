// Comunidad/js/topic/auth-manager.js - GESTIÓN DE AUTENTICACIÓN

import { CONFIG } from './config.js';
import { showAuthRequired, showLoadingState, hideLoadingState } from './ui-helpers.js';

// Importar Firebase Auth
import { auth } from '../js/firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// 🔧 ESTADO DE AUTENTICACIÓN
let currentUser = null;
let authInitialized = false;
let getCurrentUser = null;
let trackMinistryEvent = null;

// 🔍 FUNCIÓN PRINCIPAL: Verificación robusta de autenticación
export async function checkAuthentication() {
    return new Promise((resolve) => {
        console.log('🔍 Verificando estado de autenticación...');
        
        // 1. Verificar si hay usuario en localStorage (sesión persistente)
        const storedUser = localStorage.getItem(CONFIG.STORAGE_KEYS.CURRENT_USER);
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                console.log('📱 Usuario encontrado en localStorage:', userData.displayName);
                currentUser = userData;
                authInitialized = true;
                resolve(true);
                return;
            } catch (error) {
                console.warn('⚠️ Error al parsear usuario de localStorage:', error);
                localStorage.removeItem(CONFIG.STORAGE_KEYS.CURRENT_USER);
            }
        }
        
        // 2. Verificar directamente con Firebase Auth
        if (auth.currentUser) {
            console.log('🔥 Usuario autenticado en Firebase:', auth.currentUser.displayName);
            currentUser = {
                uid: auth.currentUser.uid,
                displayName: auth.currentUser.displayName || 'Usuario',
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL
            };
            // Guardar en localStorage para futuras cargas
            localStorage.setItem(CONFIG.STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
            authInitialized = true;
            resolve(true);
            return;
        }
        
        // 3. Esperar cambios en el estado de autenticación (máximo 5 segundos)
        console.log('⏳ Esperando cambios en autenticación...');
        let timeoutId;
        
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            clearTimeout(timeoutId);
            unsubscribe(); // Limpiar listener
            
            if (user) {
                console.log('✅ Usuario autenticado detectado:', user.displayName);
                currentUser = {
                    uid: user.uid,
                    displayName: user.displayName || 'Usuario',
                    email: user.email,
                    photoURL: user.photoURL
                };
                // Guardar en localStorage
                localStorage.setItem(CONFIG.STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
                authInitialized = true;
                resolve(true);
            } else {
                console.log('❌ No hay usuario autenticado');
                authInitialized = true;
                resolve(false);
            }
        });
        
        // Timeout de seguridad
        timeoutId = setTimeout(() => {
            console.log('⏰ Timeout de autenticación - verificando localStorage una vez más...');
            unsubscribe();
            
            // Última verificación en localStorage
            const lastCheck = localStorage.getItem(CONFIG.STORAGE_KEYS.CURRENT_USER);
            if (lastCheck) {
                try {
                    currentUser = JSON.parse(lastCheck);
                    console.log('🔄 Usuario recuperado del localStorage en último intento');
                    authInitialized = true;
                    resolve(true);
                } catch {
                    authInitialized = true;
                    resolve(false);
                }
            } else {
                authInitialized = true;
                resolve(false);
            }
        }, CONFIG.AUTH_TIMEOUT);
    });
}

// 🔧 FUNCIÓN: Cargar módulos de auth y analytics con fallbacks
export async function loadAuthModules() {
    try {
        console.log('📦 Cargando módulos de auth y analytics...');
        
        // Intentar cargar módulos reales
        const authModule = await import('../js/auth.js');
        const analyticsModule = await import('../js/analytics.js');
        
        getCurrentUser = authModule.getCurrentUser;
        trackMinistryEvent = analyticsModule.trackMinistryEvent;
        
        console.log('✅ Módulos de auth y analytics cargados correctamente');
        
        // Verificar si getCurrentUser funciona
        if (typeof getCurrentUser === 'function') {
            const testUser = getCurrentUser();
            if (testUser) {
                console.log('✅ getCurrentUser funcionando:', testUser.displayName);
                currentUser = testUser;
                return true;
            }
        }
        
    } catch (error) {
        console.error('❌ Error al cargar módulos de auth/analytics:', error);
    }
    
    // Fallback: crear funciones de respaldo
    console.warn('🔄 Activando sistema de respaldo para auth...');
    getCurrentUser = () => currentUser;
    trackMinistryEvent = (event, params) => {
        console.log('📊 Analytics Event (modo respaldo):', event, params);
    };
    
    return false;
}

// 🔧 FUNCIÓN: Inicializar sistema de autenticación
export async function initializeAuth() {
    try {
        // 1️⃣ Cargar módulos de auth
        await loadAuthModules();
        
        // 2️⃣ Verificar autenticación de forma robusta
        const isAuthenticated = await checkAuthentication();
        
        if (!isAuthenticated) {
            console.log('👤 Usuario no autenticado – redirigiendo a login');
            hideLoadingState();
            showAuthRequired();
            return false;
        }
        
        console.log(`👤 ¡Bienvenido, ${currentUser.displayName}!`);
        return true;
        
    } catch (error) {
        console.error('❌ Error al inicializar autenticación:', error);
        return false;
    }
}

// 🔧 FUNCIÓN: Crear usuario temporal para modo de emergencia
export function createEmergencyUser() {
    currentUser = {
        uid: 'emergency_user_' + Date.now(),
        displayName: 'Usuario Temporal',
        email: 'temporal@ejemplo.com',
        photoURL: null
    };
    console.log('⚠️ Usuario temporal creado por emergencia');
    return currentUser;
}

// 🔧 GETTERS PARA ACCESO EXTERNO
export function getCurrentUserData() {
    return currentUser;
}

export function isAuthInitialized() {
    return authInitialized;
}

export function getGetCurrentUserFunction() {
    return getCurrentUser;
}

export function getTrackMinistryEventFunction() {
    return trackMinistryEvent;
}

// 🔧 FUNCIÓN: Verificar si el usuario es autor de un elemento
export function isAuthor(elementAuthorEmail) {
    return currentUser && currentUser.email === elementAuthorEmail;
}

// 🔧 FUNCIÓN: Verificar permisos de edición
export function canEdit(element) {
    if (!currentUser || !element) return false;
    
    // El usuario puede editar si es el autor
    if (element.author && element.author.email === currentUser.email) {
        return true;
    }
    
    // Aquí podrías agregar lógica para moderadores/administradores
    // if (currentUser.role === 'admin' || currentUser.role === 'moderator') {
    //     return true;
    // }
    
    return false;
}

// 🔧 FUNCIÓN: Verificar permisos de borrado
export function canDelete(element) {
    // Por ahora, los permisos de borrado son iguales a los de edición
    return canEdit(element);
}

// 🔧 FUNCIÓN: Verificar si el usuario puede reportar
export function canReport(element) {
    if (!currentUser || !element) return false;
    
    // Los usuarios no pueden reportar su propio contenido
    if (element.author && element.author.email === currentUser.email) {
        return false;
    }
    
    return true;
}

// 🔧 FUNCIÓN: Obtener datos de usuario para nuevos elementos
export function getUserDataForNewElement() {
    if (!currentUser) return null;
    
    return {
        name: currentUser.displayName || 'Usuario',
        email: currentUser.email,
        photo: currentUser.photoURL
    };
}

// 🔧 FUNCIÓN: Registrar evento de analytics (con fallback)
export function trackEvent(eventName, params = {}) {
    if (typeof trackMinistryEvent === 'function') {
        trackMinistryEvent(eventName, {
            user_id: currentUser?.uid || 'anonymous',
            ...params
        });
    } else {
        console.log('📊 Analytics Event (sin tracker):', eventName, params);
    }
}

// 🔧 FUNCIÓN: Limpiar datos de autenticación
export function clearAuthData() {
    currentUser = null;
    authInitialized = false;
    localStorage.removeItem(CONFIG.STORAGE_KEYS.CURRENT_USER);
    console.log('🧹 Datos de autenticación limpiados');
}

// 🔧 FUNCIÓN: Refrescar autenticación
export async function refreshAuth() {
    console.log('🔄 Refrescando autenticación...');
    clearAuthData();
    return await initializeAuth();
}

// 🔧 FUNCIÓN: Diagnosticar estado de autenticación
export function diagnoseAuthState() {
    return {
        authInitialized: authInitialized,
        currentUser: currentUser ? {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email
        } : null,
        localStorage: localStorage.getItem(CONFIG.STORAGE_KEYS.CURRENT_USER) ? 'Presente' : 'Ausente',
        firebaseUser: auth.currentUser ? {
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email
        } : null
    };
}

console.log('🔐 Gestor de autenticación cargado');