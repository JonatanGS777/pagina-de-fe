// Comunidad/js/topic.js - COORDINADOR PRINCIPAL DEL SISTEMA DE TEMAS

// 📦 IMPORTAR MÓDULOS
// Comunidad/js/topic.js - COORDINADOR PRINCIPAL DEL SISTEMA DE TEMAS

// 📦 IMPORTAR MÓDULOS
import { CONFIG, CATEGORIES, ANALYTICS_EVENTS } from './config.js';
import {
    initializeAuth,
    getCurrentUserData,
    trackEvent,
    createEmergencyUser
} from './auth-manager.js';
import { loadFontAwesome } from './icon-loader.js';
import {
    showLoadingState,
    hideLoadingState,
    showTopicNotFound,
    showErrorMessage,
    showSuccessMessage,
    getTopicIdFromURL
} from './ui-helpers.js';
import {
    loadTopicFromFirestore,
    incrementTopicViews,
    loadCommentsFromFirestore,
    setupCommentsListener,
    setupTopicListener,
    saveTopicToLocalStorage,
    loadTopicFromLocalStorage,
    saveCommentsToLocalStorage,
    loadCommentsFromLocalStorage
} from './firestore-sync.js';
import { TopicManager } from './topic-manager.js';
import { CommentManager } from './comment-manager.js';
import { ShareManager } from './share-manager.js';
import { EditManager } from './edit-manager.js';

// 🔧 ESTADO GLOBAL
let currentTopic = null;
let currentTopicId = null;
let comments = [];
let managers = {};
let listeners = [];

// 🔧 FUNCIÓN PRINCIPAL: Inicialización completa del sistema
async function initializeTopicPage() {
    try {
        console.log('📖 Inicializando sistema de temas...');
        
        // 📦 1️⃣ CARGAR FONT AWESOME PRIMERO
        await loadFontAwesome();
        
        // ⏳ 2️⃣ MOSTRAR ESTADO DE CARGA
        showLoadingState();
        
        // 🔐 3️⃣ INICIALIZAR AUTENTICACIÓN
        const isAuthenticated = await initializeAuth();
        if (!isAuthenticated) {
            return; // La función de auth ya muestra la pantalla apropiada
        }
        
        // 🆔 4️⃣ OBTENER ID DEL TEMA
        currentTopicId = getTopicIdFromURL();
        if (!currentTopicId) {
            hideLoadingState();
            showTopicNotFound();
            return;
        }
        
        // 🏗️ 5️⃣ INICIALIZAR MANAGERS
        await initializeManagers();
        
        // 📋 6️⃣ CARGAR DATOS DEL TEMA
        await loadTopicData();
        
        // 💬 7️⃣ CARGAR COMENTARIOS
        await loadCommentsData();
        
        // 👂 8️⃣ CONFIGURAR LISTENERS EN TIEMPO REAL
        setupRealtimeListeners();
        
        // 🎯 9️⃣ CONFIGURAR EVENT LISTENERS
        setupEventListeners();
        
        // ✅ 🔟 FINALIZAR INICIALIZACIÓN
        finalizeInitialization();
        
        console.log('✅ Sistema de temas inicializado correctamente');
        
    } catch (error) {
        console.error('❌ Error crítico al inicializar sistema de temas:', error);
        handleCriticalError(error);
    }
}

// 🏗️ FUNCIÓN: Inicializar managers especializados
async function initializeManagers() {
    try {
        console.log('🏗️ Inicializando managers especializados...');
        
        const currentUser = getCurrentUserData();
        
        // Inicializar cada manager con dependencias necesarias
        managers.topic = new TopicManager(currentUser, CATEGORIES);
        managers.comment = new CommentManager(currentUser);
        managers.share = new ShareManager(currentUser);
        managers.edit = new EditManager(currentUser);
        
        console.log('✅ Managers inicializados');
        
    } catch (error) {
        console.error('❌ Error al inicializar managers:', error);
        throw error;
    }
}

