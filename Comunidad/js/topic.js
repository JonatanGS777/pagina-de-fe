// Comunidad/js/topic.js - SISTEMA DE TEMA INDIVIDUAL CON CARGADOR DE FONT AWESOME INTEGRADO

// Importar funciones de Firebase Firestore
import { db } from '../../js/firebase-config.js';
import { 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    getDoc,
    updateDoc, 
    deleteDoc, 
    orderBy, 
    query, 
    where,
    onSnapshot,
    serverTimestamp,
    increment,
    arrayUnion // ✅ AÑADIDO
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// 🔧 NUEVO: Importar Firebase Auth directamente para verificación robusta
import { auth } from '../../js/firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// Importar funciones reales de auth y analytics con manejo mejorado
let getCurrentUser, trackMinistryEvent;

// Variables globales
let currentUser = null;
let currentUserRole = 'member'; // 'member' | 'moderator' | 'admin'
let authInitialized = false;
let currentTopic = null;
let comments = [];
let currentTopicId = null;

// ─── Helper centralizado de permisos ─────────────────────────────────────────
// Devuelve true si el usuario actual es el autor de un objeto {author, authorUid}
// O si es admin/moderador (puede actuar sobre cualquier contenido).
function isAuthorOrAdmin(entity) {
    if (!currentUser) return false;
    if (currentUserRole === 'admin' || currentUserRole === 'moderator') return true;
    const a = entity?.author || {};
    return (
        (a.uid  && a.uid  === currentUser.uid)  ||
        (a.email && a.email === currentUser.email) ||
        (entity?.authorUid && entity.authorUid === currentUser.uid)
    );
}

// Referencias a las colecciones de Firestore
const topicsCollection = collection(db, 'forumTopics');

// Categorías del foro (compartidas con forum.js)
const categories = {
    estudios: {
        name: 'Estudios Bíblicos',
        description: 'Profundizando en la Palabra',
        icon: 'fas fa-bible',
        color: '#5e4b8b'
    },
    preguntas: {
        name: 'Preguntas y Respuestas',
        description: 'Dudas sobre la fe',
        icon: 'fas fa-question-circle',
        color: '#467b8a'
    },
    testimonios: {
        name: 'Testimonios',
        description: 'Experiencias de fe',
        icon: 'fas fa-heart',
        color: '#d1a35f'
    },
    oracion: {
        name: 'Peticiones de Oración',
        description: 'Orando juntos',
        icon: 'fas fa-praying-hands',
        color: '#10b981'
    },
    general: {
        name: 'Conversación General',
        description: 'Charlas fraternas',
        icon: 'fas fa-comments',
        color: '#f59e0b'
    }
};

// 📦 ============================================
// 🆕 NUEVA FUNCIÓN: CARGADOR DE FONT AWESOME
// ============================================

function loadFontAwesome() {
    return new Promise((resolve, reject) => {
        // Verificar si Font Awesome ya está cargado
        const existingLink = document.querySelector('link[href*="font-awesome"]');
        if (existingLink) {
            console.log('✅ Font Awesome ya está cargado');
            resolve(true);
            return;
        }
        
        console.log('📦 Cargando Font Awesome dinámicamente...');
        
        // Crear elemento link para Font Awesome
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
        link.integrity = 'sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==';
        link.crossOrigin = 'anonymous';
        link.referrerPolicy = 'no-referrer';
        
        // Event listeners para carga
        link.onload = () => {
            console.log('✅ Font Awesome cargado exitosamente');
            resolve(true);
        };
        
        link.onerror = () => {
            console.warn('❌ Error al cargar Font Awesome, usando fallback');
            // Cargar íconos SVG como fallback
            loadSVGIconsFallback();
            resolve(false);
        };
        
        // Agregar al head
        document.head.appendChild(link);
        
        // Timeout de seguridad
        setTimeout(() => {
            if (!link.sheet) {
                console.warn('⏰ Timeout cargando Font Awesome, usando fallback');
                loadSVGIconsFallback();
                resolve(false);
            }
        }, 5000);
    });
}

// 🔧 FUNCIÓN DE FALLBACK: Cargar íconos SVG si Font Awesome falla
function loadSVGIconsFallback() {
    console.log('🎨 Cargando íconos SVG como fallback...');
    
    // CSS para íconos SVG
    const style = document.createElement('style');
    style.id = 'svg-icons-fallback';
    style.textContent = `
        /* SVG Icons Fallback */
        .svg-icon {
            width: 1em;
            height: 1em;
            vertical-align: -0.125em;
            fill: currentColor;
            display: inline-block;
        }
        
        /* Reemplazar clases de Font Awesome con SVG cuando no está disponible */
        .fas.fa-share-alt::before,
        .fa-share-alt::before {
            content: '';
            width: 1em;
            height: 1em;
            display: inline-block;
            background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M384 336c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm-192-80c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm0-160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm96 218.5c0 4.6 4.1 8.1 8.5 7.6 29.8-3.6 56.1-17.8 74.5-39.2l108.2 47.4c3.4 1.5 7.4-.5 8.2-4.1 8.3-38.7-8.3-79.9-41.3-103.2L328.3 153.4c4.2-8.7 6.7-18.4 6.7-28.6 0-35.3-28.7-64-64-64s-64 28.7-64 64c0 10.2 2.5 19.9 6.7 28.6L105.1 222c-33 23.3-49.6 64.5-41.3 103.2.8 3.6 4.8 5.6 8.2 4.1l108.2-47.4c18.4 21.4 44.7 35.6 74.5 39.2 4.4.5 8.5-3 8.5-7.6z"/></svg>');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        
        .fab.fa-whatsapp::before,
        .fa-whatsapp::before {
            content: '';
            width: 1em;
            height: 1em;
            display: inline-block;
            background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56 81.2 56 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        
        .fab.fa-telegram-plane::before,
        .fa-telegram-plane::before {
            content: '';
            width: 1em;
            height: 1em;
            display: inline-block;
            background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"/></svg>');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        
        .fas.fa-envelope::before,
        .fa-envelope::before {
            content: '';
            width: 1em;
            height: 1em;
            display: inline-block;
            background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"/></svg>');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        
        .fas.fa-link::before,
        .fa-link::before {
            content: '';
            width: 1em;
            height: 1em;
            display: inline-block;
            background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"/></svg>');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        
        .fas.fa-spinner::before,
        .fa-spinner::before {
            content: '';
            width: 1em;
            height: 1em;
            display: inline-block;
            background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z"/></svg>');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        
        .fas.fa-chevron-right::before,
        .fa-chevron-right::before {
            content: '';
            width: 1em;
            height: 1em;
            display: inline-block;
            background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        
        /* Animación para spinner */
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .fa-spin {
            animation: spin 1s linear infinite;
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ Íconos SVG cargados como fallback');
}

// 📦 FIN DEL CARGADOR DE FONT AWESOME
// ============================================

// 🔧 NUEVA FUNCIÓN: Verificación robusta de autenticación
async function checkAuthentication() {
    return new Promise((resolve) => {
        console.log('🔍 Verificando estado de autenticación...');
        
        // 1. Verificar si hay usuario en localStorage (sesión persistente)
        const storedUser = localStorage.getItem('currentUser');
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
                localStorage.removeItem('currentUser');
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
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
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
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
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
            const lastCheck = localStorage.getItem('currentUser');
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
        }, 5000);
    });
}

// 🔧 FUNCIÓN MEJORADA: Cargar módulos de auth y analytics con fallbacks
async function loadAuthModules() {
    try {
        console.log('📦 Cargando módulos de auth y analytics...');
        
        // Intentar cargar módulos reales
        const authModule = await import('../../js/auth.js');
        const analyticsModule = await import('../../js/analytics.js');
        
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

// 🔧 FUNCIÓN PRINCIPAL: Inicialización con verificación robusta de auth
async function initializeTopicPage() {
    try {
        console.log('📖 Inicializando página de tema...');
        
        // 📦 🆕 CARGAR FONT AWESOME PRIMERO
        await loadFontAwesome();
        
        // Mostrar indicador de carga
        showLoadingState();
        
        // 1️⃣ Cargar módulos de auth
        await loadAuthModules();
        
        // 2️⃣ Verificar autenticación de forma robusta
        const isAuthenticated = await checkAuthentication();
        
        if (!isAuthenticated) {
            console.log('👤 Usuario no autenticado – redirigiendo a login');
            hideLoadingState();
            showAuthRequired();
            return;
        }
        
        console.log(`👤 ¡Bienvenido al tema, ${currentUser.displayName}!`);
        
        // 3️⃣ Cargar rol del usuario desde Firestore
        await loadUserRole();

        // 4️⃣ Obtener ID del tema desde URL o localStorage
        currentTopicId = getTopicIdFromURL();
        if (!currentTopicId) {
            hideLoadingState();
            showTopicNotFound();
            return;
        }
        
        // 5️⃣ Cargar tema y comentarios desde Firestore
        await loadTopic();
        await loadComments();

        // 6️⃣ Configurar listeners en tiempo real
        setupFirestoreListeners();

        // 7️⃣ Configurar event listeners
        setupEventListeners();

        // 8️⃣ Ocultar indicador de carga
        hideLoadingState();

        // 9️⃣ Analytics
        if (typeof trackMinistryEvent === 'function') {
            trackMinistryEvent('topic_page_visit', {
                user_id: currentUser.uid,
                topic_id: currentTopicId
            });
        }
        
        console.log('✅ Página de tema inicializada correctamente');
        
    } catch (error) {
        console.error('❌ Error al inicializar página de tema:', error);
        hideLoadingState();
        showErrorMessage('Error al cargar el tema. Algunos datos pueden no estar disponibles.');
        initializeFallbackMode();
    }
}

// 🔧 NUEVAS FUNCIONES: Estados de carga
function showLoadingState() {
    const container = document.querySelector('.topic-container');
    if (container) {
        container.style.opacity = '0.6';
        container.style.pointerEvents = 'none';
    }
    
    // Mostrar indicador en el breadcrumb
    const currentCategory = document.getElementById('current-category');
    if (currentCategory) {
        currentCategory.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
    }
}

function hideLoadingState() {
    const container = document.querySelector('.topic-container');
    if (container) {
        container.style.opacity = '1';
        container.style.pointerEvents = 'auto';
    }
}

// 🔧 FUNCIÓN MEJORADA: Mostrar requerimiento de autenticación con más opciones
function showAuthRequired() {
    const container = document.querySelector('.topic-container');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: var(--card-shadow); max-width: 500px; margin: 0 auto;">
                    <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: var(--gradient-bg); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-lock" style="font-size: 2rem; color: white;"></i>
                    </div>
                    <h2 style="color: var(--dark-color); margin-bottom: 15px;">Acceso Requerido</h2>
                    <p style="color: #666; margin-bottom: 15px;">Para ver este tema necesitas estar registrado en nuestra comunidad.</p>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 25px; font-size: 0.9rem; color: #666;">
                        <strong>💡 Diagnóstico:</strong><br>
                        • Estado auth: ${authInitialized ? 'Inicializado' : 'No inicializado'}<br>
                        • Usuario actual: ${currentUser ? currentUser.displayName : 'Ninguno'}<br>
                        • localStorage: ${localStorage.getItem('currentUser') ? 'Presente' : 'Ausente'}
                    </div>
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <button onclick="location.reload()" style="background: var(--secondary-color); color: white; padding: 12px 24px; border: none; border-radius: 8px; text-decoration: none; font-weight: 600; cursor: pointer;">
                            <i class="fas fa-refresh"></i> Recargar Página
                        </button>
                        <a href="../auth/login.html" style="display: inline-block; background: var(--gradient-bg); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                            <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
                        </a>
                        <a href="forum.html" style="display: inline-block; background: var(--light-accent); color: var(--text-color); padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                            <i class="fas fa-arrow-left"></i> Volver al Foro
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}

// Manejo robusto del estado del DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTopicPage);
    console.log('⏳ DOM aún cargando, esperando a DOMContentLoaded...');
} else {
    console.log('✅ DOM ya listo, inicializando inmediatamente...');
    initializeTopicPage();
}

// Cargar rol del usuario actual desde Firestore (userProfiles/{uid}.role)
async function loadUserRole() {
    try {
        if (!currentUser?.uid) return;
        const userRef = doc(db, 'userProfiles', currentUser.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
            currentUserRole = snap.data().role || 'member';
        }
        console.log(`👤 Rol del usuario: ${currentUserRole}`);
    } catch (err) {
        console.warn('⚠️ No se pudo cargar el rol del usuario:', err);
        currentUserRole = 'member';
    }
}

// NUEVO: Configurar listeners en tiempo real para comentarios
function setupFirestoreListeners() {
    if (!currentTopicId) return;
    
    try {
        // Escuchar cambios en los comentarios en tiempo real
        const commentsCollection = collection(db, 'forumTopics', currentTopicId, 'comments');
        const commentsQuery = query(commentsCollection, orderBy('createdAt', 'desc'));
        
        onSnapshot(commentsQuery, (snapshot) => {
            console.log('🔄 Actualizando comentarios desde Firestore...');
            
            comments = [];
            snapshot.forEach((doc) => {
                const commentData = doc.data();
                comments.push({
                    id: doc.id,
                    ...commentData,
                    // Convertir timestamps de Firestore a strings
                    createdAt: commentData.createdAt?.toDate?.()?.toISOString() || commentData.createdAt
                });
            });
            
            // Actualizar UI si ya está inicializada
            if (document.getElementById('comments-list')) {
                displayComments();
                updateTopicStats();
                console.log(`🔄 Comentarios actualizados: ${comments.length}`);
            }
        }, (error) => {
            console.error('❌ Error en listener de comentarios:', error);
            // Fallback a localStorage si Firestore falla
            loadCommentsFromLocalStorage();
        });
        
        console.log('✅ Listeners de comentarios configurados');
        
    } catch (error) {
        console.error('❌ Error al configurar listeners de comentarios:', error);
        loadCommentsFromLocalStorage();
    }
}

// Modo de respaldo si hay errores críticos
function initializeFallbackMode() {
    console.log('🔄 Inicializando modo de respaldo para tema...');
    
    // Solo crear usuario temporal si es absolutamente necesario
    if (!currentUser) {
        currentUser = {
            uid: 'emergency_user_' + Date.now(),
            displayName: 'Usuario Temporal',
            email: 'temporal@ejemplo.com',
            photoURL: null
        };
        console.log('⚠️ Usuario temporal creado por emergencia');
    }
    
    // Crear tema de ejemplo si no hay datos
    if (!currentTopic) {
        currentTopic = {
            id: 'emergency_topic',
            title: 'Tema de Emergencia',
            content: 'Este tema se cargó en modo de emergencia. Algunos datos pueden no estar disponibles.',
            category: 'general',
            author: {
                name: 'Sistema',
                email: 'sistema@ejemplo.com',
                photo: null
            },
            createdAt: new Date().toISOString(),
            likes: 0,
            replies: 0,
            views: 1,
            likedBy: [],
            bookmarkedBy: []
        };
        updateTopicUI();
    }
    
    // Inicializar comentarios vacíos
    comments = [];
    displayComments();
    
    // Configurar listeners básicos
    setupEventListeners();
    
    console.log('✅ Modo de respaldo activado para tema');
}

// Obtener ID del tema desde URL
function getTopicIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    let topicId = urlParams.get('id');
    
    // Si no hay ID en URL, intentar obtener desde localStorage (último tema visitado)
    if (!topicId) {
        topicId = localStorage.getItem('lastViewedTopic');
    }
    
    return topicId;
}

// ACTUALIZADO: Cargar datos del tema desde Firestore
async function loadTopic() {
    try {
        console.log('📋 Cargando tema desde Firestore:', currentTopicId);
        
        // Obtener tema desde Firestore
        const topicRef = doc(db, 'forumTopics', currentTopicId);
        const topicSnap = await getDoc(topicRef);
        
        if (!topicSnap.exists()) {
            showTopicNotFound();
            return;
        }
        
        const topicData = topicSnap.data();
        currentTopic = {
            id: topicSnap.id,
            ...topicData,
            // Convertir timestamps de Firestore a strings
            createdAt: topicData.createdAt?.toDate?.()?.toISOString() || topicData.createdAt,
            lastReply: topicData.lastReply?.toDate?.()?.toISOString() || topicData.lastReply
        };
        
        // Incrementar vistas en Firestore
        await updateDoc(topicRef, {
            views: increment(1)
        });
        
        // Actualizar UI
        updateTopicUI();
        
        console.log('✅ Tema cargado desde Firestore:', currentTopic.title);
        
    } catch (error) {
        console.error('❌ Error al cargar tema desde Firestore:', error);
        
        // Fallback a localStorage
        loadTopicFromLocalStorage();
    }
}

// Cargar tema desde localStorage como respaldo
function loadTopicFromLocalStorage() {
    try {
        console.log('🔄 Cargando tema desde localStorage como respaldo...');
        
        // Obtener temas del foro desde localStorage
        const topics = JSON.parse(localStorage.getItem('forumTopics') || '[]');
        currentTopic = topics.find(t => t.id === currentTopicId);
        
        if (!currentTopic) {
            showTopicNotFound();
            return;
        }
        
        // Incrementar vistas
        currentTopic.views = (currentTopic.views || 0) + 1;
        
        // Guardar temas actualizados
        const updatedTopics = topics.map(t => t.id === currentTopicId ? currentTopic : t);
        localStorage.setItem('forumTopics', JSON.stringify(updatedTopics));
        
        // Actualizar UI
        updateTopicUI();
        
        console.log('✅ Tema cargado desde localStorage:', currentTopic.title);
        
    } catch (error) {
        console.error('❌ Error al cargar tema desde localStorage:', error);
        showTopicNotFound();
    }
}

// Actualizar interfaz del tema
function updateTopicUI() {
    if (!currentTopic) return;
    
    const category = categories[currentTopic.category] || { name: 'General', icon: 'fas fa-comments', color: '#666' };
    
    // Breadcrumb
    const currentCategoryEl = document.getElementById('current-category');
    if (currentCategoryEl) {
        currentCategoryEl.textContent = category.name;
    }
    
    // Avatar del autor
    const authorAvatar = document.getElementById('author-avatar');
    if (authorAvatar) {
        if (currentTopic.author.photo) {
            authorAvatar.innerHTML = `<img src="${currentTopic.author.photo}" alt="${currentTopic.author.name}">`;
        } else {
            authorAvatar.innerHTML = `<div class="default-avatar">${currentTopic.author.name.charAt(0).toUpperCase()}</div>`;
        }
    }
    
    // Información del autor
    const authorNameEl = document.getElementById('author-name');
    const authorTimeEl = document.getElementById('author-time');
    const topicViewsEl = document.getElementById('topic-views');
    
    if (authorNameEl) authorNameEl.textContent = currentTopic.author.name;
    if (authorTimeEl) authorTimeEl.textContent = getTimeAgo(new Date(currentTopic.createdAt));
    if (topicViewsEl) topicViewsEl.textContent = `${currentTopic.views || 0} vistas`;
    
    // Categoría
    const categoryElement = document.getElementById('topic-category');
    if (categoryElement) {
        categoryElement.innerHTML = `<i class="${category.icon}"></i> ${category.name}`;
        categoryElement.style.backgroundColor = `${category.color}15`;
        categoryElement.style.color = category.color;
    }
    
    // Título y contenido
    const topicTitleEl = document.getElementById('topic-title');
    const topicBodyEl = document.getElementById('topic-body');
    
    if (topicTitleEl) topicTitleEl.textContent = currentTopic.title;
    if (topicBodyEl) topicBodyEl.innerHTML = formatTopicContent(currentTopic.content);
    
    // Versículo (si existe)
    if (currentTopic.verse) {
        const verseElement = document.getElementById('topic-verse');
        const verseTextEl = document.getElementById('verse-text');
        const verseRefEl = document.getElementById('verse-ref');
        
        if (verseTextEl) verseTextEl.textContent = `"${currentTopic.verse}"`;
        if (verseRefEl) verseRefEl.textContent = currentTopic.verseRef || 'Sagradas Escrituras';
        if (verseElement) verseElement.style.display = 'block';
    }
    
    // Botones de acción
    updateActionButtons();
    
    // 🆕 NUEVO: Agregar botones de editar/borrar para el autor del tema
    addTopicAuthorActions();
    
    // Estadísticas
    updateTopicStats();
    
    // Título de la página
    document.title = `${currentTopic.title} - Comunidad - Ministerio "La Gloria es del Señor"`;
}

// Formatear contenido del tema
function formatTopicContent(content) {
    return escapeHtml(content)
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/^/, '<p>')
        .replace(/$/, '</p>');
}

// Actualizar botones de acción
function updateActionButtons() {
    if (!currentTopic || !currentUser) return;
    
    // Botón de like
    const likeBtn = document.getElementById('like-btn');
    const likeCountEl = document.getElementById('like-count');
    
    if (likeBtn && likeCountEl) {
        const isLiked = currentTopic.likedBy && currentTopic.likedBy.includes(currentUser.uid);
        if (isLiked) {
            likeBtn.classList.add('liked');
        }
        likeCountEl.textContent = currentTopic.likes || 0;
    }
    
    // Botón de bookmark
    const bookmarkBtn = document.getElementById('bookmark-btn');
    if (bookmarkBtn) {
        const isBookmarked = currentTopic.bookmarkedBy && currentTopic.bookmarkedBy.includes(currentUser.uid);
        if (isBookmarked) {
            bookmarkBtn.classList.add('bookmarked');
            bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i> Guardado';
        }
    }
}

// Actualizar estadísticas del tema
function updateTopicStats() {
    if (!currentTopic) return;
    
    const commentsCountEl = document.getElementById('comments-count');
    const viewsCountEl = document.getElementById('views-count');
    const lastActivityEl = document.getElementById('last-activity');
    const totalCommentsEl = document.getElementById('total-comments');
    
    if (commentsCountEl) commentsCountEl.textContent = `${comments.length} comentarios`;
    if (totalCommentsEl) totalCommentsEl.textContent = comments.length;
    if (viewsCountEl) viewsCountEl.textContent = `${currentTopic.views || 0} vistas`;
    
    if (lastActivityEl) {
        const lastActivity = currentTopic.lastReply ? 
            getTimeAgo(new Date(currentTopic.lastReply)) : 
            getTimeAgo(new Date(currentTopic.createdAt));
        lastActivityEl.textContent = lastActivity;
    }
}

// ACTUALIZADO: Cargar comentarios desde Firestore
async function loadComments() {
    try {
        console.log('💬 Cargando comentarios desde Firestore...');
        
        if (!currentTopicId) return;
        
        // Obtener comentarios desde Firestore
        const commentsCollection = collection(db, 'forumTopics', currentTopicId, 'comments');
        const commentsQuery = query(commentsCollection, orderBy('createdAt', 'desc'));
        const commentsSnapshot = await getDocs(commentsQuery);
        
        comments = [];
        commentsSnapshot.forEach((doc) => {
            const commentData = doc.data();
            comments.push({
                id: doc.id,
                ...commentData,
                // Convertir timestamps de Firestore a strings
                createdAt: commentData.createdAt?.toDate?.()?.toISOString() || commentData.createdAt
            });
        });
        
        console.log(`💬 ${comments.length} comentarios cargados desde Firestore`);
        
        // Actualizar contadores
        updateTopicStats();
        
        // Mostrar comentarios
        displayComments();
        
    } catch (error) {
        console.error('❌ Error al cargar comentarios desde Firestore:', error);
        // Fallback a localStorage
        loadCommentsFromLocalStorage();
    }
}

// Cargar comentarios desde localStorage como respaldo
function loadCommentsFromLocalStorage() {
    try {
        console.log('🔄 Cargando comentarios desde localStorage como respaldo...');
        
        const storedComments = localStorage.getItem(`comments_${currentTopicId}`);
        comments = storedComments ? JSON.parse(storedComments) : [];
        
        console.log(`💬 ${comments.length} comentarios cargados desde localStorage`);
        
        // Actualizar contadores
        updateTopicStats();
        
        // Mostrar comentarios
        displayComments();
        
    } catch (error) {
        console.error('❌ Error al cargar comentarios desde localStorage:', error);
        comments = [];
        displayComments();
    }
}

// Mostrar comentarios
function displayComments() {
    const container = document.getElementById('comments-list');
    const emptyState = document.getElementById('empty-comments');
    
    if (!container) {
        console.error('❌ Container de comentarios no encontrado');
        return;
    }
    
    if (comments.length === 0) {
        container.innerHTML = '';
        if (emptyState) {
            container.appendChild(emptyState);
        }
        return;
    }
    
    // Ordenar comentarios según selección
    const sortSelect = document.getElementById('sort-comments');
    const sortBy = sortSelect ? sortSelect.value : 'newest';
    sortComments(sortBy);
    
    // Generar HTML de comentarios
    const commentsHTML = comments.map(comment => createCommentHTML(comment)).join('');
    container.innerHTML = commentsHTML;
    
    // Agregar event listeners
    setupCommentEventListeners();
    
    // Animaciones
    container.querySelectorAll('.comment').forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Crear HTML para un comentario
function createCommentHTML(comment, isReply = false) {
    const timeAgo = getTimeAgo(new Date(comment.createdAt));
    const isLiked = comment.likedBy && comment.likedBy.includes(currentUser.uid);
    const isAuthor = isAuthorOrAdmin(comment);
    
    const avatarHTML = comment.author.photo ? 
        `<img src="${comment.author.photo}" alt="${comment.author.name}">` :
        `<div class="default-avatar">${comment.author.name.charAt(0).toUpperCase()}</div>`;
    
    let repliesHTML = '';
    if (comment.replies && comment.replies.length > 0) {
        repliesHTML = `
            <div class="replies">
                ${comment.replies.map(reply => createCommentHTML(reply, true)).join('')}
            </div>
        `;
    }
    
    return `
        <div class="comment ${isReply ? 'reply' : ''}" data-comment-id="${comment.id}">
            <div class="comment-header">
                <div class="comment-author">
                    <div class="comment-avatar">${avatarHTML}</div>
                    <div class="comment-info">
                        <h4>${escapeHtml(comment.author.name)} ${comment.author.uid === currentUser.uid || comment.author.email === currentUser.email ? '<span style="color: var(--secondary-color); font-size: 0.8rem;">(Tú)</span>' : (currentUserRole === 'admin' || currentUserRole === 'moderator') ? '<span style="color: #b91c1c; font-size: 0.8rem;">(Mod)</span>' : ''}</h4>
                        <div class="comment-time">${timeAgo}</div>
                    </div>
                </div>
                <div class="comment-actions">
                    ${isAuthor ? `
                        <button class="comment-btn" onclick="editComment('${comment.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="comment-btn" onclick="deleteComment('${comment.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : `
                        <button class="comment-btn" onclick="reportComment('${comment.id}')">
                            <i class="fas fa-flag"></i>
                        </button>
                    `}
                </div>
            </div>
            
            <div class="comment-body">
                ${formatCommentContent(comment.content)}
            </div>
            
            <div class="comment-footer">
                <div class="comment-likes">
                    <button class="like-btn ${isLiked ? 'liked' : ''}" onclick="toggleCommentLike('${comment.id}')">
                        <i class="fas fa-heart"></i>
                        <span>${comment.likes || 0}</span>
                    </button>
                </div>
                ${!isReply ? `<button class="reply-btn" onclick="showReplyForm('${comment.id}')">Responder</button>` : ''}
            </div>
            
            ${!isReply ? `
                <div class="reply-form" id="reply-form-${comment.id}">
                    <textarea class="reply-textarea" placeholder="Escribe tu respuesta..." maxlength="500"></textarea>
                    <div class="reply-actions">
                        <button class="reply-submit" onclick="submitReply('${comment.id}')">Responder</button>
                        <button class="reply-cancel" onclick="hideReplyForm('${comment.id}')">Cancelar</button>
                    </div>
                </div>
            ` : ''}
            
            ${repliesHTML}
        </div>
    `;
}

// Formatear contenido del comentario
function formatCommentContent(content) {
    return escapeHtml(content)
        .replace(/\n/g, '<br>')
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
}

// Ordenar comentarios
function sortComments(sortBy) {
    switch (sortBy) {
        case 'newest':
            comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        case 'oldest':
            comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;
        case 'likes':
            comments.sort((a, b) => (b.likes || 0) - (a.likes || 0));
            break;
    }
}

// Configurar event listeners
function setupEventListeners() {
    console.log('🎯 Configurando event listeners de topic...');
    
    // Formulario de comentario principal
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', handleNewComment);
        console.log('✅ Formulario de comentario configurado');
    } else {
        console.warn('⚠️ Formulario de comentario no encontrado');
    }
    
    // Contador de caracteres
    const commentTextarea = document.getElementById('comment-text');
    if (commentTextarea) {
        commentTextarea.addEventListener('input', updateCharCounter);
        console.log('✅ Contador de caracteres configurado');
    } else {
        console.warn('⚠️ Textarea de comentario no encontrado');
    }
    
    // Ordenamiento de comentarios
    const sortSelect = document.getElementById('sort-comments');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            displayComments();
        });
        console.log('✅ Ordenamiento de comentarios configurado');
    } else {
        console.warn('⚠️ Select de ordenamiento no encontrado');
    }
    
    // Configurar botones de acción del tema
    const likeBtn = document.getElementById('like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', toggleTopicLike);
    }
    
    const bookmarkBtn = document.getElementById('bookmark-btn');
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', toggleTopicBookmark);
    }
    
    const scrollToCommentBtn = document.getElementById('scroll-to-comment-btn');
    if (scrollToCommentBtn) {
        scrollToCommentBtn.addEventListener('click', scrollToCommentForm);
    }
    
    // 📤 CRÍTICO: Configurar botón de compartir
    const shareTopicBtn = document.getElementById('share-topic-btn');
    if (shareTopicBtn) {
        shareTopicBtn.addEventListener('click', shareTopicThisTopic);
        console.log('✅ Botón de compartir configurado correctamente');
    } else {
        console.error('❌ BOTÓN DE COMPARTIR NO ENCONTRADO - Verifica que existe en el HTML con id="share-topic-btn"');
    }
    
    const reportTopicBtn = document.getElementById('report-topic-btn');
    if (reportTopicBtn) {
        reportTopicBtn.addEventListener('click', reportTopic);
    }
    
    console.log('🎯 Event listeners configurados');
}

