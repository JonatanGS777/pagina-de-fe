// js/profile.js - VERSIÓN CORREGIDA CON UID COMO ID

import { 
    checkAuthState, 
    logout, 
    getUserStats, 
    debugUserData,
    loadUserDataFromFirestore,
    saveUserDataToFirestore,
    getReliableJoinDate,
    cleanupDuplicateDocuments
} from './auth.js';
import { trackPageView, trackMinistryEvent } from './analytics.js';

// Variables globales
let currentUser = null;

// Acceso al store reactivo de Alpine.js (Alpine.store('profile', {...}) se
// registra en auth/profile.html vía el listener 'alpine:init', antes de que
// este módulo se ejecute).
function profileStore() {
    return window.Alpine.store('profile');
}

// 🔍 FUNCIÓN DE DIAGNÓSTICO ESPECIAL PARA JOINDATE
async function diagnoseJoinDateIssue() {
    console.log('🔍 ===== DIAGNÓSTICO DE JOINDATE =====');
    
    // 1. Verificar localStorage
    const localJoinDate = localStorage.getItem('joinDate');
    console.log('📱 localStorage joinDate:', localJoinDate);
    
    if (localJoinDate) {
        const localDate = new Date(localJoinDate);
        const now = new Date();
        const daysAgo = Math.floor((now - localDate) / (1000 * 60 * 60 * 24));
        
        // Cálculo mejorado de días
        const localDateOnly = new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDate());
        const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const daysAgoFixed = Math.floor((nowDateOnly - localDateOnly) / (1000 * 60 * 60 * 24));
        
        console.log('📱 localStorage: Registrado hace', daysAgo, 'días (método original)');
        console.log('📱 localStorage: Registrado hace', daysAgoFixed, 'días (método corregido)');
        console.log('📱 localStorage: Fecha formateada:', localDate.toLocaleDateString('es-ES'));
        console.log('📱 Fecha original:', localDate.toISOString());
        console.log('📱 Solo fecha local:', localDateOnly.toDateString());
        console.log('📱 Solo fecha hoy:', nowDateOnly.toDateString());
    }
    
    // 2. Verificar Firestore
    if (currentUser) {
        try {
            const firestoreData = await loadUserDataFromFirestore(currentUser.uid);
            if (firestoreData && firestoreData.joinDate) {
                const firestoreJoinDate = firestoreData.joinDate.toDate ? 
                    firestoreData.joinDate.toDate() : new Date(firestoreData.joinDate);
                const daysAgo = Math.floor((new Date() - firestoreJoinDate) / (1000 * 60 * 60 * 24));
                
                console.log('🔥 Firestore joinDate:', firestoreJoinDate.toISOString());
                console.log('🔥 Firestore: Registrado hace', daysAgo, 'días');
                console.log('🔥 Firestore: Fecha formateada:', firestoreJoinDate.toLocaleDateString('es-ES'));
                
                // Comparar fechas
                if (localJoinDate) {
                    const localDateObj = new Date(localJoinDate);
                    const timeDiff = Math.abs(firestoreJoinDate.getTime() - localDateObj.getTime());
                    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                    
                    if (daysDiff === 0) {
                        console.log('✅ localStorage y Firestore coinciden');
                    } else {
                        console.log('⚠️ DISCREPANCIA: localStorage y Firestore difieren por', daysDiff, 'días');
                        console.log('⚠️ Local:', localDateObj.toLocaleDateString('es-ES'));
                        console.log('⚠️ Firestore:', firestoreJoinDate.toLocaleDateString('es-ES'));
                    }
                }
            } else {
                console.log('🔥 No hay joinDate en Firestore');
            }
        } catch (error) {
            console.log('❌ Error accediendo a Firestore:', error);
        }
    }
    
    // 3. Obtener joinDate más confiable
    try {
        const reliableJoinDate = await getReliableJoinDate(currentUser?.uid);
        if (reliableJoinDate) {
            const reliableDate = new Date(reliableJoinDate);
            const now = new Date();
            const daysAgo = Math.floor((now - reliableDate) / (1000 * 60 * 60 * 24));
            
            // Cálculo corregido
            const reliableDateOnly = new Date(reliableDate.getFullYear(), reliableDate.getMonth(), reliableDate.getDate());
            const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const daysAgoFixed = Math.floor((nowDateOnly - reliableDateOnly) / (1000 * 60 * 60 * 24));
            
            console.log('🎯 JoinDate MÁS CONFIABLE:', reliableJoinDate);
            console.log('🎯 Registrado hace', daysAgo, 'días (método original)');
            console.log('🎯 Registrado hace', daysAgoFixed, 'días (método CORREGIDO)');
            console.log('🎯 Fecha que DEBERÍA mostrarse:', reliableDate.toLocaleDateString('es-ES'));
            
            // Información adicional para debugging
            console.log('🔧 Detalles de cálculo:');
            console.log('🔧 Fecha completa:', reliableDate.toISOString());
            console.log('🔧 Solo fecha registro:', reliableDateOnly.toDateString());
            console.log('🔧 Solo fecha hoy:', nowDateOnly.toDateString());
            console.log('🔧 Diferencia en ms:', nowDateOnly - reliableDateOnly);
            console.log('🔧 Diferencia en días:', (nowDateOnly - reliableDateOnly) / (1000 * 60 * 60 * 24));
        }
    } catch (error) {
        console.log('❌ Error obteniendo joinDate confiable:', error);
    }
    
    // 4. Mostrar historial de userHistory para ver cuándo se registró realmente
    try {
        const history = JSON.parse(localStorage.getItem('userHistory') || '[]');
        const registrationEntries = history.filter(item => item.action === 'daily_visit');
        
        if (registrationEntries.length > 0) {
            console.log('📚 Historial de visitas diarias:');
            registrationEntries.reverse().forEach((entry, index) => {
                const date = new Date(entry.timestamp);
                console.log(`📚 Visita #${entry.data?.visitNumber || index + 1}:`, date.toLocaleDateString('es-ES'), '- timestamp:', entry.timestamp);
            });
            
            // La primera entrada debería ser cerca del joinDate real
            const firstVisit = registrationEntries[0];
            if (firstVisit) {
                const firstVisitDate = new Date(firstVisit.timestamp);
                console.log('📚 Primera visita registrada:', firstVisitDate.toLocaleDateString('es-ES'));
                console.log('📚 Timestamp primera visita:', firstVisit.timestamp);
            }
        }
    } catch (error) {
        console.log('❌ Error revisando historial:', error);
    }
    
    console.log('🔍 ===== FIN DEL DIAGNÓSTICO =====');
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('🔄 Inicializando página de perfil...');
        
        // Verificar que el usuario esté logueado
        currentUser = await checkAuthState();
        
        if (!currentUser) {
            console.log('❌ Usuario no autenticado, redirigiendo...');
            window.location.href = '../index.html';
            return;
        }

        console.log('✅ Usuario autenticado con UID:', currentUser.uid);

        // EJECUTAR DIAGNÓSTICO AUTOMÁTICAMENTE
        await diagnoseJoinDateIssue();

        // Cargar datos del perfil
        await loadProfileData(currentUser);
        
        // Analytics
        trackPageView('Perfil de Usuario');
        trackMinistryEvent('profile_page_visit', {
            user_id: currentUser.uid
        });
        
        console.log('✅ Página de perfil inicializada correctamente');
        
    } catch (error) {
        console.error('❌ Error al inicializar perfil:', error);
        showErrorMessage('Error al cargar el perfil. Intenta recargar la página.');
    }
});