// 📋 FUNCIÓN: Cargar datos del tema
async function loadTopicData() {
    try {
        console.log('📋 Cargando datos del tema...');
        
        // Intentar cargar desde Firestore primero
        try {
            currentTopic = await loadTopicFromFirestore(currentTopicId);
            
            // Incrementar vistas
            await incrementTopicViews(currentTopicId);
            
            // Guardar en localStorage como respaldo
            saveTopicToLocalStorage(currentTopic);
            
        } catch (firestoreError) {
            console.warn('⚠️ Error al cargar desde Firestore, usando localStorage:', firestoreError);
            
            // Fallback a localStorage
            currentTopic = loadTopicFromLocalStorage(currentTopicId);
            
            if (!currentTopic) {
                throw new Error('Tema no encontrado en ninguna fuente');
            }
            
            // Incrementar vistas en localStorage
            currentTopic.views = (currentTopic.views || 0) + 1;
            saveTopicToLocalStorage(currentTopic);
        }
        
        // Actualizar UI del tema
        managers.topic.updateUI(currentTopic);
        
        // Guardar último tema visitado
        localStorage.setItem(CONFIG.STORAGE_KEYS.LAST_VIEWED_TOPIC, currentTopicId);
        
        console.log('✅ Datos del tema cargados:', currentTopic.title);
        
    } catch (error) {
        console.error('❌ Error al cargar datos del tema:', error);
        throw error;
    }
}

// 💬 FUNCIÓN: Cargar datos de comentarios
async function loadCommentsData() {
    try {
        console.log('💬 Cargando comentarios...');
        
        // Intentar cargar desde Firestore primero
        try {
            comments = await loadCommentsFromFirestore(currentTopicId);
            
            // Guardar en localStorage como respaldo
            saveCommentsToLocalStorage(currentTopicId, comments);
            
        } catch (firestoreError) {
            console.warn('⚠️ Error al cargar comentarios desde Firestore, usando localStorage:', firestoreError);
            
            // Fallback a localStorage
            comments = loadCommentsFromLocalStorage(currentTopicId);
        }
        
        // Actualizar UI de comentarios
        managers.comment.updateUI(comments);
        
        // Actualizar estadísticas
        managers.topic.updateStats(currentTopic, comments);
        
        console.log(`✅ ${comments.length} comentarios cargados`);
        
    } catch (error) {
        console.error('❌ Error al cargar comentarios:', error);
        comments = [];
        managers.comment.updateUI(comments);
    }
}

// 👂 FUNCIÓN: Configurar listeners en tiempo real
function setupRealtimeListeners() {
    try {
        console.log('👂 Configurando listeners en tiempo real...');
        
        // Listener para comentarios
        const commentsUnsubscribe = setupCommentsListener(currentTopicId, (updatedComments) => {
            comments = updatedComments;
            managers.comment.updateUI(comments);
            managers.topic.updateStats(currentTopic, comments);
            
            // Guardar respaldo en localStorage
            saveCommentsToLocalStorage(currentTopicId, comments);
        });
        
        if (commentsUnsubscribe) {
            listeners.push(commentsUnsubscribe);
        }
        
        // Listener para el tema
        const topicUnsubscribe = setupTopicListener(currentTopicId, (updatedTopic) => {
            if (updatedTopic) {
                currentTopic = updatedTopic;
                managers.topic.updateUI(currentTopic);
                
                // Guardar respaldo en localStorage
                saveTopicToLocalStorage(currentTopic);
            } else {
                // El tema fue borrado
                showTopicNotFound();
            }
        });
        
        if (topicUnsubscribe) {
            listeners.push(topicUnsubscribe);
        }
        
        console.log('✅ Listeners en tiempo real configurados');
        
    } catch (error) {
        console.error('❌ Error al configurar listeners:', error);
    }
}

// 🎯 FUNCIÓN: Configurar event listeners
function setupEventListeners() {
    try {
        console.log('🎯 Configurando event listeners...');
        
        // Event listeners para cada manager
        managers.topic.setupEventListeners(currentTopic);
        managers.comment.setupEventListeners(currentTopicId, (newComments) => {
            comments = newComments;
            managers.topic.updateStats(currentTopic, comments);
        });
        managers.share.setupEventListeners(currentTopic);
        managers.edit.setupEventListeners(currentTopic, currentTopicId, (updatedTopic) => {
            currentTopic = updatedTopic;
            managers.topic.updateUI(currentTopic);
        });
        
        // Event listener global para limpiar listeners al salir
        window.addEventListener('beforeunload', cleanupListeners);
        
        console.log('✅ Event listeners configurados');
        
    } catch (error) {
        console.error('❌ Error al configurar event listeners:', error);
    }
}