// Configurar event listeners específicos de comentarios
function setupCommentEventListeners() {
    // Los event listeners se agregan directamente en el HTML mediante onclick
    // para simplificar el manejo de IDs dinámicos
}

// ACTUALIZADO: Manejar nuevo comentario con Firestore
async function handleNewComment(e) {
    e.preventDefault();
    
    const commentTextEl = document.getElementById('comment-text');
    const content = commentTextEl ? commentTextEl.value.trim() : '';
    
    if (!content) {
        showErrorMessage('Por favor, escribe un comentario.');
        return;
    }
    
    if (content.length < 10) {
        showErrorMessage('El comentario debe tener al menos 10 caracteres.');
        return;
    }
    
    // Deshabilitar botón de envío
    const submitBtn = document.getElementById('submit-comment');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Publicando...';
    }
    
    const newComment = {
        content: content,
        author: {
            name: currentUser.displayName || 'Usuario',
            email: currentUser.email,
            photo: currentUser.photoURL,
            uid: currentUser.uid // ✅ AÑADIR ESTA LÍNEA
        },
        likes: 0,
        likedBy: [],
        replies: []
    };
    
    try {
        // Guardar comentario en Firestore
        const commentsCollection = collection(db, 'forumTopics', currentTopicId, 'comments');
        const docRef = await addDoc(commentsCollection, {
            ...newComment,
            createdAt: serverTimestamp()
        });
        
        console.log('💬 Comentario guardado en Firestore con ID:', docRef.id);
        
        // Actualizar tema con última actividad
        await updateTopicLastActivity();
        
        // Limpiar formulario
        const commentForm = document.getElementById('comment-form');
        if (commentForm) commentForm.reset();
        updateCharCounter();
        
        // Analytics
        if (typeof trackMinistryEvent === 'function') {
            trackMinistryEvent('comment_created', {
                user_id: currentUser.uid,
                topic_id: currentTopicId,
                comment_length: content.length
            });
        }
        
        showSuccessMessage('¡Comentario publicado exitosamente!');
        
        console.log('💬 Nuevo comentario creado');
        
    } catch (error) {
        console.error('❌ Error al crear comentario:', error);
        
        // Fallback a localStorage
        newComment.id = generateId();
        newComment.createdAt = new Date().toISOString();
        comments.unshift(newComment);
        localStorage.setItem(`comments_${currentTopicId}`, JSON.stringify(comments));
        
        displayComments();
        updateTopicStats();
        
        showSuccessMessage('¡Comentario publicado exitosamente!');
        
    } finally {
        // Rehabilitar botón de envío
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Publicar comentario';
        }
    }
}