// Función para forzar recálculo de días
function forceRecalculateDays(joinDateStr) {
    try {
        console.log('🔧 Forzando recálculo de días para:', joinDateStr);
        
        const joinDate = new Date(joinDateStr);
        const now = new Date();
        
        // Cálculo corregido (solo fechas, sin horas)
        const joinDateOnly = new Date(joinDate.getFullYear(), joinDate.getMonth(), joinDate.getDate());
        const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const daysCorrected = Math.floor((nowDateOnly - joinDateOnly) / (1000 * 60 * 60 * 24));
        
        console.log('🔧 JoinDate completo:', joinDate.toISOString());
        console.log('🔧 JoinDate solo fecha:', joinDateOnly.toDateString());
        console.log('🔧 Hoy solo fecha:', nowDateOnly.toDateString());
        console.log('🔧 Días calculados:', daysCorrected);
        
        // Actualizar la interfaz
        const daysText = getDaysMemberTextFixed(daysCorrected);
        profileStore().daysMemberText = daysText;

        console.log('✅ Interfaz actualizada a:', daysText);
        
        return daysCorrected;
    } catch (error) {
        console.error('❌ Error en recálculo forzado:', error);
        return 0;
    }
}

async function loadProfileData(user) {
    try {
        console.log('📋 Cargando datos del perfil para:', user.displayName);
        
        // Debug: Mostrar datos actuales para ayudar con troubleshooting
        debugUserData();
        
        // ========================
        // DATOS BÁSICOS DEL USUARIO
        // ========================
        
        profileStore().name = user.displayName || 'Usuario';
        profileStore().email = user.email;
        profileStore().photo = user.photoURL ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'Usuario')}&background=5e4b8b&color=fff&size=100`;

        // Mostrar provider (siempre Google en este caso)
        profileStore().provider = 'Conectado con Google';
        
        // ========================
        // DATOS DE MEMBRESÍA Y ESTADÍSTICAS
        // ========================
        
        // Intentar obtener datos desde múltiples fuentes
        await loadMembershipData(user);
        
        // ========================
        // CARGAR HISTORIAL DE ACTIVIDAD
        // ========================
        
        loadUserActivity();
        
        console.log('📊 Datos del perfil cargados exitosamente');
        
    } catch (error) {
        console.error('❌ Error al cargar datos del perfil:', error);
        showErrorMessage('Error al cargar algunos datos del perfil.');
    }
}

async function loadMembershipData(user) {
    try {
        console.log('📊 Cargando datos de membresía...');
        
        // 1. Verificar datos en Firestore primero
        const firestoreData = await loadUserDataFromFirestore(user.uid);
        
        // 2. Obtener datos de localStorage
        const localStats = getUserStats();
        
        // 3. Obtener joinDate más confiable
        const reliableJoinDate = await getReliableJoinDate(user.uid);
        
        let finalData = null;
        
        if (firestoreData && reliableJoinDate) {
            // Combinar datos de Firestore con joinDate confiable
            // Corregir manejo de timestamps de Firestore
            let lastLoginStr = new Date().toISOString();
            if (firestoreData.lastLogin) {
                if (firestoreData.lastLogin.toDate) {
                    // Es un timestamp de Firestore
                    lastLoginStr = firestoreData.lastLogin.toDate().toISOString();
                } else if (typeof firestoreData.lastLogin === 'string') {
                    // Es un string ISO
                    lastLoginStr = firestoreData.lastLogin;
                } else {
                    // Es un objeto Date
                    lastLoginStr = new Date(firestoreData.lastLogin).toISOString();
                }
            }
            
            finalData = {
                joinDate: reliableJoinDate,
                visitCount: firestoreData.visitCount || 1,
                lastLogin: lastLoginStr,
                lastVisitDate: firestoreData.lastVisitDate || new Date().toDateString()
            };
            console.log('🔥 Usando datos combinados Firestore + joinDate confiable');
            
        } else if (localStats && localStats.isValidData) {
            // Usar datos locales
            finalData = localStats;
            console.log('💾 Usando datos de localStorage');
            
        } else {
            // Datos por defecto para usuario completamente nuevo
            console.log('⚠️ No hay datos válidos, creando datos por defecto');
            finalData = createDefaultUserData();
        }
        
        // Mostrar los datos en la interfaz
        displayMembershipData(finalData);
        
        // Forzar corrección inmediata del cálculo de días si es necesario
        setTimeout(() => {
            const currentDaysText = profileStore().daysMemberText;
            if (currentDaysText === 'Nuevo' && finalData.joinDate) {
                console.log('🔧 Detectado "Nuevo" incorrecto, forzando recálculo...');
                forceRecalculateDays(finalData.joinDate);
            }
        }, 100);
        
        // Sincronizar datos si hay discrepancias
        await syncDataIfNeeded(user.uid, finalData, firestoreData, localStats);
        
    } catch (error) {
        console.error('❌ Error al cargar datos de membresía:', error);
        // Fallback a datos locales o por defecto
        const localStats = getUserStats();
        if (localStats && localStats.isValidData) {
            displayMembershipData(localStats);
        } else {
            displayMembershipData(createDefaultUserData());
        }
    }
}

function createDefaultUserData() {
    const now = new Date();
    return {
        joinDate: now.toISOString(),
        visitCount: 1,
        lastLogin: now.toISOString(),
        lastVisitDate: now.toDateString(),
        daysSinceJoining: 0,
        isNewUser: true,
        isValidData: true
    };
}

// ========================
// FUNCIÓN PRINCIPAL CORREGIDA
// ========================
function displayMembershipData(data) {
    try {
        console.log('📋 Mostrando datos de membresía:', data);
        
        const joinDate = new Date(data.joinDate);
        const now = new Date();
        
        // CORRECCIÓN: Cálculo más preciso de días
        // Normalizar ambas fechas a medianoche para evitar problemas de hora
        const joinDateMidnight = new Date(joinDate);
        joinDateMidnight.setHours(0, 0, 0, 0);
        
        const nowMidnight = new Date(now);
        nowMidnight.setHours(0, 0, 0, 0);
        
        // Calcular diferencia en días
        const timeDiff = nowMidnight.getTime() - joinDateMidnight.getTime();
        const daysSinceJoining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        console.log('🔍 Detalles del cálculo CORREGIDO:');
        console.log('📅 joinDate original:', joinDate.toISOString());
        console.log('📅 joinDate medianoche:', joinDateMidnight.toISOString());
        console.log('📅 ahora medianoche:', nowMidnight.toISOString());
        console.log('📅 diferencia en ms:', timeDiff);
        console.log('📅 daysSinceJoining calculado:', daysSinceJoining);
        
        // ========================
        // FECHA DE REGISTRO
        // ========================
        
        profileStore().joinDateText =
            `Miembro desde: ${joinDate.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}`;

        // ========================
        // ESTADÍSTICAS EN TARJETAS
        // ========================

        // Contador de visitas
        profileStore().visitCount = data.visitCount || 1;

        // Días como miembro (con el cálculo CORREGIDO)
        const daysText = getDaysMemberTextFixed(daysSinceJoining);
        profileStore().daysMemberText = daysText;

        // Última visita
        displayLastVisitTime(data.lastLogin);

        // ========================
        // FECHA EN SECCIÓN DE ACTIVIDAD
        // ========================

        setRegistrationDateText(joinDate.toLocaleDateString('es-ES'));
        
        console.log('✅ Datos mostrados correctamente:', {
            joinDate: joinDate.toLocaleDateString('es-ES'),
            daysSinceJoining,
            visitCount: data.visitCount,
            daysText
        });
        
    } catch (error) {
        console.error('❌ Error al mostrar datos de membresía:', error);
        // Mostrar datos por defecto en caso de error
        const today = new Date();
        profileStore().joinDateText =
            `Miembro desde: ${today.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}`;
        profileStore().visitCount = '1';
        profileStore().daysMemberText = 'Nuevo';
        profileStore().lastVisitText = 'Ahora';
        setRegistrationDateText('Hoy');
    }
}

// El segundo item de actividad por defecto ("Te registraste exitosamente")
// muestra la fecha de registro en su descripción; equivalente reactivo del
// antiguo #registration-date.
function setRegistrationDateText(text) {
    const activities = profileStore().activities;
    if (activities && activities[1]) {
        activities[1].description = text;
    }
}

// ✅ FUNCIÓN CORREGIDA PARA SINCRONIZACIÓN
async function syncDataIfNeeded(userId, finalData, firestoreData, localStats) {
    try {
        console.log('🔄 Verificando si necesita sincronización para UID:', userId);
        
        let needsLocalSync = false;
        let needsFirestoreSync = false;
        
        // Verificar si localStorage necesita actualización
        if (!localStats || localStats.joinDate !== finalData.joinDate) {
            needsLocalSync = true;
            console.log('📱 localStorage necesita sincronización');
        }
        
        // Verificar si Firestore necesita actualización
        if (!firestoreData || !firestoreData.joinDate) {
            needsFirestoreSync = true;
            console.log('🔥 Firestore necesita sincronización (no hay joinDate)');
        } else {
            // Manejo seguro del timestamp de Firestore
            let firestoreJoinDateStr;
            if (firestoreData.joinDate.toDate) {
                firestoreJoinDateStr = firestoreData.joinDate.toDate().toISOString();
            } else if (typeof firestoreData.joinDate === 'string') {
                firestoreJoinDateStr = firestoreData.joinDate;
            } else {
                firestoreJoinDateStr = new Date(firestoreData.joinDate).toISOString();
            }
            
            if (firestoreJoinDateStr !== finalData.joinDate) {
                needsFirestoreSync = true;
                console.log('🔥 Firestore necesita sincronización (joinDate diferente)');
            }
        }
        
        // Sincronizar localStorage si es necesario
        if (needsLocalSync) {
            console.log('🔄 Sincronizando localStorage...');
            localStorage.setItem('joinDate', finalData.joinDate);
            localStorage.setItem('visitCount', finalData.visitCount.toString());
            localStorage.setItem('lastLogin', finalData.lastLogin);
            localStorage.setItem('lastVisitDate', finalData.lastVisitDate);
            
            showWarningMessage('Datos sincronizados localmente para corregir discrepancias.');
        }
        
        // ✅ SINCRONIZAR FIRESTORE USANDO UID COMO ID
        if (needsFirestoreSync && userId) {
            console.log('🔄 Sincronizando Firestore con UID como ID:', userId);
            
            // ✅ USAR LA FUNCIÓN CORREGIDA QUE USA UID COMO ID
            const success = await saveUserDataToFirestore(userId, {
                visitCount: finalData.visitCount,
                lastLogin: finalData.lastLogin,
                lastVisitDate: finalData.lastVisitDate,
                daysSinceJoining: finalData.daysSinceJoining || 0,
                isValidData: true
            }, true); // Preservar joinDate
            
            if (success) {
                console.log('✅ Sincronización con Firestore exitosa');
            } else {
                console.error('❌ Error en sincronización con Firestore');
            }
        }
        
    } catch (error) {
        console.error('❌ Error en sincronización:', error);
    }
}

// ========================
// FUNCIÓN CORREGIDA PARA DÍAS
// ========================
function getDaysMemberTextFixed(daysSinceJoining) {
    console.log('📊 Calculando texto para días:', daysSinceJoining);
    
    // Validar que sea un número válido
    if (isNaN(daysSinceJoining) || daysSinceJoining < 0) {
        console.log('⚠️ Días inválidos, mostrando "Nuevo"');
        return 'Nuevo';
    }
    
    // Manejo mejorado de diferentes casos
    if (daysSinceJoining === 0) {
        return 'Hoy'; // Cambio: en lugar de "Nuevo", mostrar "Hoy"
    } else if (daysSinceJoining === 1) {
        return '1 día';
    } else if (daysSinceJoining < 7) {
        return `${daysSinceJoining} días`;
    } else if (daysSinceJoining < 30) {
        const weeks = Math.floor(daysSinceJoining / 7);
        const remainingDays = daysSinceJoining % 7;
        if (weeks === 1 && remainingDays === 0) {
            return '1 semana';
        } else if (weeks === 1) {
            return `1 semana, ${remainingDays}d`;
        } else if (remainingDays === 0) {
            return `${weeks} semanas`;
        } else {
            return `${weeks} semanas, ${remainingDays}d`;
        }
    } else if (daysSinceJoining < 365) {
        const months = Math.floor(daysSinceJoining / 30);
        const remainingDays = daysSinceJoining % 30;
        if (months === 1 && remainingDays === 0) {
            return '1 mes';
        } else if (months === 1) {
            return `1 mes, ${remainingDays}d`;
        } else if (remainingDays === 0) {
            return `${months} meses`;
        } else {
            return `${months} meses, ${remainingDays}d`;
        }
    } else {
        const years = Math.floor(daysSinceJoining / 365);
        const remainingDays = daysSinceJoining % 365;
        const months = Math.floor(remainingDays / 30);
        
        if (years === 1 && months === 0) {
            return '1 año';
        } else if (years === 1) {
            return `1 año, ${months}m`;
        } else if (months === 0) {
            return `${years} años`;
        } else {
            return `${years} años, ${months}m`;
        }
    }
}

function displayLastVisitTime(lastLogin) {
    try {
        if (!lastLogin) {
            profileStore().lastVisitText = 'Ahora';
            return;
        }

        const lastDate = new Date(lastLogin);
        const now = new Date();
        const diffMinutes = Math.floor((now - lastDate) / (1000 * 60));

        let lastVisitText = 'Ahora';

        if (diffMinutes < 5) {
            lastVisitText = 'Ahora';
        } else if (diffMinutes < 60) {
            lastVisitText = `${diffMinutes}m`;
        } else if (diffMinutes < 1440) { // menos de 24 horas
            const hours = Math.floor(diffMinutes / 60);
            lastVisitText = `${hours}h`;
        } else {
            const days = Math.floor(diffMinutes / 1440);
            lastVisitText = `${days}d`;
        }

        profileStore().lastVisitText = lastVisitText;

    } catch (error) {
        console.error('❌ Error al calcular última visita:', error);
        profileStore().lastVisitText = 'Ahora';
    }
}

function loadUserActivity() {
    try {
        const history = JSON.parse(localStorage.getItem('userHistory') || '[]');

        if (history.length > 0) {
            // Reemplazar las actividades por defecto solo si hay historial real
            const recentHistory = history.slice(0, 5);
            const activities = recentHistory
                .map(createActivityItem)
                .filter(Boolean);

            if (activities.length > 0) {
                profileStore().activities = activities;
            }
        }

        console.log('📚 Actividades cargadas:', history.length, 'entradas en historial');

    } catch (error) {
        console.error('❌ Error al cargar historial:', error);
    }
}

// Devuelve un objeto {icon, title, description} para el store reactivo de
// Alpine.js (en vez de un nodo DOM); la plantilla x-for en profile.html lo
// renderiza.
function createActivityItem(historyItem) {
    try {
        let icon, title, description;
        const date = new Date(historyItem.timestamp);
        const timeAgo = getTimeAgo(date);

        const ICONS = {
            bookOpen: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7v14" /><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" /></svg>',
            clock: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>',
            calendarCheck: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>'
        };

        switch (historyItem.action) {
            case 'section_visit':
                icon = ICONS.bookOpen;
                title = `Visitaste: ${historyItem.data.section}`;
                description = timeAgo;
                break;
            case 'page_engagement':
                icon = ICONS.clock;
                title = `Tiempo en página: ${historyItem.data.timeSpent}s`;
                description = `${historyItem.data.page} - ${timeAgo}`;
                break;
            case 'daily_visit':
                icon = ICONS.calendarCheck;
                title = 'Nueva visita diaria';
                description = `Visita #${historyItem.data.visitNumber || ''} - ${timeAgo}`;
                break;
            default:
                return null;
        }

        return { icon, title, description };

    } catch (error) {
        console.error('❌ Error al crear item de actividad:', error);
        return null;
    }
}

