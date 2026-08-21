// ===================================
// 🌟 COMUNIDAD.JS - LÓGICA DE COMUNIDAD MEJORADA
// ===================================
// Archivo separado para manejar toda la funcionalidad de la barra lateral de comunidad

// 🔥 IMPORTACIONES DE FIREBASE PARA DATOS REALES
import { db, auth } from './js/firebase-config.js';
import { 
    collection, 
    getDocs, 
    query, 
    orderBy, 
    limit,
    onSnapshot,
    collectionGroup,
    connectFirestoreEmulator
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// 🌟 MÓDULO DE COMUNIDAD - NAMESPACE PARA EVITAR CONFLICTOS
const CommunityModule = {
    // Variables encapsuladas
    communityToggle: null,
    communitySidebar: null,
    communityStatsListener: null,
    authStateListener: null,
    isFirebaseConnected: false,
    isUserAuthenticated: false,
    currentUser: null,
    retryCount: 0,
    maxRetries: 3,
    stats: { topics: 3, comments: 12 },
    initialized: false,

    // Inicialización del módulo de comunidad (incluye su propio toggle).
    // Solo se usa si el módulo se carga fuera del index, donde nadie más
    // controla el botón de comunidad.
    init: function() {
        if (this.initialized) return;

        console.log('🌟 Inicializando módulo de comunidad (con toggle propio)...');
        this.setupCommunityWidget();
        this.initWithoutToggle();
    },

    // Inicialización sin tocar el toggle: lo usa index.html, que ya maneja
    // el click del botón y el cierre al hacer clic fuera por su cuenta.
    initWithoutToggle: function() {
        if (this.initialized) return;

        console.log('🌟 Inicializando módulo de comunidad (sin toggle propio)...');
        this.checkFirebaseConnection();
        this.setupAuthListener();

        // Intentar cargar estadísticas incluso sin autenticación (con permisos públicos)
        this.loadCommunityStatsWithFallback();

        this.initialized = true;
    },

    // 🔔 Hooks llamados por index.html cuando el usuario abre/cierra el sidebar
    onToggleEvent: function(isOpen) {
        if (isOpen) {
            console.log('🔔 Sidebar de comunidad abierto: refrescando stats...');
            this.forceReload();
        }
    },

    onCloseEvent: function() {
        console.log('🔔 Sidebar de comunidad cerrado');
    },

    // 📊 Últimas estadísticas conocidas (sincrónico, para index.html)
    getStats: function() {
        return this.stats;
    },

    // Verificar conexión a Firebase
    async checkFirebaseConnection() {
        try {
            if (!db || !auth) {
                console.error('❌ Firebase db/auth no están disponibles');
                return false;
            }
            
            console.log('🔄 Verificando conexión a Firebase...');
            this.isFirebaseConnected = true;
            console.log('✅ Conexión a Firebase verificada');
            return true;
            
        } catch (error) {
            console.error('❌ Error conectando a Firebase:', error);
            this.isFirebaseConnected = false;
            return false;
        }
    },

    // Configurar listener de autenticación MEJORADO
    setupAuthListener: function() {
        if (!auth) {
            console.warn('⚠️ Auth no disponible');
            return;
        }

        console.log('🔐 Configurando listener de autenticación...');
        
        this.authStateListener = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('✅ Usuario autenticado:', user.email);
                this.isUserAuthenticated = true;
                this.currentUser = user;
                this.retryCount = 0; // Reset retry count on successful auth
                
                // Recargar estadísticas con acceso autenticado
                this.loadCommunityStatsReal();
            } else {
                console.log('⚠️ Usuario no autenticado - intentando acceso público');
                this.isUserAuthenticated = false;
                this.currentUser = null;
                
                // Intentar cargar con acceso público
                this.loadCommunityStatsPublic();
            }
        }, (error) => {
            console.error('❌ Error en auth listener:', error);
            this.fallbackToDefaultStats();
        });
    },
    
    setupCommunityWidget: function() {
        // 🌟 Scripts de la barra lateral de comunidad - CON IDs ÚNICOS
        this.communityToggle = document.getElementById('home-community-toggle');
        this.communitySidebar = document.getElementById('home-community-sidebar');
        
        if (this.communityToggle && this.communitySidebar) {
            console.log('🎯 Configurando widget de comunidad...');
            
            this.communityToggle.addEventListener('click', () => {
                console.log('👆 Toggle de comunidad presionado');
                this.communitySidebar.classList.toggle('active');
            });

            // Cerrar sidebar al hacer clic fuera - SOLO EN INDEX
            document.addEventListener('click', (event) => {
                // Verificar que estamos en index, no en forum
                if (!window.location.pathname.includes('forum.html')) {
                    if (!this.communitySidebar.contains(event.target) && 
                        !this.communityToggle.contains(event.target)) {
                        this.communitySidebar.classList.remove('active');
                    }
                }
            });
            
            console.log('✅ Widget de comunidad configurado');
        } else {
            console.warn('⚠️ Elementos de comunidad no encontrados en DOM');
        }
    },

    // Nuevo método para cargar estadísticas con fallback
    async loadCommunityStatsWithFallback() {
        console.log('📊 Iniciando carga de estadísticas con fallback...');
        
        try {
            await this.loadCommunityStatsPublic();
        } catch (error) {
            console.warn('⚠️ Acceso público falló, esperando autenticación...', error);
            this.fallbackToDefaultStats();
        }
    },

    // Método para acceso público (sin autenticación)
    async loadCommunityStatsPublic() {
        console.log('📊 Intentando acceso público a estadísticas...');
        
        if (!this.isFirebaseConnected) {
            console.warn('⚠️ Firebase no conectado');
            this.fallbackToDefaultStats();
            return;
        }
        
        try {
            this.showLoadingSpinners(true);
            
            console.log('🔄 Consultando temas (acceso público)...');
            
            // Cargar temas del foro
            const topicsQuery = query(
                collection(db, 'forumTopics'), 
                orderBy('createdAt', 'desc'),
                limit(100) // Limitar para performance
            );
            
            const topicsSnapshot = await getDocs(topicsQuery);
            const topicsCount = topicsSnapshot.size;
            
            console.log(`📊 Temas encontrados (público): ${topicsCount}`);
            
            // Intentar contar comentarios
            let totalComments = 0;
            try {
                console.log('🔄 Contando comentarios...');
                const commentsQuery = query(collectionGroup(db, 'comments'), limit(1000));
                const commentsSnapshot = await getDocs(commentsQuery);
                totalComments = commentsSnapshot.size;
                
                console.log(`💬 Comentarios encontrados: ${totalComments}`);
            } catch (commentError) {
                console.warn('⚠️ Error contando comentarios, usando conteo manual...', commentError);
                totalComments = await this.fallbackCommentCount(topicsSnapshot);
            }
            
            this.updateCommunityStats(topicsCount, totalComments);
            console.log(`✅ Stats públicas actualizadas: ${topicsCount} temas, ${totalComments} comentarios`);
            
        } catch (error) {
            console.error('❌ Error en acceso público:', error);
            console.error('📋 Código:', error.code, 'Mensaje:', error.message);
            
            if (error.code === 'permission-denied') {
                console.log('🔒 Permisos denegados - esperando autenticación...');
                this.fallbackToDefaultStats();
            } else {
                this.retryWithDelay();
            }
        } finally {
            this.showLoadingSpinners(false);
        }
    },

    // Método para acceso autenticado
    async loadCommunityStatsReal() {
        console.log('📊 Cargando estadísticas con usuario autenticado...');
        
        try {
            if (!this.isFirebaseConnected || !this.isUserAuthenticated) {
                console.warn('⚠️ Firebase no conectado o usuario no autenticado');
                await this.loadCommunityStatsPublic();
                return;
            }
            
            this.showLoadingSpinners(true);
            
            console.log('🔄 Consultando temas (autenticado)...');
            
            // Cargar temas del foro usando la estructura correcta: forumTopics
            const topicsQuery = query(
                collection(db, 'forumTopics'), 
                orderBy('createdAt', 'desc')
            );
            
            const topicsSnapshot = await getDocs(topicsQuery);
            const topicsCount = topicsSnapshot.size;
            
            console.log(`📊 Temas encontrados (autenticado): ${topicsCount}`);
            
            // Contar comentarios con acceso completo
            const totalComments = await this.countCommentsAuthenticated();
            
            this.updateCommunityStats(topicsCount, totalComments);
            
            // Configurar listener en tiempo real ahora que estamos autenticados
            this.setupRealtimeStats();
            
            console.log(`✅ Stats autenticadas actualizadas: ${topicsCount} temas, ${totalComments} comentarios`);
            
        } catch (error) {
            console.error('❌ Error cargando stats autenticadas:', error);
            console.error('📋 Código:', error.code, 'Mensaje:', error.message);
            
            // Fallback al método público si falla el autenticado
            try {
                await this.loadCommunityStatsPublic();
            } catch (fallbackError) {
                console.error('❌ Fallback también falló:', fallbackError);
                this.fallbackToDefaultStats();
            }
        } finally {
            this.showLoadingSpinners(false);
        }
    },

    // Método para contar comentarios con autenticación
    async countCommentsAuthenticated() {
        try {
            console.log('🔄 Contando comentarios (método autenticado)...');
            
            // Intentar collectionGroup primero
            const commentsQuery = query(collectionGroup(db, 'comments'));
            const commentsSnapshot = await getDocs(commentsQuery);
            
            console.log(`💬 Comentarios encontrados (collectionGroup): ${commentsSnapshot.size}`);
            return commentsSnapshot.size;
            
        } catch (error) {
            console.warn('⚠️ CollectionGroup falló, usando conteo manual...', error);
            
            // Método alternativo: contar manualmente por tópico
            const topicsQuery = query(collection(db, 'forumTopics'));
            const topicsSnapshot = await getDocs(topicsQuery);
            
            let totalComments = 0;
            for (const topicDoc of topicsSnapshot.docs) {
                try {
                    const commentsQuery = query(
                        collection(db, 'forumTopics', topicDoc.id, 'comments')
                    );
                    const commentsSnapshot = await getDocs(commentsQuery);
                    totalComments += commentsSnapshot.size;
                } catch (commentError) {
                    console.warn(`⚠️ Error contando comentarios del tópico ${topicDoc.id}:`, commentError.message);
                }
            }
            
            console.log(`💬 Comentarios encontrados (conteo manual): ${totalComments}`);
            return totalComments;
        }
    },

    // Método fallback para contar comentarios sin collectionGroup
    async fallbackCommentCount(topicsSnapshot) {
        let totalComments = 0;
        
        for (const topicDoc of topicsSnapshot.docs) {
            try {
                const commentsQuery = query(
                    collection(db, 'forumTopics', topicDoc.id, 'comments'),
                    limit(50) // Limitar para performance
                );
                const commentsSnapshot = await getDocs(commentsQuery);
                totalComments += commentsSnapshot.size;
            } catch (error) {
                console.warn(`⚠️ Error en fallback para tópico ${topicDoc.id}:`, error.message);
            }
        }
        
        return totalComments;
    },

    // Reintentar con delay
    async retryWithDelay() {
        if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            const delay = Math.pow(2, this.retryCount) * 1000; // Exponential backoff
            
            console.log(`🔄 Reintentando en ${delay}ms (intento ${this.retryCount}/${this.maxRetries})...`);
            
            setTimeout(() => {
                this.loadCommunityStatsWithFallback();
            }, delay);
        } else {
            console.warn('⚠️ Máximo de reintentos alcanzado');
            this.fallbackToDefaultStats();
        }
    },

    // Fallback a valores por defecto
    fallbackToDefaultStats() {
        console.log('📊 Usando valores por defecto para estadísticas');
        this.updateCommunityStats(3, 12);
        this.showLoadingSpinners(false);
    },

    showLoadingSpinners: function(show) {
        const topicsElement = document.getElementById('home-topics-count');
        const commentsElement = document.getElementById('home-comments-count');
        
        if (topicsElement) {
            const spinner = topicsElement.querySelector('.loading-spinner');
            const valueSpan = topicsElement.querySelector('.stat-value');
            if (spinner && valueSpan) {
                spinner.style.display = show ? 'inline-block' : 'none';
                valueSpan.style.display = show ? 'none' : 'inline-block';
            }
        }
        
        if (commentsElement) {
            const spinner = commentsElement.querySelector('.loading-spinner');
            const valueSpan = commentsElement.querySelector('.stat-value');
            if (spinner && valueSpan) {
                spinner.style.display = show ? 'inline-block' : 'none';
                valueSpan.style.display = show ? 'none' : 'inline-block';
            }
        }
    },

    updateCommunityStats: function(topicsCount, commentsCount) {
        console.log(`🔄 Actualizando UI con: ${topicsCount} temas, ${commentsCount} comentarios`);

        this.stats = { topics: topicsCount, comments: commentsCount };

        // Actualizar contadores en la barra lateral
        const topicsElement = document.getElementById('home-topics-count');
        const commentsElement = document.getElementById('home-comments-count');
        
        if (topicsElement) {
            const valueSpan = topicsElement.querySelector('.stat-value');
            if (valueSpan) {
                valueSpan.textContent = topicsCount;
                console.log(`✅ Temas actualizados en UI: ${topicsCount}`);
            } else {
                console.warn('⚠️ Elemento .stat-value no encontrado en temas');
            }
        } else {
            console.warn('⚠️ Elemento home-topics-count no encontrado');
        }
        
        if (commentsElement) {
            const valueSpan = commentsElement.querySelector('.stat-value');
            if (valueSpan) {
                valueSpan.textContent = commentsCount;
                console.log(`✅ Comentarios actualizados en UI: ${commentsCount}`);
            } else {
                console.warn('⚠️ Elemento .stat-value no encontrado en comentarios');
            }
        } else {
            console.warn('⚠️ Elemento home-comments-count no encontrado');
        }
    },

    // Configurar listener en tiempo real para stats (solo si está autenticado)
    setupRealtimeStats: function() {
        if (this.communityStatsListener || !this.isFirebaseConnected || !this.isUserAuthenticated) {
            return; // Ya está configurado o no se puede configurar
        }

        try {
            console.log('🔄 Configurando listener en tiempo real...');
            
            // Listener para temas usando la estructura correcta
            const topicsQuery = query(collection(db, 'forumTopics'));
            this.communityStatsListener = onSnapshot(topicsQuery, (snapshot) => {
                const topicsCount = snapshot.size;
                console.log(`🔄 Actualización en tiempo real - Temas: ${topicsCount}`);
                
                // Recontar comentarios cuando hay cambios
                this.recountComments().then(commentsCount => {
                    console.log(`🔄 Actualización en tiempo real - Comentarios: ${commentsCount}`);
                    this.updateCommunityStats(topicsCount, commentsCount);
                });
            }, (error) => {
                console.error('❌ Error en listener de tiempo real:', error);
            });
            
            console.log('✅ Listener de stats en tiempo real activado');
        } catch (error) {
            console.error('❌ Error configurando listener:', error);
        }
    },

    // Función auxiliar para recontar comentarios
    async recountComments() {
        try {
            const commentsQuery = query(collectionGroup(db, 'comments'));
            const commentsSnapshot = await getDocs(commentsQuery);
            return commentsSnapshot.size;
        } catch (error) {
            console.warn('⚠️ Error recontando comentarios:', error);
            return 0;
        }
    },

    // Función de debug para verificar datos manualmente
    debugFirestore: async function() {
        console.log('🔍 Iniciando debug de Firestore...');
        
        try {
            // Verificar colección de temas
            console.log('🔍 Verificando colección: forumTopics');
            const topicsQuery = query(collection(db, 'forumTopics'), limit(3));
            const topicsSnapshot = await getDocs(topicsQuery);
            
            console.log(`📊 forumTopics: ${topicsSnapshot.size} documentos encontrados`);
            
            topicsSnapshot.forEach((doc) => {
                console.log(`📄 Tópico ${doc.id}:`, doc.data());
            });

            // Verificar comentarios usando collectionGroup
            console.log('🔍 Verificando comentarios anidados...');
            const commentsQuery = query(collectionGroup(db, 'comments'), limit(5));
            const commentsSnapshot = await getDocs(commentsQuery);
            
            console.log(`💬 Comentarios totales: ${commentsSnapshot.size}`);
            
            commentsSnapshot.forEach((doc) => {
                console.log(`📄 Comentario ${doc.id}:`, doc.data());
            });
            
        } catch (error) {
            console.error('❌ Error en debug:', error);
            console.error('📋 Detalles completos:', error);
        }
    },

    // Función para forzar recarga manual de estadísticas
    forceReload: function() {
        console.log('🔄 Forzando recarga de estadísticas...');
        this.retryCount = 0; // Reset retry count
        this.loadCommunityStatsWithFallback();
    },

    // Limpiar listeners al salir
    cleanup: function() {
        if (this.communityStatsListener) {
            this.communityStatsListener();
            this.communityStatsListener = null;
            console.log('🧹 Listener de stats limpiado');
        }
        
        if (this.authStateListener) {
            this.authStateListener();
            this.authStateListener = null;
            console.log('🧹 Listener de auth limpiado');
        }
    }
};

// Exportar el módulo para uso global
window.CommunityModule = CommunityModule;

// Funciones globales para debug (usar en consola)
window.debugComunidad = () => CommunityModule.debugFirestore();
window.recargarStats = () => CommunityModule.forceReload();

// Nota: la inicialización NO es automática aquí. Es index.html (ProtectedIndexPage)
// quien llama a CommunityModule.initWithoutToggle() una vez confirmada la
// autenticación, para no duplicar el listener de auth ni el toggle del sidebar.

// Limpiar al salir de la página
window.addEventListener('beforeunload', function() {
    CommunityModule.cleanup();
});

console.log('🌟 Módulo de comunidad mejorado cargado exitosamente');