// ACTUALIZADO: Actualizar última actividad del tema en Firestore
async function updateTopicLastActivity() {
    try {
        const topicRef = doc(db, 'forumTopics', currentTopicId);
        await updateDoc(topicRef, {
            lastReply: serverTimestamp(),
            replies: increment(1)
        });
        console.log('✅ Última actividad del tema actualizada');
    } catch (error) {
        console.error('❌ Error al actualizar última actividad:', error);
        // Fallback a localStorage
        updateTopicInLocalStorage();
    }
}

// Actualizar contador de caracteres
function updateCharCounter() {
    const textarea = document.getElementById('comment-text');
    const counter = document.getElementById('char-count');
    if (textarea && counter) {
        counter.textContent = textarea.value.length;
        
        // Cambiar color según límite
        if (textarea.value.length > 900) {
            counter.style.color = '#e74c3c';
        } else if (textarea.value.length > 800) {
            counter.style.color = '#f39c12';
        } else {
            counter.style.color = '#666';
        }
    }
}

// ACTUALIZADO: Toggle like en tema con Firestore
async function toggleTopicLike() {
    if (!currentTopic || !currentUser) return;
    
    if (!currentTopic.likedBy) currentTopic.likedBy = [];
    
    const userIndex = currentTopic.likedBy.indexOf(currentUser.uid);
    const isLiking = userIndex === -1;
    
    try {
        const topicRef = doc(db, 'forumTopics', currentTopicId);
        
        if (isLiking) {
            // Agregar like
            await updateDoc(topicRef, {
                likes: increment(1),
                likedBy: [...currentTopic.likedBy, currentUser.uid]
            });
        } else {
            // Quitar like
            const newLikedBy = currentTopic.likedBy.filter(uid => uid !== currentUser.uid);
            await updateDoc(topicRef, {
                likes: increment(-1),
                likedBy: newLikedBy
            });
        }
        
        // Analytics
        if (typeof trackMinistryEvent === 'function') {
            trackMinistryEvent('topic_liked', {
                user_id: currentUser.uid,
                topic_id: currentTopicId,
                action: isLiking ? 'like' : 'unlike'
            });
        }
        
    } catch (error) {
        console.error('❌ Error al actualizar like del tema:', error);
        showErrorMessage('Error al actualizar el me gusta');
    }
}