function getTimeAgo(date) {
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Ahora mismo';
    if (diffMinutes < 60) return `Hace ${diffMinutes} minutos`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `Hace ${diffHours} horas`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `Hace ${diffDays} días`;
    
    return date.toLocaleDateString('es-ES');
}

// ========================
// FUNCIONES DE BOTONES CORREGIDAS
// ========================

// ✅ FUNCIÓN CORREGIDA PARA LIMPIAR HISTORIAL
window.clearHistory = async function() {
    if (confirm('¿Estás seguro de que quieres limpiar tu historial de actividad?\n\nEsto no afectará tus datos de cuenta, solo el registro de actividades.')) {
        try {
            if (!currentUser || !currentUser.uid) {
                console.error('❌ No hay usuario autenticado para limpiar historial');
                showErrorMessage('Error: Usuario no autenticado');
                return;
            }
            
            // Obtener joinDate confiable ANTES de limpiar
            const reliableJoinDate = await getReliableJoinDate(currentUser.uid);
            
            console.log('🧹 Limpiando historial, preservando joinDate:', reliableJoinDate);
            
            // Mantener datos esenciales pero limpiar actividad
            const essentialData = {
                'joinDate': reliableJoinDate || new Date().toISOString(),
                'uid': currentUser.uid,
                'name': currentUser.displayName,
                'email': currentUser.email,
                'photo': currentUser.photoURL,
                'provider': 'Google',
                'visitCount': '1', // Resetear a 1
                'lastLogin': new Date().toISOString(),
                'lastVisitDate': new Date().toDateString(),
                'isNewUser': 'false'
            };
            
            // Limpiar localStorage
            localStorage.clear();
            
            // Restaurar datos esenciales en localStorage
            Object.keys(essentialData).forEach(key => {
                if (essentialData[key]) {
                    localStorage.setItem(key, essentialData[key]);
                }
            });
            
            // ✅ ACTUALIZAR EN FIRESTORE USANDO UID COMO ID
            const success = await saveUserDataToFirestore(currentUser.uid, {
                visitCount: 1,
                lastLogin: new Date().toISOString(),
                lastVisitDate: new Date().toDateString(),
                daysSinceJoining: 0,
                isValidData: true
            }, true); // Preservar joinDate
            
            if (!success) {
                console.warn('⚠️ Error actualizando Firestore, pero localStorage fue limpiado');
            }
            
            // Analytics
            trackMinistryEvent('user_history_cleared', {
                user_id: currentUser.uid
            });
            
            showSuccessMessage('Historial limpiado exitosamente. JoinDate preservado.');
            
            // Recargar la página para mostrar los cambios
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            
        } catch (error) {
            console.error('❌ Error al limpiar historial:', error);
            showErrorMessage('Error al limpiar el historial');
        }
    }
};