// ✅ FUNCIÓN: Finalizar inicialización
function finalizeInitialization() {
    try {
        // Ocultar estado de carga
        hideLoadingState();
        
        // Actualizar título de la página
        if (currentTopic) {
            document.title = `${currentTopic.title} - Comunidad - Ministerio "La Gloria es del Señor"`;
        }
        
        // Analytics
        trackEvent(ANALYTICS_EVENTS.TOPIC_PAGE_VISIT, {
            topic_id: currentTopicId,
            topic_title: currentTopic?.title,
            topic_category: currentTopic?.category
        });
        
        // Mensaje de éxito (solo en desarrollo)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('🎉 Sistema de temas listo para usar');
        }
        
    } catch (error) {
        console.error('❌ Error al finalizar inicialización:', error);
    }
}

// 🆘 FUNCIÓN: Manejar errores críticos
function handleCriticalError(error) {
    console.error('🆘 Error crítico detectado:', error);
    
    hideLoadingState();
    
    // Intentar modo de emergencia
    try {
        console.log('🔄 Activando modo de emergencia...');
        
        // Crear usuario temporal si es necesario
        if (!getCurrentUserData()) {
            createEmergencyUser();
        }
        
        // Crear tema de ejemplo
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
        
        // Inicializar managers básicos
        if (!managers.topic) {
            managers.topic = new TopicManager(getCurrentUserData(), CATEGORIES);
        }
        if (!managers.comment) {
            managers.comment = new CommentManager(getCurrentUserData());
        }
        
        // Actualizar UI básica
        managers.topic.updateUI(currentTopic);
        managers.comment.updateUI([]);
        
        // Configurar listeners básicos
        managers.topic.setupEventListeners(currentTopic);
        managers.comment.setupEventListeners('emergency_topic', () => {});
        
        showErrorMessage('Algunos datos no están disponibles. El sistema funciona en modo limitado.');
        
        console.log('✅ Modo de emergencia activado');
        
    } catch (emergencyError) {
        console.error('💥 Error incluso en modo de emergencia:', emergencyError);
        
        // Último recurso: mostrar error básico
        const container = document.querySelector('.topic-container');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <h2>Error del Sistema</h2>
                    <p>No se pudo cargar el tema. Por favor, recarga la página.</p>
                    <button onclick="location.reload()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        Recargar Página
                    </button>
                </div>
            `;
        }
    }
}

// 🧹 FUNCIÓN: Limpiar listeners
function cleanupListeners() {
    console.log('🧹 Limpiando listeners...');
    
    listeners.forEach(unsubscribe => {
        if (typeof unsubscribe === 'function') {
            try {
                unsubscribe();
            } catch (error) {
                console.warn('⚠️ Error al limpiar listener:', error);
            }
        }
    });
    
    listeners = [];
}

// 🔧 FUNCIONES DE ACCESO PARA MANAGERS (para uso desde HTML)
function getCurrentTopicData() {
    return currentTopic;
}

function getCurrentCommentsData() {
    return comments;
}

function getManager(managerName) {
    return managers[managerName];
}

// 🚀 INICIALIZACIÓN AUTOMÁTICA
// Manejar diferentes estados del DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTopicPage);
    console.log('⏳ DOM aún cargando, esperando a DOMContentLoaded...');
} else {
    console.log('✅ DOM ya listo, inicializando inmediatamente...');
    // Pequeño delay para asegurar que todos los scripts estén cargados
    setTimeout(initializeTopicPage, 100);
}

// 🔧 EXPONER FUNCIONES GLOBALMENTE PARA USO DESDE HTML
window.getCurrentTopicData = getCurrentTopicData;
window.getCurrentCommentsData = getCurrentCommentsData;
window.getManager = getManager;
window.cleanupListeners = cleanupListeners;

// Exponer managers globalmente para compatibilidad
window.topicManager = () => managers.topic;
window.commentManager = () => managers.comment;
window.shareManager = () => managers.share;
window.editManager = () => managers.edit;

console.log('📖 Sistema principal de temas cargado - esperando inicialización...');