// ACTUALIZADO: Toggle bookmark en tema con Firestore
async function toggleTopicBookmark() {
    if (!currentTopic || !currentUser) return;
    
    if (!currentTopic.bookmarkedBy) currentTopic.bookmarkedBy = [];
    
    const userIndex = currentTopic.bookmarkedBy.indexOf(currentUser.uid);
    const isBookmarking = userIndex === -1;
    
    try {
        const topicRef = doc(db, 'forumTopics', currentTopicId);
        
        if (isBookmarking) {
            // Agregar bookmark
            await updateDoc(topicRef, {
                bookmarkedBy: [...currentTopic.bookmarkedBy, currentUser.uid]
            });
            showSuccessMessage('Tema agregado a favoritos');
        } else {
            // Quitar bookmark
            const newBookmarkedBy = currentTopic.bookmarkedBy.filter(uid => uid !== currentUser.uid);
            await updateDoc(topicRef, {
                bookmarkedBy: newBookmarkedBy
            });
            showSuccessMessage('Tema removido de favoritos');
        }
        
        // Analytics
        if (typeof trackMinistryEvent === 'function') {
            trackMinistryEvent('topic_bookmarked', {
                user_id: currentUser.uid,
                topic_id: currentTopicId,
                action: isBookmarking ? 'bookmark' : 'unbookmark'
            });
        }
        
    } catch (error) {
        console.error('❌ Error al actualizar bookmark:', error);
        showErrorMessage('Error al actualizar favorito');
    }
}