window.deleteAccount = function() {
    if (confirm('⚠️ ¿Estás seguro de que quieres eliminar tu cuenta?\n\nEsta acción eliminará:\n• Todo tu historial de actividad\n• Tus preferencias guardadas\n• Tu progreso de estudio\n\n¡Esta acción NO se puede deshacer!')) {
        if (confirm('🔴 CONFIRMACIÓN FINAL\n\nSe eliminará toda tu información permanentemente.\n\n¿Estás absolutamente seguro de continuar?')) {
            try {
                // Analytics antes de eliminar
                trackMinistryEvent('account_deletion', {
                    user_id: currentUser?.uid,
                    reason: 'user_request'
                });
                
                // Limpiar todo el localStorage
                localStorage.clear();
                
                showSuccessMessage('Cuenta eliminada localmente. Serás redirigido al inicio...');
                
                // Cerrar sesión y redirigir
                setTimeout(() => {
                    logout();
                }, 2000);
                
            } catch (error) {
                console.error('❌ Error al eliminar cuenta:', error);
                showErrorMessage('Error al eliminar la cuenta');
            }
        }
    }
};

// ========================
// FUNCIONES DE MENSAJES
// ========================

function showWarningMessage(message) {
    showMessage(message, 'warning');
}

function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 350px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
        font-family: 'Poppins', sans-serif;
    `;
    
    let backgroundColor, icon;

    const ICON_CHECK = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11 3 3L22 4" /></svg>';
    const ICON_ALERT = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>';

    switch (type) {
        case 'success':
            backgroundColor = 'linear-gradient(135deg, #10b981, #059669)';
            icon = ICON_CHECK;
            break;
        case 'warning':
            backgroundColor = 'linear-gradient(135deg, #f59e0b, #d97706)';
            icon = ICON_ALERT;
            break;
        case 'error':
        default:
            backgroundColor = 'linear-gradient(135deg, #ef4444, #dc2626)';
            icon = ICON_ALERT;
            break;
    }

    messageDiv.style.background = backgroundColor;

    messageDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            ${icon}
            <span>${message}</span>
        </div>
    `;
    
    // Agregar CSS de animación si no existe
    if (!document.querySelector('#message-animation-style')) {
        const style = document.createElement('style');
        style.id = 'message-animation-style';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageDiv);
    
    // Auto-remover después de 4 segundos
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        messageDiv.style.opacity = '0';
        setTimeout(() => messageDiv.remove(), 300);
    }, 4000);
}

// ========================
// FUNCIONES GLOBALES PARA DEBUGGING Y LIMPIEZA
// ========================

window.diagnoseJoinDate = diagnoseJoinDateIssue;

window.showCurrentData = function() {
    console.log('📊 DATOS ACTUALES DEL PERFIL:');
    console.log('localStorage:', {
        joinDate: localStorage.getItem('joinDate'),
        visitCount: localStorage.getItem('visitCount'),
        lastLogin: localStorage.getItem('lastLogin'),
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        uid: localStorage.getItem('uid')
    });
    
    const stats = getUserStats();
    if (stats) {
        console.log('estadísticas calculadas:', stats);
    }
};

// Nueva función para forzar corrección inmediata
window.fixDaysCalculation = async function() {
    console.log('🔧 FORZANDO CORRECCIÓN DE CÁLCULO DE DÍAS...');
    
    const joinDate = localStorage.getItem('joinDate');
    if (!joinDate) {
        console.log('❌ No hay joinDate para corregir');
        return;
    }
    
    const result = forceRecalculateDays(joinDate);
    console.log('✅ Resultado del recálculo:', result);
};

// ✅ NUEVA FUNCIÓN PARA LIMPIAR DOCUMENTOS DUPLICADOS
window.cleanupFirestore = async function() {
    if (!currentUser) {
        console.error('❌ No hay usuario autenticado');
        return;
    }
    
    if (confirm('¿Quieres limpiar documentos duplicados en Firestore?\n\nEsto eliminará documentos con IDs incorrectos y dejará solo el documento correcto con tu UID.')) {
        try {
            console.log('🧹 Iniciando limpieza de Firestore...');
            const result = await cleanupDuplicateDocuments();
            
            showSuccessMessage(`Limpieza completada: ${result.deleted} documentos eliminados, ${result.valid} válidos.`);
            
            // Recargar después de limpieza
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            
        } catch (error) {
            console.error('❌ Error en limpieza:', error);
            showErrorMessage('Error al limpiar Firestore');
        }
    }
};