// ACTUALIZADO: Toggle like en comentario con Firestore
async function toggleCommentLike(commentId) {
    const comment = findCommentById(commentId);
    if (!comment || !currentUser) return;
    
    if (!comment.likedBy) comment.likedBy = [];
    
    const userIndex = comment.likedBy.indexOf(currentUser.uid);
    const isLiking = userIndex === -1;
    
    try {
        const commentRef = doc(db, 'forumTopics', currentTopicId, 'comments', commentId);
        
        if (isLiking) {
            // Agregar like
            await updateDoc(commentRef, {
                likes: increment(1),
                likedBy: [...comment.likedBy, currentUser.uid]
            });
        } else {
            // Quitar like
            const newLikedBy = comment.likedBy.filter(uid => uid !== currentUser.uid);
            await updateDoc(commentRef, {
                likes: increment(-1),
                likedBy: newLikedBy
            });
        }
        
        // Analytics
        if (typeof trackMinistryEvent === 'function') {
            trackMinistryEvent('comment_liked', {
                user_id: currentUser.uid,
                comment_id: commentId,
                topic_id: currentTopicId,
                action: isLiking ? 'like' : 'unlike'
            });
        }
        
    } catch (error) {
        console.error('❌ Error al actualizar like del comentario:', error);
        showErrorMessage('Error al actualizar el me gusta');
    }
}

// 📤 ============================================
// 🆕 FUNCIONES DE COMPARTIR - NUEVAS Y MEJORADAS
// ============================================

// 🔧 FUNCIÓN PRINCIPAL DE COMPARTIR: Detecta plataforma y usa la mejor opción
async function shareTopicThisTopic() {
    if (!currentTopic) {
        showErrorMessage('No hay tema para compartir');
        return;
    }

    console.log('📤 Iniciando función de compartir...');

    const shareData = {
        title: `${currentTopic.title} - Comunidad Ministerio`,
        text: `${currentTopic.content.substring(0, 150)}...`,
        url: window.location.href
    };

    // Mostrar indicador de carga en el botón
    const shareBtn = document.getElementById('share-topic-btn');
    if (shareBtn) {
        const originalContent = shareBtn.innerHTML;
        shareBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Compartiendo...';
        shareBtn.disabled = true;
        
        // Restaurar botón después de un tiempo
        setTimeout(() => {
            shareBtn.innerHTML = originalContent;
            shareBtn.disabled = false;
        }, 2000);
    }

    try {
        // 1️⃣ Intentar Web Share API nativa (móviles y algunos navegadores)
        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            console.log('📱 Usando Web Share API nativa');
            await navigator.share(shareData);
            
            // Analytics
            if (typeof trackMinistryEvent === 'function') {
                trackMinistryEvent('topic_shared', {
                    user_id: currentUser?.uid || 'anonymous',
                    topic_id: currentTopicId,
                    method: 'native_share'
                });
            }
            
            showSuccessMessage('¡Tema compartido exitosamente!');
            return;
        }
    } catch (error) {
        console.log('⚠️ Web Share API falló, usando fallback:', error);
    }

    // 2️⃣ Fallback: Mostrar modal con opciones de compartir
    console.log('💻 Usando modal personalizado para compartir');
    showShareModal(shareData);
}

// 🆕 NUEVA FUNCIÓN: Modal de opciones de compartir
function showShareModal(shareData) {
    console.log('🎭 Mostrando modal de compartir...');
    
    // Crear modal si no existe
    let modal = document.getElementById('share-modal');
    if (!modal) {
        modal = createShareModal();
        document.body.appendChild(modal);
        console.log('✅ Modal de compartir creado');
    }

    // Actualizar contenido del modal
    updateShareModalContent(modal, shareData);
    
    // Mostrar modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Animación de entrada
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// 🆕 NUEVA FUNCIÓN: Crear estructura del modal
function createShareModal() {
    const modal = document.createElement('div');
    modal.id = 'share-modal';
    modal.className = 'share-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    modal.innerHTML = `
        <div class="share-content" style="
            background: white;
            border-radius: 16px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease;
            position: relative;
        ">
            <button class="close-modal" onclick="closeShareModal()" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
                padding: 5px;
                line-height: 1;
            ">×</button>
            
            <div class="share-header" style="text-align: center; margin-bottom: 25px;">
                <div style="
                    width: 60px;
                    height: 60px;
                    margin: 0 auto 15px;
                    background: var(--gradient-bg);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <i class="fas fa-share-alt" style="color: white; font-size: 24px;"></i>
                </div>
                <h3 style="margin: 0; color: var(--dark-color);">Compartir Tema</h3>
                <p id="share-topic-title" style="color: #666; font-size: 14px; margin: 5px 0 0 0;"></p>
            </div>

            <div class="share-options" style="display: grid; gap: 15px;">
                <div class="share-option" style="
                    display: flex;
                    align-items: center;
                    padding: 15px;
                    border: 2px solid #f0f0f0;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " onclick="copyTopicUrl()">
                    <div style="
                        width: 45px;
                        height: 45px;
                        background: #6366f1;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 15px;
                    ">
                        <i class="fas fa-link" style="color: white; font-size: 18px;"></i>
                    </div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0; font-size: 16px; color: var(--dark-color);">Copiar Enlace</h4>
                        <p style="margin: 0; font-size: 14px; color: #666;">Copia la URL del tema</p>
                    </div>
                    <i class="fas fa-chevron-right" style="color: #ccc;"></i>
                </div>

                <div class="share-option" style="
                    display: flex;
                    align-items: center;
                    padding: 15px;
                    border: 2px solid #f0f0f0;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " onclick="shareToWhatsApp()">
                    <div style="
                        width: 45px;
                        height: 45px;
                        background: #25d366;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 15px;
                    ">
                        <i class="fab fa-whatsapp" style="color: white; font-size: 20px;"></i>
                    </div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0; font-size: 16px; color: var(--dark-color);">WhatsApp</h4>
                        <p style="margin: 0; font-size: 14px; color: #666;">Compartir por WhatsApp</p>
                    </div>
                    <i class="fas fa-chevron-right" style="color: #ccc;"></i>
                </div>

                <div class="share-option" style="
                    display: flex;
                    align-items: center;
                    padding: 15px;
                    border: 2px solid #f0f0f0;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " onclick="shareToTelegram()">
                    <div style="
                        width: 45px;
                        height: 45px;
                        background: #0088cc;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 15px;
                    ">
                        <i class="fab fa-telegram-plane" style="color: white; font-size: 18px;"></i>
                    </div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0; font-size: 16px; color: var(--dark-color);">Telegram</h4>
                        <p style="margin: 0; font-size: 14px; color: #666;">Compartir por Telegram</p>
                    </div>
                    <i class="fas fa-chevron-right" style="color: #ccc;"></i>
                </div>

                <div class="share-option" style="
                    display: flex;
                    align-items: center;
                    padding: 15px;
                    border: 2px solid #f0f0f0;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " onclick="shareByEmail()">
                    <div style="
                        width: 45px;
                        height: 45px;
                        background: #ea4335;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 15px;
                    ">
                        <i class="fas fa-envelope" style="color: white; font-size: 18px;"></i>
                    </div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0; font-size: 16px; color: var(--dark-color);">Email</h4>
                        <p style="margin: 0; font-size: 14px; color: #666;">Enviar por correo electrónico</p>
                    </div>
                    <i class="fas fa-chevron-right" style="color: #ccc;"></i>
                </div>
            </div>

            <div style="text-align: center; margin-top: 25px;">
                <button onclick="closeShareModal()" style="
                    background: #f0f0f0;
                    color: #666;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                ">Cerrar</button>
            </div>
        </div>
    `;

    // Event listener para cerrar al hacer clic fuera del modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeShareModal();
        }
    });

    // CSS para hover effects
    const style = document.createElement('style');
    style.textContent = `
        .share-modal.active {
            opacity: 1 !important;
        }
        .share-modal.active .share-content {
            transform: scale(1) !important;
        }
        .share-option:hover {
            border-color: var(--secondary-color) !important;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
    `;
    document.head.appendChild(style);

    return modal;
}

// 🆕 NUEVA FUNCIÓN: Actualizar contenido del modal
function updateShareModalContent(modal, shareData) {
    const titleElement = modal.querySelector('#share-topic-title');
    if (titleElement) {
        titleElement.textContent = shareData.title;
    }
    
    // Guardar datos para las funciones de compartir
    modal.shareData = shareData;
}

// 🆕 NUEVA FUNCIÓN: Cerrar modal
function closeShareModal() {
    console.log('❌ Cerrando modal de compartir...');
    const modal = document.getElementById('share-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// 🆕 NUEVA FUNCIÓN: Copiar URL del tema
async function copyTopicUrl() {
    console.log('📋 Copiando URL del tema...');
    try {
        await navigator.clipboard.writeText(window.location.href);
        showSuccessMessage('¡Enlace copiado al portapapeles!');
        closeShareModal();
        
        // Analytics
        if (typeof trackMinistryEvent === 'function') {
            trackMinistryEvent('topic_shared', {
                user_id: currentUser?.uid || 'anonymous',
                topic_id: currentTopicId,
                method: 'copy_url'
            });
        }
    } catch (error) {
        console.error('Error al copiar:', error);
        
        // Fallback para navegadores que no soportan clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        showSuccessMessage('¡Enlace copiado al portapapeles!');
        closeShareModal();
    }
}

// 🆕 NUEVA FUNCIÓN: Compartir por WhatsApp
function shareToWhatsApp() {
    console.log('📱 Compartiendo por WhatsApp...');
    if (!currentTopic) return;
    
    const text = `*${currentTopic.title}*\n\n${currentTopic.content.substring(0, 200)}...\n\n📖 Lee más: ${window.location.href}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    
    window.open(url, '_blank');
    closeShareModal();
    
    // Analytics
    if (typeof trackMinistryEvent === 'function') {
        trackMinistryEvent('topic_shared', {
            user_id: currentUser?.uid || 'anonymous',
            topic_id: currentTopicId,
            method: 'whatsapp'
        });
    }
}

// 🆕 NUEVA FUNCIÓN: Compartir por Telegram
function shareToTelegram() {
    console.log('✈️ Compartiendo por Telegram...');
    if (!currentTopic) return;
    
    const text = `${currentTopic.title}\n\n${currentTopic.content.substring(0, 200)}...\n\n📖 Lee más: ${window.location.href}`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
    
    window.open(url, '_blank');
    closeShareModal();
    
    // Analytics
    if (typeof trackMinistryEvent === 'function') {
        trackMinistryEvent('topic_shared', {
            user_id: currentUser?.uid || 'anonymous',
            topic_id: currentTopicId,
            method: 'telegram'
        });
    }
}

// 🆕 NUEVA FUNCIÓN: Compartir por email
function shareByEmail() {
    console.log('📧 Compartiendo por Email...');
    if (!currentTopic) return;
    
    const subject = `Te comparto: ${currentTopic.title}`;
    const body = `Hola,\n\nQuería compartir contigo este tema de nuestra comunidad:\n\n"${currentTopic.title}"\n\n${currentTopic.content.substring(0, 300)}...\n\nPuedes leer el tema completo aquí: ${window.location.href}\n\n¡Bendiciones!`;
    
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    
    closeShareModal();
    
    // Analytics
    if (typeof trackMinistryEvent === 'function') {
        trackMinistryEvent('topic_shared', {
            user_id: currentUser?.uid || 'anonymous',
            topic_id: currentTopicId,
            method: 'email'
        });
    }
}

// 📤 FIN DE FUNCIONES DE COMPARTIR
// ============================================

// ============================================
// 🆕 FUNCIONES DE EDITAR Y BORRAR TEMA/COMENTARIOS
// ============================================

// ✅ FUNCIÓN CORREGIDA: Editar tema principal
async function editTopic() {
    if (!currentTopic || !currentUser) return;
    const canEdit = currentTopic.author?.uid === currentUser.uid ||
                    currentTopic.author?.email === currentUser.email;
    if (!canEdit) {
        showErrorMessage('Solo puedes editar tus propios temas');
        return;
    }
    console.log('✏️ Iniciando edición del tema...');

    // 1. Obtener el modal que YA EXISTE en el HTML
    const modal = document.getElementById('edit-topic-modal');
    if (!modal) {
        console.error('El modal de edición no se encontró en el HTML.');
        return;
    }

    // 2. Llenar el formulario con los datos actuales del tema
    document.getElementById('edit-topic-title').value = currentTopic.title;
    document.getElementById('edit-topic-category').value = currentTopic.category;
    document.getElementById('edit-topic-content').value = currentTopic.content;
    document.getElementById('edit-topic-verse').value = currentTopic.verse || '';
    document.getElementById('edit-topic-verse-ref').value = currentTopic.verseRef || '';

    // 3. Mostrar el modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// ✅ FUNCIÓN CORREGIDA: Cerrar modal de edición
function closeEditTopicModal() {
    const modal = document.getElementById('edit-topic-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        // Solo ocultamos el modal, no lo eliminamos
        modal.style.display = 'none'; 
    }
}

// 🔧 FUNCIÓN: Guardar cambios del tema
async function saveTopicChanges(event) {
    event.preventDefault();
    
    const titleInput = document.getElementById('edit-topic-title');
    const categorySelect = document.getElementById('edit-topic-category');
    const contentTextarea = document.getElementById('edit-topic-content');
    const verseTextarea = document.getElementById('edit-topic-verse');
    const verseRefInput = document.getElementById('edit-topic-verse-ref');
    const saveBtn = document.getElementById('save-topic-btn');
    
    const newTitle = titleInput.value.trim();
    const newCategory = categorySelect.value;
    const newContent = contentTextarea.value.trim();
    const newVerse = verseTextarea.value.trim();
    const newVerseRef = verseRefInput.value.trim();
    
    if (!newTitle || !newContent) {
        showErrorMessage('El título y contenido son obligatorios');
        return;
    }
    
    // Mostrar indicador de carga
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
    
    try {
        // Actualizar objeto del tema
        currentTopic.title = newTitle;
        currentTopic.category = newCategory;
        currentTopic.content = newContent;
        currentTopic.verse = newVerse || null;
        currentTopic.verseRef = newVerseRef || null;
        currentTopic.editedAt = new Date().toISOString();
        
        // Actualizar en Firestore
        const topicRef = doc(db, 'forumTopics', currentTopicId);
        await updateDoc(topicRef, {
            title: newTitle,
            category: newCategory,
            content: newContent,
            verse: newVerse || null,
            verseRef: newVerseRef || null,
            editedAt: serverTimestamp()
        });
        
        console.log('✅ Tema actualizado en Firestore');
        
        // Actualizar UI
        updateTopicUI();
        
        // Cerrar modal
        closeEditTopicModal();
        
        showSuccessMessage('¡Tema actualizado exitosamente!');
        
        // Analytics
        if (typeof trackMinistryEvent === 'function') {
            trackMinistryEvent('topic_edited', {
                user_id: currentUser.uid,
                topic_id: currentTopicId,
                title_changed: currentTopic.title !== newTitle,
                content_length: newContent.length
            });
        }
        
    } catch (error) {
        console.error('❌ Error al actualizar tema:', error);
        
        // Fallback a localStorage
        try {
            updateTopicInLocalStorage();
            updateTopicUI();
            closeEditTopicModal();
            showSuccessMessage('¡Tema actualizado exitosamente!');
        } catch (localError) {
            console.error('❌ Error en fallback localStorage:', localError);
            showErrorMessage('Error al guardar los cambios');
        }
        
    } finally {
        // Restaurar botón
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Guardar Cambios';
    }
}

// 🔧 FUNCIÓN: Borrar tema principal
async function deleteTopic() {
    if (!currentTopic || !currentUser) return;
    
    // Verificar que el usuario sea el autor del tema o admin/moderador
    if (!isAuthorOrAdmin(currentTopic)) {
        showErrorMessage('Solo puedes borrar tus propios temas');
        return;
    }
    
    const confirmMessage = `¿Estás seguro de que quieres borrar este tema?\n\n"${currentTopic.title}"\n\nEsta acción no se puede deshacer y se borrarán todos los comentarios asociados.`;
    
    if (!confirm(confirmMessage)) {
        return;
    }
    
    console.log('🗑️ Borrando tema...');
    
    try {
        // Mostrar indicador de carga
        showLoadingState();
        
        // Borrar todos los comentarios de la subcolección primero
        const commentsRef = collection(db, 'forumTopics', currentTopicId, 'comments');
        const commentsSnapshot = await getDocs(commentsRef);
        if (commentsSnapshot.size > 0) {
            await Promise.all(commentsSnapshot.docs.map(d => deleteDoc(d.ref)));
            console.log(`🗑️ ${commentsSnapshot.size} comentario(s) borrado(s) de la subcolección`);
        }

        // Borrar tema de Firestore
        const topicRef = doc(db, 'forumTopics', currentTopicId);
        await deleteDoc(topicRef);

        console.log('✅ Tema borrado de Firestore');
        
        // Analytics
        if (typeof trackMinistryEvent === 'function') {
            trackMinistryEvent('topic_deleted', {
                user_id: currentUser.uid,
                topic_id: currentTopicId,
                topic_title: currentTopic.title
            });
        }
        
        showSuccessMessage('Tema borrado exitosamente');
        
        // Redirigir al foro después de un breve delay
        setTimeout(() => {
            window.location.href = 'forum.html';
        }, 1500);
        
    } catch (error) {
        console.error('❌ Error al borrar tema:', error);
        
        // Fallback a localStorage
        try {
            const topics = JSON.parse(localStorage.getItem('forumTopics') || '[]');
            const updatedTopics = topics.filter(t => t.id !== currentTopicId);
            localStorage.setItem('forumTopics', JSON.stringify(updatedTopics));
            
            showSuccessMessage('Tema borrado exitosamente');
            
            setTimeout(() => {
                window.location.href = 'forum.html';
            }, 1500);
            
        } catch (localError) {
            console.error('❌ Error en fallback localStorage:', localError);
            showErrorMessage('Error al borrar el tema');
            hideLoadingState();
        }
    }
}

// 🔧 FUNCIÓN: Editar comentario
async function editComment(commentId) {
    const comment = findCommentById(commentId);
    if (!comment || !currentUser) return;
    
    // Solo el autor puede editar (los admin/mod no editan contenido ajeno, solo borran)
    const canEdit = comment.author.uid === currentUser.uid ||
                    comment.author.email === currentUser.email;
    if (!canEdit) {
        showErrorMessage('Solo puedes editar tus propios comentarios');
        return;
    }
    
    console.log('✏️ Editando comentario:', commentId);
    
    // Encontrar el elemento del comentario
    const commentElement = document.querySelector(`[data-comment-id="${commentId}"]`);
    if (!commentElement) return;
    
    const commentBody = commentElement.querySelector('.comment-body');
    if (!commentBody) return;
    
    // Guardar contenido original
    const originalContent = comment.content;
    
    // Crear formulario de edición inline
    commentBody.innerHTML = `
        <div class="edit-comment-form" style="width: 100%;">
            <textarea id="edit-comment-${commentId}" style="
                width: 100%;
                min-height: 100px;
                padding: 12px;
                border: 2px solid var(--primary-color);
                border-radius: 8px;
                font-family: 'Lato', sans-serif;
                font-size: 14px;
                resize: vertical;
                margin-bottom: 10px;
            " maxlength="1000">${escapeHtml(originalContent)}</textarea>
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button onclick="cancelEditComment('${commentId}', '${escapeHtml(originalContent).replace(/'/g, "\\'")}')" style="
                    background: #f0f0f0;
                    color: #666;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                ">Cancelar</button>
                <button onclick="saveCommentEdit('${commentId}', event)" style="
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                ">
                    <i class="fas fa-save"></i>
                    Guardar
                </button>
            </div>
        </div>
    `;
    
    // Enfocar el textarea
    const textarea = document.getElementById(`edit-comment-${commentId}`);
    if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
}

// 🔧 FUNCIÓN: Cancelar edición de comentario
function cancelEditComment(commentId, originalContent) {
    const commentElement = document.querySelector(`[data-comment-id="${commentId}"]`);
    if (!commentElement) return;
    
    const commentBody = commentElement.querySelector('.comment-body');
    if (!commentBody) return;
    
    // Restaurar contenido original
    commentBody.innerHTML = formatCommentContent(originalContent);
}

// 🔧 FUNCIÓN: Guardar edición de comentario
async function saveCommentEdit(commentId, event) {
    const textarea = document.getElementById(`edit-comment-${commentId}`);
    if (!textarea) return;
    
    const newContent = textarea.value.trim();
    
    if (!newContent) {
        showErrorMessage('El comentario no puede estar vacío');
        return;
    }
    
    if (newContent.length < 5) {
        showErrorMessage('El comentario debe tener al menos 5 caracteres');
        return;
    }
    
    const comment = findCommentById(commentId);
    if (!comment) return;
    
    // Mostrar indicador de carga en el botón
    const saveBtn = event.target;
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
    
    try {
        // Actualizar comentario
        comment.content = newContent;
        comment.editedAt = new Date().toISOString();
        
        // Actualizar en Firestore
        const commentRef = doc(db, 'forumTopics', currentTopicId, 'comments', commentId);
        await updateDoc(commentRef, {
            content: newContent,
            editedAt: serverTimestamp()
        });
        
        console.log('✅ Comentario actualizado en Firestore');
        
        // Actualizar UI
        const commentElement = document.querySelector(`[data-comment-id="${commentId}"]`);
        const commentBody = commentElement.querySelector('.comment-body');
        commentBody.innerHTML = formatCommentContent(newContent) + 
            '<div style="font-size: 12px; color: #999; margin-top: 8px; font-style: italic;">Editado</div>';
        
        showSuccessMessage('Comentario actualizado exitosamente');
        
        // Analytics
        if (typeof trackMinistryEvent === 'function') {
            trackMinistryEvent('comment_edited', {
                user_id: currentUser.uid,
                comment_id: commentId,
                topic_id: currentTopicId,
                content_length: newContent.length
            });
        }
        
    } catch (error) {
        console.error('❌ Error al actualizar comentario:', error);
        
        // Fallback a localStorage
        try {
            localStorage.setItem(`comments_${currentTopicId}`, JSON.stringify(comments));
            
            const commentElement = document.querySelector(`[data-comment-id="${commentId}"]`);
            const commentBody = commentElement.querySelector('.comment-body');
            commentBody.innerHTML = formatCommentContent(newContent) + 
                '<div style="font-size: 12px; color: #999; margin-top: 8px; font-style: italic;">Editado</div>';
            
            showSuccessMessage('Comentario actualizado exitosamente');
            
        } catch (localError) {
            console.error('❌ Error en fallback localStorage:', localError);
            showErrorMessage('Error al guardar los cambios');
            
            // Restaurar contenido original
            cancelEditComment(commentId, comment.content);
        }
    }
}

// 🔧 FUNCIÓN: Borrar comentario
async function deleteComment(commentId) {
    const comment = findCommentById(commentId);
    if (!comment || !currentUser) return;

    if (!isAuthorOrAdmin(comment)) {
        showErrorMessage('Solo puedes borrar tus propios comentarios');
        return;
    }
    
    const confirmMessage = `¿Estás seguro de que quieres borrar este comentario?\n\nEsta acción no se puede deshacer.`;
    
    if (!confirm(confirmMessage)) {
        return;
    }
    
    console.log('🗑️ Borrando comentario:', commentId);
    
    try {
        // Borrar de Firestore
        const commentRef = doc(db, 'forumTopics', currentTopicId, 'comments', commentId);
        await deleteDoc(commentRef);

        // Decrementar contador de replies en el tema
        try {
            const topicRef = doc(db, 'forumTopics', currentTopicId);
            await updateDoc(topicRef, { replies: increment(-1) });
        } catch (e) {
            console.warn('⚠️ No se pudo decrementar el contador de replies:', e);
        }

        console.log('✅ Comentario borrado de Firestore');

        // Analytics
        if (typeof trackMinistryEvent === 'function') {
            trackMinistryEvent('comment_deleted', {
                user_id: currentUser.uid,
                comment_id: commentId,
                topic_id: currentTopicId
            });
        }
        
        showSuccessMessage('Comentario borrado exitosamente');
        
    } catch (error) {
        console.error('❌ Error al borrar comentario:', error);
        
        // Fallback a localStorage
        try {
            // Remover comentario del array
            comments = comments.filter(c => c.id !== commentId);
            
            // También buscar en respuestas
            comments.forEach(c => {
                if (c.replies) {
                    c.replies = c.replies.filter(r => r.id !== commentId);
                }
            });
            
            localStorage.setItem(`comments_${currentTopicId}`, JSON.stringify(comments));
            
            // Actualizar UI
            displayComments();
            updateTopicStats();
            
            showSuccessMessage('Comentario borrado exitosamente');
            
        } catch (localError) {
            console.error('❌ Error en fallback localStorage:', localError);
            showErrorMessage('Error al borrar el comentario');
        }
    }
}

// 🔧 FUNCIÓN: Reportar comentario
function reportComment(commentId) {
    const comment = findCommentById(commentId);
    if (!comment) return;
    
    const confirmMessage = `¿Quieres reportar este comentario?\n\nEsto notificará a los moderadores sobre contenido potencialmente inapropiado.`;
    
    if (confirm(confirmMessage)) {
        // En una implementación real, esto enviaría un reporte al sistema de moderación
        showSuccessMessage('Comentario reportado. Los moderadores revisarán el contenido.');
        
        // Analytics
        if (typeof trackMinistryEvent === 'function') {
            trackMinistryEvent('comment_reported', {
                user_id: currentUser.uid,
                comment_id: commentId,
                topic_id: currentTopicId,
                reason: 'user_report'
            });
        }
    }
}

// 🔧 FUNCIÓN: Agregar botones de acción del autor al tema
function addTopicAuthorActions() {
    if (!currentTopic || !currentUser) return;
    
    // Solo mostrar botones si el usuario es el autor del tema o admin/moderador
    if (!isAuthorOrAdmin(currentTopic)) return;
    
    // Buscar el contenedor de acciones del tema
    const topicActions = document.querySelector('.topic-actions');
    if (!topicActions) return;
    
    // Verificar si ya existen los botones
    if (document.getElementById('edit-topic-btn')) return;
    
    // Crear botones de autor
    const authorActionsHTML = `
        <button class="action-btn" id="edit-topic-btn" onclick="editTopic()">
            <i class="fas fa-edit"></i>
            Editar
        </button>
        <button class="action-btn" id="delete-topic-btn" onclick="deleteTopic()" style="
            border-color: #e74c3c;
            color: #e74c3c;
        ">
            <i class="fas fa-trash"></i>
            Borrar
        </button>
    `;
    
    // Agregar los botones al final
    topicActions.insertAdjacentHTML('beforeend', authorActionsHTML);
    
    console.log('✅ Botones de autor agregados al tema');
}

// ============================================
// FIN DE FUNCIONES DE EDITAR Y BORRAR
// ============================================

// Mostrar formulario de respuesta
function showReplyForm(commentId) {
    const form = document.getElementById(`reply-form-${commentId}`);
    if (form) {
        form.classList.add('active');
        const textarea = form.querySelector('.reply-textarea');
        if (textarea) textarea.focus();
    }
}

// Ocultar formulario de respuesta
function hideReplyForm(commentId) {
    const form = document.getElementById(`reply-form-${commentId}`);
    if (form) {
        form.classList.remove('active');
        const textarea = form.querySelector('.reply-textarea');
        if (textarea) textarea.value = '';
    }
}

// ✅ FUNCIÓN CORREGIDA CON FIRESTORE
async function submitReply(parentCommentId) {
    const form = document.getElementById(`reply-form-${parentCommentId}`);
    if (!form) return;

    const textarea = form.querySelector('.reply-textarea');
    const content = textarea ? textarea.value.trim() : '';

    if (!content || content.length < 5) {
        showErrorMessage('La respuesta debe tener al menos 5 caracteres.');
        return;
    }

    // Deshabilitar botón mientras se procesa
    const submitBtn = form.querySelector('.reply-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    const newReplyData = {
        id: generateId(),
        content: content,
        author: {
            name: currentUser.displayName || 'Usuario',
            email: currentUser.email,
            photo: currentUser.photoURL,
            uid: currentUser.uid  // necesario para verificación de autoría al borrar
        },
        createdAt: new Date().toISOString(),
        likes: 0,
        likedBy: []
    };

    try {
        // Actualizar el documento del comentario padre en Firestore
        const commentRef = doc(db, 'forumTopics', currentTopicId, 'comments', parentCommentId);
        await updateDoc(commentRef, {
            replies: arrayUnion(newReplyData)
        });

        // Actualizar la última actividad del tema general
        await updateTopicLastActivity();

        console.log('✅ Respuesta guardada en Firestore');

        // Limpiar y ocultar formulario
        textarea.value = '';
        hideReplyForm(parentCommentId);

        // Nota: onSnapshot actualizará la UI automáticamente. 
        // No es necesario llamar a displayComments() manualmente, 
        // pero lo dejamos por si el listener falla.
        const parentComment = findCommentById(parentCommentId);
        if (parentComment) {
            if (!parentComment.replies) parentComment.replies = [];
            parentComment.replies.push(newReplyData);
            displayComments();
            updateTopicStats();
        }

        showSuccessMessage('Respuesta publicada exitosamente');

        // Analytics
        if (typeof trackMinistryEvent === 'function') {
            trackMinistryEvent('reply_created', {
                user_id: currentUser.uid,
                parent_comment_id: parentCommentId,
                topic_id: currentTopicId,
                reply_length: content.length
            });
        }

    } catch (error) {
        console.error('❌ Error al guardar la respuesta en Firestore:', error);
        showErrorMessage('No se pudo guardar la respuesta. Inténtalo de nuevo.');
    } finally {
        // Rehabilitar el botón
        submitBtn.disabled = false;
        submitBtn.textContent = 'Responder';
    }
}


// Scroll al formulario de comentarios
function scrollToCommentForm() {
    const commentForm = document.querySelector('.new-comment-form');
    if (commentForm) {
        commentForm.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        setTimeout(() => {
            const textarea = document.getElementById('comment-text');
            if (textarea) textarea.focus();
        }, 500);
    }
}

// Reportar tema
function reportTopic() {
    if (confirm('¿Estás seguro de que quieres reportar este tema?\n\nEsto notificará a los moderadores sobre contenido potencialmente inapropiado.')) {
        // En una implementación real, esto enviaría un reporte al sistema de moderación
        showSuccessMessage('Tema reportado. Los moderadores revisarán el contenido.');
        
        // Analytics
        if (typeof trackMinistryEvent === 'function') {
            trackMinistryEvent('topic_reported', {
                user_id: currentUser.uid,
                topic_id: currentTopicId,
                reason: 'user_report'
            });
        }
    }
}

// Funciones auxiliares
function findCommentById(commentId) {
    for (const comment of comments) {
        if (comment.id === commentId) return comment;
        if (comment.replies) {
            const reply = comment.replies.find(r => r.id === commentId);
            if (reply) return reply;
        }
    }
    return null;
}

function updateTopicInLocalStorage() {
    if (!currentTopic || !currentTopicId) return;
    
    const topics = JSON.parse(localStorage.getItem('forumTopics') || '[]');
    const updatedTopics = topics.map(t => t.id === currentTopicId ? currentTopic : t);
    localStorage.setItem('forumTopics', JSON.stringify(updatedTopics));
}

function generateId() {
    return 'comment_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function getTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Ahora mismo';
    if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} minutos`;
    if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`;
    if (diffInSeconds < 604800) return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
    
    return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function showTopicNotFound() {
    const container = document.querySelector('.topic-container');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: var(--card-shadow); max-width: 500px; margin: 0 auto;">
                    <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: var(--gradient-bg); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-search" style="font-size: 2rem; color: white;"></i>
                    </div>
                    <h2 style="color: var(--dark-color); margin-bottom: 15px;">Tema No Encontrado</h2>
                    <p style="color: #666; margin-bottom: 25px;">El tema que buscas no existe o ha sido removido.</p>
                    <a href="forum.html" style="display: inline-block; background: var(--gradient-bg); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                        Volver al Foro
                    </a>
                </div>
            </div>
        `;
    }
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
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10001;
        max-width: 350px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        font-family: 'Poppins', sans-serif;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    messageDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => messageDiv.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => messageDiv.remove(), 300);
    }, 4000);
}

// 🔧 CRÍTICO: Exponer todas las funciones globalmente para que funcionen desde el HTML
window.toggleTopicLike = toggleTopicLike;
window.toggleTopicBookmark = toggleTopicBookmark;
window.toggleCommentLike = toggleCommentLike;
window.showReplyForm = showReplyForm;
window.hideReplyForm = hideReplyForm;
window.submitReply = submitReply;
window.scrollToCommentForm = scrollToCommentForm;
window.reportTopic = reportTopic;

// 📤 NUEVAS FUNCIONES DE COMPARTIR EXPUESTAS GLOBALMENTE
window.shareTopicThisTopic = shareTopicThisTopic;
window.closeShareModal = closeShareModal;
window.copyTopicUrl = copyTopicUrl;
window.shareToWhatsApp = shareToWhatsApp;
window.shareToTelegram = shareToTelegram;
window.shareByEmail = shareByEmail;

// 🆕 FUNCIONES DE EDITAR Y BORRAR EXPUESTAS GLOBALMENTE
window.editTopic = editTopic;
window.deleteTopic = deleteTopic;
window.editComment = editComment;
window.deleteComment = deleteComment;
window.reportComment = reportComment;
window.closeEditTopicModal = closeEditTopicModal;
window.saveTopicChanges = saveTopicChanges;
window.cancelEditComment = cancelEditComment;
window.saveCommentEdit = saveCommentEdit;

console.log('📖 Sistema de tema individual con autenticación robusta, compartir y edición/borrado habilitado cargado exitosamente');