// Función adicional para debugging completo del estado actual
window.debugCurrentState = function() {
    console.log('🔍 === ESTADO COMPLETO ACTUAL ===');
    
    // Usuario actual
    console.log('👤 Usuario actual:', currentUser ? {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName
    } : 'Ninguno');
    
    // Datos en DOM
    console.log('📺 Datos mostrados en interfaz:');
    console.log('📺 Nombre:', document.getElementById('profile-name')?.textContent);
    console.log('📺 Email:', document.getElementById('profile-email')?.textContent);
    console.log('📺 Fecha registro:', document.getElementById('profile-join-date')?.textContent);
    console.log('📺 Días miembro:', document.getElementById('days-member')?.textContent);
    console.log('📺 Visitas:', document.getElementById('visit-count')?.textContent);
    console.log('📺 Última visita:', document.getElementById('last-visit')?.textContent);
    
    // Datos en localStorage
    console.log('💾 Datos en localStorage:');
    Object.keys(localStorage).forEach(key => {
        console.log(`💾 ${key}:`, localStorage.getItem(key));
    });
    
    // Recálculo manual
    const joinDate = localStorage.getItem('joinDate');
    if (joinDate) {
        console.log('🧮 Recálculo manual:');
        forceRecalculateDays(joinDate);
    }
    
    console.log('🔍 === FIN ESTADO COMPLETO ===');
};