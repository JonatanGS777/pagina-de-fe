// Comunidad/js/forum.js - SISTEMA DE FORO COMPLETO OPTIMIZADO CON ESTADÍSTICAS CORREGIDAS Y RUTAS DE COLECCIÓN ALINEADAS

// Importar funciones de Firebase Firestore
import { db } from '../../js/firebase-config.js';
import { 
    collection,
    collectionGroup, // <<== CORRECCIÓN: Importado para consultas de grupo
    addDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc, 
    orderBy, 
    query, 
    limit,
    onSnapshot,
    serverTimestamp,
    increment,
    where,
    getDoc
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// Importar Firebase Auth
import { auth } from '../../js/firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// Importar funciones reales de auth y analytics
let getCurrentUser, trackMinistryEvent;

// Variables globales
let currentUser = null;
let currentUserRole = 'member'; // 'member' | 'moderator' | 'admin'
let authInitialized = false;
let currentCategory = 'all';
let currentFilter = 'recent';
let topics = [];
let forumStats = {
    totalTopics: 0,
    totalComments: 0,
    activeUsers: 1
};

// Variables para cleanup y performance
let firestoreUnsubscribe = null;
let forumTimers = [];
let visibleTopicsCount = 20;
const TOPICS_PER_PAGE = 20;
const CACHE_DURATION = 300000; // 5 minutos

// Referencias a las colecciones de Firestore
const topicsCollection = collection(db, 'forumTopics');
// <<== CORRECCIÓN: La colección de comentarios ahora se gestiona dinámicamente como subcolección.
const statsCollection = collection(db, 'forumStats'); // <<== CORRECCIÓN: Nombre de colección alineado con las reglas.

// Categorías del foro
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

// =====================================================================
// 🆕 SECCIÓN 1: UTILIDADES Y FUNCIONES DE SOPORTE
// =====================================================================

function ensureDOMReady() {
    return new Promise((resolve) => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve, { once: true });
        } else {
            resolve();
        }
    });
}

function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);
        if (element) {
            resolve(element);
            return;
        }

        const observer = new MutationObserver((mutations, obs) => {
            const element = document.querySelector(selector);
            if (element) {
                obs.disconnect();
                resolve(element);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        const timeoutId = safeSetTimeout(() => {
            observer.disconnect();
            reject(new Error(`Element ${selector} not found within ${timeout}ms`));
        }, timeout);
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function safeSetTimeout(callback, delay) {
    const timer = setTimeout(callback, delay);
    forumTimers.push(timer);
    return timer;
}

function clearAllTimers() {
    forumTimers.forEach(timer => clearTimeout(timer));
    forumTimers = [];
}

function generateId() {
    return 'topic_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
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

// =====================================================================
// 🆕 SECCIÓN 2: ESTADÍSTICAS CORREGIDAS
// =====================================================================

async function recalculateAllStats() {
    try {
        console.log('🔄 Recalculando estadísticas completas desde Firestore...');
        
        const topicsSnapshot = await getDocs(collection(db, 'forumTopics'));
        const realTopicsCount = topicsSnapshot.size;
        
        // <<== CORRECCIÓN: Usar collectionGroup para obtener TODOS los comentarios de todas las subcolecciones.
        const commentsQuery = collectionGroup(db, 'comments');
        const commentsSnapshot = await getDocs(commentsQuery);
        const realCommentsCount = commentsSnapshot.size;
        
        console.log('📊 Comparación de estadísticas:');
        console.log(`   Temas locales: ${topics.length} | Temas reales: ${realTopicsCount}`);
        console.log(`   Comentarios locales: ${forumStats.totalComments} | Comentarios reales: ${realCommentsCount}`);
        
        await updateCommunityStatsWithRealData(realTopicsCount, realCommentsCount);
        
        forumStats.totalTopics = realTopicsCount;
        forumStats.totalComments = realCommentsCount;
        
        updateForumStats();
        await refreshCommunityStats();
        
        console.log('✅ Estadísticas recalculadas correctamente');
        return { topics: realTopicsCount, comments: realCommentsCount };
        
    } catch (error) {
        console.error('❌ Error al recalcular estadísticas:', error);
        return null;
    }
}

async function updateCommunityStatsWithRealData(topicsCount, commentsCount) {
    try {
        console.log(`📊 Actualizando estadísticas de comunidad: ${topicsCount} temas, ${commentsCount} comentarios`);
        
        // <<== CORRECCIÓN: Usar la colección correcta 'statsCollection'.
        const statsQuery = query(statsCollection, limit(1));
        const statsSnapshot = await getDocs(statsQuery);
        
        const statsData = {
            topicsCount: topicsCount,
            commentsCount: commentsCount,
            usersCount: 1,
            lastUpdated: serverTimestamp()
        };
        
        if (!statsSnapshot.empty) {
            const statsDoc = statsSnapshot.docs[0];
            await updateDoc(statsDoc.ref, statsData);
            console.log('✅ Estadísticas de comunidad actualizadas con datos reales');
        } else {
            // <<== CORRECCIÓN: Usar la colección correcta 'statsCollection'.
            await addDoc(statsCollection, statsData);
            console.log('✅ Documento de estadísticas de comunidad creado con datos reales');
        }
        
    } catch (error) {
        console.error('❌ Error al actualizar estadísticas de comunidad:', error);
    }
}

async function verifyDataConsistency() {
    try {
        console.log('🔍 Verificando consistencia de datos...');
        
        const topicsSnapshot = await getDocs(collection(db, 'forumTopics'));
        // <<== CORRECCIÓN: Usar collectionGroup para la verificación.
        const commentsSnapshot = await getDocs(collectionGroup(db, 'comments'));
        const statsSnapshot = await getDocs(query(statsCollection, limit(1))); // <<== CORRECCIÓN
        
        const realTopics = topicsSnapshot.size;
        const realComments = commentsSnapshot.size;
        
        let savedStats = { topicsCount: 0, commentsCount: 0 };
        if (!statsSnapshot.empty) {
            savedStats = statsSnapshot.docs[0].data();
        }
        
        const report = {
            realTopics,
            realComments,
            savedTopicsCount: savedStats.topicsCount || 0,
            savedCommentsCount: savedStats.commentsCount || 0,
            localTopics: topics.length,
            localComments: forumStats.totalComments,
            inconsistencies: []
        };
        
        if (realTopics !== savedStats.topicsCount) {
            report.inconsistencies.push(`Temas: Real=${realTopics}, Guardado=${savedStats.topicsCount}`);
        }
        
        if (realComments !== savedStats.commentsCount) {
            report.inconsistencies.push(`Comentarios: Real=${realComments}, Guardado=${savedStats.commentsCount}`);
        }
        
        if (realTopics !== topics.length) {
            report.inconsistencies.push(`Temas locales: Real=${realTopics}, Local=${topics.length}`);
        }
        
        console.log('📊 Reporte de consistencia:', report);
        
        if (report.inconsistencies.length > 0) {
            console.warn('⚠️ Se encontraron inconsistencias:', report.inconsistencies);
            return false;
        } else {
            console.log('✅ Datos consistentes');
            return true;
        }
        
    } catch (error) {
        console.error('❌ Error al verificar consistencia:', error);
        return false;
    }
}

async function cleanOrphanedData() {
    // <<== CORRECCIÓN: Con subcolecciones, los comentarios no pueden quedar huérfanos.
    // La función ahora solo verifica y reporta, ya que la eliminación automática es innecesaria.
    try {
        console.log('🧹 Verificando la integridad de los comentarios...');
        
        const commentsQuery = collectionGroup(db, 'comments');
        const commentsSnapshot = await getDocs(commentsQuery);
        
        const topicRefs = new Set();
        const topicPromises = [];
        
        commentsSnapshot.forEach(commentDoc => {
            const topicRef = commentDoc.ref.parent.parent;
            if (topicRef && !topicRefs.has(topicRef.path)) {
                topicRefs.add(topicRef.path);
                topicPromises.push(getDoc(topicRef));
            }
        });
        
        const topicDocs = await Promise.all(topicPromises);
        const existingTopicIds = new Set(topicDocs.filter(doc => doc.exists).map(doc => doc.id));
        
        let orphanedCount = 0;
        commentsSnapshot.forEach(commentDoc => {
            const topicId = commentDoc.ref.parent.parent.id;
            if (!existingTopicIds.has(topicId)) {
                console.warn(`🗑️ Comentario pertenece a un tema borrado: ${commentDoc.id} en tema ${topicId}`);
                orphanedCount++;
            }
        });
        
        if (orphanedCount > 0) {
            console.warn(`Se encontraron ${orphanedCount} comentarios en temas no existentes. Esto no debería ocurrir. Se recomienda una revisión manual.`);
            await recalculateAllStats();
        } else {
            console.log('✅ No se encontraron comentarios huérfanos.');
        }

        return orphanedCount;
        
    } catch (error) {
        console.error('❌ Error al verificar datos huérfanos:', error);
        return 0;
    }
}

async function performFullMaintenance() {
    try {
        console.log('🔧 Iniciando mantenimiento completo...');
        
        showMessage('Realizando mantenimiento de datos...', 'info');
        
        const isConsistent = await verifyDataConsistency();
        const orphanedCount = await cleanOrphanedData();
        const newStats = await recalculateAllStats();
        
        updateForumStats();
        await refreshCommunityStats();
        
        const report = {
            wasConsistent: isConsistent,
            orphanedCommentsChecked: orphanedCount,
            finalStats: newStats
        };
        
        console.log('✅ Mantenimiento completo finalizado:', report);
        showSuccessMessage(`Mantenimiento completado. ${orphanedCount} problemas de integridad encontrados.`);
        
        return report;
        
    } catch (error) {
        console.error('❌ Error durante mantenimiento completo:', error);
        showErrorMessage('Error durante el mantenimiento');
        return null;
    }
}

// =====================================================================
// 🆕 SECCIÓN 3: FUNCIONES DE COMENTARIOS CORREGIDAS
// =====================================================================

async function addComment(topicId, commentText) {
    if (!currentUser || !commentText.trim()) {
        showErrorMessage('Debe proporcionar un comentario válido');
        return false;
    }

    try {
        console.log('💬 Agregando comentario al tema:', topicId);

        // <<== CORRECCIÓN: Crear referencia a la subcolección del tema.
        const topicCommentsRef = collection(db, 'forumTopics', topicId, 'comments');

        const newComment = {
            topicId: topicId, // Mantener por si se necesitan consultas de grupo con 'where'
            content: commentText.trim(),
            author: {
                name: currentUser.displayName || 'Usuario',
                email: currentUser.email,
                photo: currentUser.photoURL,
                uid: currentUser.uid
            },
            authorUid: currentUser.uid,
            createdAt: serverTimestamp(),
            likes: 0,
            likedBy: [],
            replies: []
        };
        
        // <<== CORRECCIÓN: Usar la referencia a la subcolección.
        const docRef = await addDoc(topicCommentsRef, newComment);
        console.log('✅ Comentario agregado con ID:', docRef.id);

        try {
            const topicRef = doc(db, 'forumTopics', topicId);
            const topicDoc = await getDoc(topicRef);
            if (topicDoc.exists()) {
                await updateDoc(topicRef, {
                    replies: increment(1),
                    lastReply: serverTimestamp()
                });
                console.log('✅ Contador del tema actualizado');
            }
        } catch (error) {
            console.warn('⚠️ Error al actualizar contador del tema:', error);
        }

        await recalculateAllStats();

        showSuccessMessage('Comentario agregado exitosamente');

        if (typeof trackMinistryEvent === 'function') {
            trackMinistryEvent('forum_comment_added', {
                user_id: currentUser.uid,
                topic_id: topicId,
                comment_id: docRef.id
            });
        }

        return docRef.id;

    } catch (error) {
        console.error('❌ Error al agregar comentario:', error);
        showErrorMessage('Error al agregar comentario: ' + error.message);
        await recalculateAllStats();
        return false;
    }
}

async function deleteComment(commentId, topicId) {
    if (!currentUser || !commentId || !topicId) { // <<== CORRECCIÓN: topicId es requerido
        showErrorMessage('Parámetros inválidos para eliminar comentario');
        return false;
    }

    try {
        console.log('🗑️ Eliminando comentario:', commentId, 'del tema:', topicId);
        
        // <<== CORRECCIÓN: Crear referencia al documento del comentario en la subcolección.
        const commentRef = doc(db, 'forumTopics', topicId, 'comments', commentId);
        const commentDoc = await getDoc(commentRef);
        
        if (!commentDoc.exists()) {
            showErrorMessage('Comentario no encontrado');
            await recalculateAllStats(); // Recalcular si hay inconsistencia.
            return false;
        }

        const commentData = commentDoc.data();
        const isAuthor = commentData.authorUid === currentUser.uid || 
                        commentData.author?.email === currentUser.email;

        if (!isAuthor) {
            showErrorMessage('Solo puedes eliminar tus propios comentarios');
            return false;
        }

        await deleteDoc(commentRef);
        console.log('✅ Comentario eliminado de Firestore');

        try {
            const topicRef = doc(db, 'forumTopics', topicId);
            const topicDoc = await getDoc(topicRef);
            if (topicDoc.exists()) {
                await updateDoc(topicRef, {
                    replies: increment(-1)
                });
                console.log('✅ Contador del tema actualizado');
            }
        } catch (error) {
            console.warn('⚠️ Error al actualizar contador del tema:', error);
        }

        await recalculateAllStats();

        showSuccessMessage('Comentario eliminado exitosamente');

        if (typeof trackMinistryEvent === 'function') {
            trackMinistryEvent('forum_comment_deleted', {
                user_id: currentUser.uid,
                topic_id: topicId,
                comment_id: commentId
            });
        }

        return true;

    } catch (error) {
        console.error('❌ Error al eliminar comentario:', error);
        showErrorMessage('Error al eliminar comentario: ' + error.message);
        await recalculateAllStats();
        return false;
    }
}

async function deleteTopicWithComments(topicId) {
    console.log('🗑️ Borrando tema y todos sus comentarios:', topicId);

    try {
        // <<== CORRECCIÓN: Apuntar a la subcolección de comentarios del tema.
        const commentsRef = collection(db, 'forumTopics', topicId, 'comments');
        const commentsSnapshot = await getDocs(commentsRef);
        const commentsCount = commentsSnapshot.size;
        
        console.log(`📊 Encontrados ${commentsCount} comentarios para borrar`);

        if (commentsCount > 0) {
            const deletePromises = commentsSnapshot.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(deletePromises);
            console.log(`✅ ${commentsCount} comentarios eliminados`);
        }

        const topicRef = doc(db, 'forumTopics', topicId);
        await deleteDoc(topicRef);
        console.log('✅ Tema eliminado');

        await recalculateAllStats();
        
        console.log(`✅ Tema y ${commentsCount} comentarios eliminados completamente`);
        return true;

    } catch (error) {
        console.error('❌ Error al borrar tema con comentarios:', error);
        await recalculateAllStats();
        throw error;
    }
}

async function refreshCommunityStats() {
    try {
        console.log('🔄 Refrescando estadísticas de comunidad en UI...');

        if (window.CommunityModule && typeof window.CommunityModule.updateStats === 'function') {
            console.log('📊 Usando CommunityModule.updateStats()');
            await window.CommunityModule.updateStats();
        } 
        else if (typeof window.updateCommunityStats === 'function') {
            console.log('📊 Usando updateCommunityStats()');
            await window.updateCommunityStats();
        }
        else {
            console.log('📊 Actualizando estadísticas manualmente');
            await updateCommunityStatsManual();
        }

        console.log('✅ Estadísticas de UI actualizadas correctamente');

    } catch (error) {
        console.error('❌ Error al refrescar estadísticas de UI:', error);
    }
}

async function updateCommunityStatsManual() {
    try {
        // <<== CORRECCIÓN: Usar la colección de estadísticas correcta.
        const statsQuery = query(statsCollection, limit(1));
        const statsSnapshot = await getDocs(statsQuery);

        if (statsSnapshot.empty) {
            console.warn('⚠️ No hay estadísticas de comunidad en Firestore');
            return;
        }

        const statsData = statsSnapshot.docs[0].data();
        
        console.log('📊 Aplicando estadísticas reales al DOM:', statsData);
        
        const commentsCountElements = document.querySelectorAll('#comments-count, .comments-count, [data-stat="comments"]');
        commentsCountElements.forEach(el => {
            if (el) el.textContent = statsData.commentsCount || 0;
        });

        const topicsCountElements = document.querySelectorAll('#topics-count, .topics-count, [data-stat="topics"]');
        topicsCountElements.forEach(el => {
            if (el) el.textContent = statsData.topicsCount || 0;
        });

        const forumCommentsEl = document.getElementById('total-comments');
        const forumTopicsEl = document.getElementById('total-topics');
        
        if (forumCommentsEl) forumCommentsEl.textContent = statsData.commentsCount || 0;
        if (forumTopicsEl) forumTopicsEl.textContent = statsData.topicsCount || 0;

        console.log('✅ Estadísticas aplicadas manualmente al DOM');

    } catch (error) {
        console.error('❌ Error en actualización manual de estadísticas:', error);
    }
}

// =====================================================================
// SECCIONES 4 a 14 (sin cambios necesarios en su lógica principal)
// El resto del código se mantiene igual, ya que las correcciones
// principales estaban en las interacciones con Firestore.
// =====================================================================


// =====================================================================
// 🆕 SECCIÓN 4: FUNCIONES DE AUTENTICACIÓN
// =====================================================================

async function checkAuthentication() {
    return new Promise((resolve) => {
        console.log('🔍 Verificando estado de autenticación...');
        
        if (auth.currentUser) {
            console.log('🔥 Usuario autenticado en Firebase:', auth.currentUser.displayName);
            currentUser = {
                uid: auth.currentUser.uid,
                displayName: auth.currentUser.displayName || 'Usuario',
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL
            };
            saveUserToLocalStorage();
            authInitialized = true;
            resolve(true);
            return;
        }
        
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                console.log('📱 Usuario recuperado de localStorage:', userData.displayName);
                currentUser = userData;
                authInitialized = true;
                resolve(true);
                return;
            } catch (error) {
                console.warn('⚠️ Error al parsear usuario de localStorage:', error);
                localStorage.removeItem('currentUser');
            }
        }
        
        console.log('⏳ Esperando cambios en autenticación...');
        let timeoutId;
        
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            clearTimeout(timeoutId);
            unsubscribe();
            
            if (user) {
                console.log('✅ Usuario autenticado detectado:', user.displayName);
                currentUser = {
                    uid: user.uid,
                    displayName: user.displayName || 'Usuario',
                    email: user.email,
                    photoURL: user.photoURL
                };
                saveUserToLocalStorage();
                authInitialized = true;
                resolve(true);
            } else {
                console.log('❌ No hay usuario autenticado');
                authInitialized = true;
                resolve(false);
            }
        });
        
        timeoutId = safeSetTimeout(() => {
            console.log('⏰ Timeout de autenticación');
            unsubscribe();
            authInitialized = true;
            resolve(false);
        }, 3000);
    });
}

function saveUserToLocalStorage() {
    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
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

async function loadAuthModules() {
    try {
        console.log('📦 Cargando módulos de auth y analytics...');
        
        const authModulePromise = import('../../js/auth.js');
        const [authModule] = await Promise.allSettled([authModulePromise]);
        
        if (authModule.status === 'fulfilled') {
            getCurrentUser = authModule.value.getCurrentUser;
            console.log('✅ Módulo auth cargado correctamente');
            
            if (typeof getCurrentUser === 'function') {
                const testUser = getCurrentUser();
                if (testUser) {
                    console.log('✅ getCurrentUser funcionando:', testUser.displayName);
                    currentUser = testUser;
                }
            }
        }
        
        safeSetTimeout(async () => {
            try {
                const analyticsModule = await import('../../js/analytics.js');
                trackMinistryEvent = analyticsModule.trackMinistryEvent;
                console.log('✅ Módulo analytics cargado');
            } catch (error) {
                console.warn('⚠️ Analytics no disponible:', error);
                trackMinistryEvent = (event, params) => {
                    console.log('📊 Analytics Event (modo respaldo):', event, params);
                };
            }
        }, 1000);
        
        return true;
        
    } catch (error) {
        console.error('❌ Error al cargar módulos:', error);
    }
    
    getCurrentUser = () => currentUser;
    trackMinistryEvent = (event, params) => {
        console.log('📊 Analytics Event (modo respaldo):', event, params);
    };
    
    return false;
}

// =====================================================================
// 🆕 SECCIÓN 5: FUNCIONES DE UI Y ESTADOS
// =====================================================================

function showLoadingState() {
    const container = document.querySelector('.forum-container');
    if (container) {
        container.style.opacity = '0.6';
        container.style.pointerEvents = 'none';
        container.setAttribute('aria-busy', 'true');
    }
    
    const headerStats = document.querySelector('.forum-stats');
    if (headerStats && !headerStats.querySelector('.loading-indicator')) {
        headerStats.innerHTML = `
            <span class="loading-indicator" style="display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-spinner fa-spin"></i> 
                <span>Cargando foro...</span>
            </span>
        `;
    }
}

function hideLoadingState() {
    const container = document.querySelector('.forum-container');
    if (container) {
        container.style.opacity = '1';
        container.style.pointerEvents = 'auto';
        container.removeAttribute('aria-busy');
    }
    
    const headerStats = document.querySelector('.forum-stats');
    if (headerStats && headerStats.querySelector('.loading-indicator')) {
        updateForumStatsHeader();
    }
}

function updateForumStatsHeader() {
    const headerStats = document.querySelector('.forum-stats');
    if (headerStats) {
        headerStats.innerHTML = `
            <span><i class="fas fa-comments"></i> <span id="total-topics">${forumStats.totalTopics}</span> temas</span>
            <span><i class="fas fa-reply"></i> <span id="total-comments">${forumStats.totalComments}</span> respuestas</span>
            <span><i class="fas fa-users"></i> <span id="active-users">${forumStats.activeUsers}</span> activos</span>
        `;
    }
}

function showAuthRequired() {
    const container = document.querySelector('.forum-container');
    if (container) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: var(--card-shadow); max-width: 500px; margin: 0 auto;">
                    <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: var(--gradient-bg); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-lock" style="font-size: 2rem; color: white;"></i>
                    </div>
                    <h2 style="color: var(--dark-color); margin-bottom: 15px;">Acceso Requerido</h2>
                    <p style="color: #666; margin-bottom: 15px;">Para participar en nuestra comunidad de fe necesitas estar registrado.</p>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 25px; font-size: 0.9rem; color: #666;">
                        <strong>💡 Estado del Sistema:</strong><br>
                        • Auth inicializado: ${authInitialized ? '✅' : '❌'}<br>
                        • Usuario actual: ${currentUser ? `✅ ${currentUser.displayName}` : '❌ Ninguno'}<br>
                        • Firebase Auth: ${auth.currentUser ? '✅ Conectado' : '❌ No conectado'}<br>
                        • Cache local: ${localStorage.getItem('currentUser') ? '✅ Presente' : '❌ Ausente'}
                    </div>
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <button onclick="location.reload()" style="background: var(--secondary-color); color: white; padding: 12px 24px; border: none; border-radius: 8px; text-decoration: none; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                            <i class="fas fa-refresh"></i> Recargar Página
                        </button>
                        <a href="../auth/login.html" style="display: inline-block; background: var(--gradient-bg); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s ease;">
                            <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
                        </a>
                        <a href="../index.html" style="display: inline-block; background: var(--light-accent); color: var(--text-color); padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s ease;">
                            <i class="fas fa-home"></i> Volver al Inicio
                        </a>
                    </div>
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
        background: ${type === 'success' ? 
            'linear-gradient(135deg, #10b981, #059669)' : 
            type === 'info' ?
            'linear-gradient(135deg, #3b82f6, #2563eb)' :
            'linear-gradient(135deg, #ef4444, #dc2626)'};
        transform: translateX(100%);
        transition: transform 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    const icon = type === 'success' ? 'check-circle' : type === 'info' ? 'info-circle' : 'exclamation-triangle';
    
    messageDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    safeSetTimeout(() => messageDiv.style.transform = 'translateX(0)', 100);
    
    safeSetTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        safeSetTimeout(() => messageDiv.remove(), 300);
    }, 4000);
}

// =====================================================================
// 🆕 SECCIÓN 6: FUNCIONES DE CARGA Y DATOS
// =====================================================================

async function loadForumDataOptimized() {
    try {
        console.log('📊 Cargando datos optimizados desde Firestore...');
        
        if (loadFromLocalStorageOptimized()) {
            console.log('📊 Datos cargados desde caché válido');
        }
        
        const topicsQuery = query(topicsCollection, orderBy('createdAt', 'desc'), limit(50));
        const topicsSnapshot = await getDocs(topicsQuery);
        
        topics = [];
        topicsSnapshot.forEach((doc) => {
            const topicData = doc.data();
            topics.push({
                id: doc.id,
                ...topicData,
                createdAt: topicData.createdAt?.toDate?.()?.toISOString() || topicData.createdAt,
                lastReply: topicData.lastReply?.toDate?.()?.toISOString() || topicData.lastReply
            });
        });
        
        saveToLocalStorageOptimized();
        
        console.log(`📊 ${topics.length} temas cargados desde Firestore`);
        
        if (topics.length === 0) {
            await createSampleTopics();
        }
        
    } catch (error) {
        console.error('❌ Error al cargar desde Firestore:', error);
        if (!loadFromLocalStorageOptimized()) {
            createSampleTopicsLocal();
        }
    }
}

function loadFromLocalStorageOptimized() {
    try {
        console.log('🔄 Verificando caché local...');
        
        const storedTopics = localStorage.getItem('forumTopics');
        const timestamp = localStorage.getItem('forumTopicsTimestamp');
        const storedStats = localStorage.getItem('forumStats');
        
        if (storedTopics && timestamp) {
            const cacheAge = Date.now() - parseInt(timestamp);
            
            if (cacheAge < CACHE_DURATION) {
                topics = JSON.parse(storedTopics);
                forumStats = storedStats ? JSON.parse(storedStats) : {
                    totalTopics: 0,
                    totalComments: 0,
                    activeUsers: 1
                };
                
                console.log(`📊 ${topics.length} temas cargados desde caché válido (${Math.round(cacheAge/1000)}s)`);
                return true;
            } else {
                console.log('📊 Caché expirado, será actualizado');
            }
        }
        
        return false;
        
    } catch (error) {
        console.error('❌ Error al cargar desde localStorage:', error);
        return false;
    }
}

function saveToLocalStorageOptimized() {
    try {
        localStorage.setItem('forumTopics', JSON.stringify(topics));
        localStorage.setItem('forumTopicsTimestamp', Date.now().toString());
        localStorage.setItem('forumStats', JSON.stringify(forumStats));
    } catch (error) {
        console.error('❌ Error al guardar en localStorage:', error);
    }
}

async function createSampleTopics() {
    console.log('📝 Creando temas de ejemplo en Firestore...');
    
    const sampleTopics = [
        {
            title: "¿Cómo aplicar Mateo 6:33 en tiempos difíciles?",
            content: "Hermanos, he estado reflexionando sobre este versículo: 'Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.' ¿Cómo podemos aplicar esto cuando estamos pasando por dificultades económicas o familiares? Me gustaría escuchar sus experiencias.",
            category: "preguntas",
            author: {
                name: "María González",
                email: "ejemplo@email.com",
                photo: null
            },
            verse: "Mateo 6:33",
            likes: 5,
            replies: 3,
            views: 24,
            likedBy: [],
            bookmarkedBy: []
        },
        {
            title: "Testimonio: Cómo Dios restauró mi matrimonio",
            content: "Quiero compartir con ustedes cómo Dios obró en mi matrimonio cuando parecía que todo estaba perdido. Hace un año, mi esposo y yo estábamos al borde del divorcio. Pero a través de la oración, el perdón y aplicando los principios bíblicos, Dios hizo un milagro...",
            category: "testimonios",
            author: {
                name: "Carlos Mendoza",
                email: "ejemplo2@email.com",
                photo: null
            },
            verse: "Efesios 4:32",
            likes: 12,
            replies: 7,
            views: 45,
            likedBy: [],
            bookmarkedBy: []
        }
    ];
    
    try {
        for (const topicData of sampleTopics) {
            await addDoc(topicsCollection, {
                ...topicData,
                createdAt: serverTimestamp(),
                lastReply: null
            });
        }
        console.log('✅ Temas de ejemplo creados en Firestore');
    } catch (error) {
        console.error('❌ Error al crear temas de ejemplo:', error);
        createSampleTopicsLocal();
    }
}

function createSampleTopicsLocal() {
    const sampleTopics = [
        {
            id: generateId(),
            title: "Bienvenido a nuestra comunidad de fe",
            content: "Gracias por ser parte de nuestra comunidad. Aquí podrás compartir tus reflexiones, preguntas y testimonios con otros hermanos en la fe. ¡Dios te bendiga!",
            category: "general",
            author: {
                name: currentUser?.displayName || "Administrador",
                email: currentUser?.email || "admin@ejemplo.com",
                photo: currentUser?.photoURL || null,
                uid: currentUser?.uid || "admin_uid"
            },
            authorUid: currentUser?.uid || "admin_uid",
            verse: "1 Tesalonicenses 5:11",
            createdAt: new Date().toISOString(),
            likes: 10,
            replies: 3,
            views: 42,
            likedBy: [],
            bookmarkedBy: []
        }
    ];
    
    topics = sampleTopics;
    saveToLocalStorageOptimized();
}

// =====================================================================
// 🆕 SECCIÓN 7: EVENT LISTENERS Y INTERACCIONES
// =====================================================================

async function setupEventListenersOptimized() {
    console.log('🎯 Configurando event listeners optimizados...');
    
    document.addEventListener('click', handleDocumentClick);
    
    await Promise.allSettled([
        setupCategoryListenersOptimized(),
        setupFilterListenersOptimized(),
        setupSearchListenerOptimized(),
        setupFormListenerOptimized(),
        setupModalListenersOptimized(),
        setupGlobalTopicListenersOptimized()
    ]);
    
    console.log('🎯 Event listeners optimizados configurados correctamente');
}

async function setupGlobalTopicListenersOptimized() {
    console.log('🌍 Configurando delegación global optimizada...');
    
    try {
        const topicsContainer = await waitForElement('#topics-container', 2000);
        
        topicsContainer.addEventListener('click', (e) => {
            const topicItem = e.target.closest('.topic-item');
            if (!topicItem) return;
            
            const topicId = topicItem.dataset.topicId;
            if (!topicId) return;
            
            const actionBtn = e.target.closest('.action-btn');
            
            if (actionBtn) {
                e.stopPropagation();
                e.preventDefault();
                
                if (actionBtn.classList.contains('like-btn')) {
                    toggleTopicLike(topicId);
                } else if (actionBtn.classList.contains('bookmark-btn')) {
                    toggleTopicBookmark(topicId);
                } else if (actionBtn.classList.contains('delete-btn')) {
                    deleteTopicConfirm(topicId);
                }
            } else {
                openTopic(topicId);
            }
        });
        
        console.log('✅ Delegación global optimizada configurada');
        
    } catch (error) {
        console.error('❌ Error en delegación global:', error);
    }
}

function handleDocumentClick(e) {
    const target = e.target.closest('[data-category]');
    if (target) {
        const category = target.dataset.category;
        if (category) {
            console.log('🎯 Click en categoría:', category);
            selectCategory(category);
            return;
        }
    }
    
    const filterTarget = e.target.closest('[data-filter]');
    if (filterTarget) {
        const filter = filterTarget.dataset.filter;
        if (filter) {
            console.log('🎯 Click en filtro:', filter);
            selectFilter(filter);
            return;
        }
    }
}

async function setupCategoryListenersOptimized() {
    try {
        console.log('🔧 Configurando categorías optimizadas...');
        
        await waitForElement('.category-item', 2000);
        
        const categoryItems = document.querySelectorAll('.category-item');
        console.log(`🔧 Configurando ${categoryItems.length} categorías...`);
        
        categoryItems.forEach((item) => {
            const category = item.dataset.category;
            if (!category) {
                console.warn('⚠️ Categoría sin data-category:', item);
                return;
            }
            
            if (item._categoryClickHandler) {
                item.removeEventListener('click', item._categoryClickHandler);
            }
            
            item._categoryClickHandler = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🎯 Categoría clickeada:', category);
                selectCategory(category);
            };
            
            item.addEventListener('click', item._categoryClickHandler);
        });
        
        console.log('✅ Listeners de categorías optimizados configurados');
        
    } catch (error) {
        console.error('❌ Error configurando categorías:', error);
    }
}

async function setupFilterListenersOptimized() {
    try {
        console.log('🔧 Configurando filtros optimizados...');
        
        await waitForElement('.filter-btn', 2000);
        
        const filterButtons = document.querySelectorAll('.filter-btn');
        console.log(`🔧 Configurando ${filterButtons.length} filtros...`);
        
        filterButtons.forEach((btn) => {
            const filter = btn.dataset.filter;
            if (!filter) {
                console.warn('⚠️ Filtro sin data-filter:', btn);
                return;
            }
            
            if (btn._filterClickHandler) {
                btn.removeEventListener('click', btn._filterClickHandler);
            }
            
            btn._filterClickHandler = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🎯 Filtro clickeado:', filter);
                selectFilter(filter);
            };
            
            btn.addEventListener('click', btn._filterClickHandler);
        });
        
        console.log('✅ Listeners de filtros optimizados configurados');
        
    } catch (error) {
        console.error('❌ Error configurando filtros:', error);
    }
}

async function setupSearchListenerOptimized() {
    try {
        console.log('🔍 Configurando búsqueda optimizada...');
        
        const searchInput = await waitForElement('#search-input', 2000);
        
        const debouncedSearch = debounce(handleSearch, 300);
        
        searchInput.addEventListener('input', debouncedSearch);
        console.log('✅ Búsqueda optimizada configurada');
        
    } catch (error) {
        console.error('❌ Error configurando búsqueda:', error);
    }
}

async function setupFormListenerOptimized() {
    try {
        console.log('📝 Configurando formulario optimizado...');
        
        const newTopicForm = await waitForElement('#new-topic-form', 2000);
        
        newTopicForm.removeEventListener('submit', handleNewTopic);
        newTopicForm.addEventListener('submit', handleNewTopic);
        
        console.log('✅ Formulario optimizado configurado');
        
    } catch (error) {
        console.error('❌ Error configurando formulario:', error);
    }
}

async function setupModalListenersOptimized() {
    try {
        console.log('🪟 Configurando modal optimizado...');
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeNewTopicModal();
        });
        
        const modal = await waitForElement('#new-topic-modal', 2000);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeNewTopicModal();
        });
        
        console.log('✅ Modal optimizado configurado');
        
    } catch (error) {
        console.error('❌ Error configurando modal:', error);
    }
}

// =====================================================================
// 🆕 SECCIÓN 8: FUNCIONES DE INTERACCIÓN DEL FORO
// =====================================================================

function selectCategory(category) {
    console.log(`🎯 Seleccionando categoría: ${category}`);
    
    if (currentCategory === category) {
        console.log('ℹ️ Categoría ya seleccionada');
        return;
    }
    
    currentCategory = category;
    
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const categoryElement = document.querySelector(`[data-category="${category}"]`);
    if (categoryElement) {
        categoryElement.classList.add('active');
    }
    
    const titleElement = document.getElementById('current-category-title');
    if (titleElement) {
        titleElement.textContent = category === 'all' 
            ? 'Todos los Temas' 
            : categories[category]?.name || category;
    }
    
    filterAndDisplayTopicsOptimized();
    
    safeSetTimeout(() => {
        if (typeof trackMinistryEvent === 'function') {
            trackMinistryEvent('forum_category_selected', {
                user_id: currentUser.uid,
                category: category
            });
        }
    }, 100);
}

function selectFilter(filter) {
    console.log(`🎯 Seleccionando filtro: ${filter}`);
    
    if (currentFilter === filter) {
        console.log('ℹ️ Filtro ya seleccionado');
        return;
    }
    
    currentFilter = filter;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const filterElement = document.querySelector(`[data-filter="${filter}"]`);
    if (filterElement) {
        filterElement.classList.add('active');
    }
    
    filterAndDisplayTopicsOptimized();
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    console.log('🔍 Búsqueda:', searchTerm);
    filterAndDisplayTopicsOptimized(searchTerm);
}

function filterAndDisplayTopicsOptimized(searchTerm = '') {
    console.log(`🔄 Filtrando temas optimizado: categoría=${currentCategory}, filtro=${currentFilter}, búsqueda="${searchTerm}"`);
    
    let filteredTopics = [...topics];
    
    if (currentCategory !== 'all') {
        filteredTopics = filteredTopics.filter(topic => topic.category === currentCategory);
    }
    
    if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        filteredTopics = filteredTopics.filter(topic =>
            topic.title.toLowerCase().includes(lowerSearchTerm) ||
            topic.content.toLowerCase().includes(lowerSearchTerm) ||
            (topic.author?.name?.toLowerCase() || '').includes(lowerSearchTerm)
        );
    }
    
    switch (currentFilter) {
        case 'recent':
            filteredTopics.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        case 'popular':
            filteredTopics.sort((a, b) => (b.likes || 0) - (a.likes || 0));
            break;
        case 'unanswered':
            filteredTopics = filteredTopics.filter(topic => (topic.replies || 0) === 0);
            break;
    }
    
    visibleTopicsCount = TOPICS_PER_PAGE;
    
    displayTopicsOptimized(filteredTopics);
    updateCategoryCounts();
}

function displayTopicsOptimized(topicsToShow = null) {
    const container = document.getElementById('topics-container');
    const emptyState = document.getElementById('empty-state');
    
    if (!container) return;
    
    topicsToShow = topicsToShow || [...topics];
    
    if (!Array.isArray(topicsToShow)) {
        console.error('❌ topicsToShow no es un array');
        topicsToShow = [];
    }
    
    if (topicsToShow.length === 0) {
        container.innerHTML = '';
        if (emptyState) {
            container.appendChild(emptyState);
        } else {
            container.innerHTML = `
                <div class="empty-state" style="text-align: center; padding: 60px 20px; color: #666;">
                    <i class="fas fa-comments" style="font-size: 4rem; margin-bottom: 20px; opacity: 0.3;"></i>
                    <h3>No hay temas disponibles</h3>
                    <p>Sé el primero en iniciar una conversación</p>
                </div>
            `;
        }
        
        const headerCount = document.getElementById('header-topics-count');
        if (headerCount) headerCount.textContent = '0';
        return;
    }
    
    const headerCount = document.getElementById('header-topics-count');
    if (headerCount) headerCount.textContent = topicsToShow.length;
    
    const visibleTopics = topicsToShow.slice(0, visibleTopicsCount);
    const lastViewedTopicId = localStorage.getItem('lastViewedTopic');
    
    const topicsHTML = visibleTopics.map((topic, index) => {
        const isActive = topic.id === lastViewedTopicId;
        return createTopicHTMLOptimized(topic, isActive, index);
    }).join('');
    
    container.innerHTML = topicsHTML;
    
    if (topicsToShow.length > visibleTopicsCount) {
        addLoadMoreButton(container, topicsToShow.length);
    }
    
    animateTopicEntrance();
}

function createTopicHTMLOptimized(topic, isActive = false, index = 0) {
    const category = categories[topic.category] || { 
        name: 'General', 
        icon: 'fas fa-comments', 
        color: '#666' 
    };
    
    const timeAgo = getTimeAgo(new Date(topic.createdAt));
    const isLiked = topic.likedBy?.includes(currentUser.uid) || false;
    const isBookmarked = topic.bookmarkedBy?.includes(currentUser.uid) || false;
    
    const isAuthor = currentUser && (
        topic.author?.email === currentUser.email || 
        topic.author?.uid === currentUser.uid ||
        topic.authorUid === currentUser.uid
    );
    
    return `
        <div class="topic-item fade-in ${isActive ? 'active-topic' : ''}" 
             data-topic-id="${topic.id}" 
             style="animation-delay: ${index * 50}ms;">
            <div class="topic-avatar">
                ${topic.author?.photo ? 
                    `<img src="${topic.author.photo}" alt="${escapeHtml(topic.author.name)}" loading="lazy">` :
                    `<div class="default-avatar">${(topic.author?.name?.charAt(0) || 'U').toUpperCase()}</div>`
                }
            </div>
            <div class="topic-content">
                <div class="topic-header">
                    <div>
                        <h3 class="topic-title">${escapeHtml(topic.title)}</h3>
                        <div class="topic-meta">
                            <span><strong>${escapeHtml(topic.author?.name || 'Usuario')}</strong></span>
                            <span>•</span>
                            <span>${timeAgo}</span>
                            <span>•</span>
                            <span class="topic-category" style="background-color: ${category.color}15; color: ${category.color};">
                                <i class="${category.icon}"></i> ${category.name}
                            </span>
                        </div>
                    </div>
                    <div class="topic-actions">
                        <button class="action-btn like-btn ${isLiked ? 'liked' : ''}" 
                                title="Me gusta" 
                                aria-label="Me gusta">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="action-btn bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" 
                                title="Guardar" 
                                aria-label="Guardar">
                            <i class="fas fa-bookmark"></i>
                        </button>
                        ${isAuthor ? `
                            <button class="action-btn delete-btn" 
                                    title="Borrar tema" 
                                    aria-label="Borrar tema"
                                    style="color: #ef4444; opacity: 0.7; transition: all 0.3s ease;">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
                <div class="topic-preview">
                    ${escapeHtml(topic.content.substring(0, 200))}${topic.content.length > 200 ? '...' : ''}
                </div>
                ${topic.verse ? `
                    <div class="topic-verse" style="font-style: italic; color: #666; margin-top: 10px; padding: 10px; background: rgba(94, 75, 139, 0.05); border-radius: 8px;">
                        <i class="fas fa-quote-left"></i> "${escapeHtml(topic.verse)}"
                    </div>
                ` : ''}
                <div class="topic-stats">
                    <div class="topic-stat">
                        <i class="fas fa-heart"></i>
                        <span>${topic.likes || 0}</span>
                    </div>
                    <div class="topic-stat">
                        <i class="fas fa-comments"></i>
                        <span>${topic.replies || 0} respuestas</span>
                    </div>
                    <div class="topic-stat">
                        <i class="fas fa-eye"></i>
                        <span>${topic.views || 0} vistas</span>
                    </div>
                    ${topic.lastReply ? `
                        <div class="topic-stat">
                            <i class="fas fa-clock"></i>
                            <span>Última respuesta ${getTimeAgo(new Date(topic.lastReply))}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function addLoadMoreButton(container, totalCount) {
    const loadMoreBtn = document.createElement('div');
    loadMoreBtn.className = 'load-more-container';
    loadMoreBtn.style.cssText = `
        text-align: center; 
        padding: 20px; 
        border-top: 1px solid #eee; 
        margin-top: 20px;
    `;
    
    loadMoreBtn.innerHTML = `
        <button onclick="loadMoreTopics()" 
                style="background: var(--gradient-bg); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
            <i class="fas fa-chevron-down"></i> 
            Cargar más temas (${totalCount - visibleTopicsCount} restantes)
        </button>
    `;
    
    container.appendChild(loadMoreBtn);
}

function loadMoreTopics() {
    const currentTotal = topics.length;
    visibleTopicsCount = Math.min(visibleTopicsCount + TOPICS_PER_PAGE, currentTotal);
    
    filterAndDisplayTopicsOptimized();
    
    console.log(`📄 Mostrando ${visibleTopicsCount} de ${currentTotal} temas`);
}

function animateTopicEntrance() {
    const topicItems = document.querySelectorAll('.topic-item');
    topicItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        safeSetTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// =====================================================================
// 🆕 SECCIÓN 9: FUNCIONES DE TEMAS Y MODALES
// =====================================================================

function openNewTopicModal() {
    const modal = document.getElementById('new-topic-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        safeSetTimeout(() => {
            const titleInput = document.getElementById('topic-title');
            if (titleInput) titleInput.focus();
        }, 300);
    }
}

function closeNewTopicModal() {
    const modal = document.getElementById('new-topic-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

async function handleNewTopic(e) {
    e.preventDefault();
    console.log('📝 Procesando nuevo tema...');
    
    const title = document.getElementById('topic-title')?.value.trim() || '';
    const category = document.getElementById('topic-category')?.value || '';
    const content = document.getElementById('topic-content')?.value.trim() || '';
    const verse = document.getElementById('topic-verse')?.value.trim() || '';
    
    if (!title || !category || !content) {
        showErrorMessage('Por favor, completa todos los campos obligatorios.');
        return;
    }
    
    if (title.length < 5) {
        showErrorMessage('El título debe tener al menos 5 caracteres.');
        return;
    }
    
    if (content.length < 10) {
        showErrorMessage('El contenido debe tener al menos 10 caracteres.');
        return;
    }
    
    const submitBtn = document.querySelector('#new-topic-form button[type="submit"]');
    const originalText = submitBtn?.textContent || 'Publicar Tema';
    
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publicando...';
    }
    
    const newTopic = {
        title: title,
        content: content,
        category: category,
        verse: verse,
        author: {
            name: currentUser.displayName || 'Usuario',
            email: currentUser.email,
            photo: currentUser.photoURL,
            uid: currentUser.uid
        },
        authorUid: currentUser.uid,
        likes: 0,
        replies: 0,
        views: 0,
        likedBy: [],
        bookmarkedBy: []
    };
    
    try {
        const docRef = await addDoc(topicsCollection, {
            ...newTopic,
            createdAt: serverTimestamp(),
            lastReply: null
        });
        const savedTopicId = docRef.id;
        
        topics.unshift({
            ...newTopic,
            id: savedTopicId,
            createdAt: new Date().toISOString()
        });
        
        filterAndDisplayTopicsOptimized();
        
        closeNewTopicModal();
        document.getElementById('new-topic-form').reset();
        
        showSuccessMessage('¡Tema creado exitosamente!');
        
        safeSetTimeout(() => {
            if (typeof trackMinistryEvent === 'function') {
                trackMinistryEvent('forum_topic_created', {
                    user_id: currentUser.uid,
                    topic_id: savedTopicId,
                    category: category
                });
            }
        }, 100);
        
    } catch (error) {
        console.error('❌ Error al crear tema:', error);
        showErrorMessage('Error al crear el tema. Por favor, inténtalo de nuevo.');
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }
}

function openTopic(topicId) {
    localStorage.setItem('lastViewedTopic', topicId);
    
    safeSetTimeout(async () => {
        try {
            const topicRef = doc(db, 'forumTopics', topicId);
            await updateDoc(topicRef, {
                views: increment(1)
            });
        } catch (error) {
            console.error('Error al actualizar vistas:', error);
        }
    }, 100);
    
    window.location.href = `topic.html?id=${topicId}`;
}

async function toggleTopicLike(topicId) {
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return;
    
    try {
        const topicRef = doc(db, 'forumTopics', topicId);
        const isLiking = !(topic.likedBy || []).includes(currentUser.uid);
        
        if (isLiking) {
            topic.likes = (topic.likes || 0) + 1;
            topic.likedBy = [...(topic.likedBy || []), currentUser.uid];
        } else {
            topic.likes = Math.max((topic.likes || 0) - 1, 0);
            topic.likedBy = (topic.likedBy || []).filter(uid => uid !== currentUser.uid);
        }
        
        const likeBtn = document.querySelector(`[data-topic-id="${topicId}"] .like-btn`);
        if (likeBtn) {
            likeBtn.classList.toggle('liked', isLiking);
        }
        
        if (isLiking) {
            await updateDoc(topicRef, {
                likes: increment(1),
                likedBy: [...(topic.likedBy || []).filter(uid => uid !== currentUser.uid), currentUser.uid]
            });
        } else {
            await updateDoc(topicRef, {
                likes: increment(-1),
                likedBy: topic.likedBy
            });
        }
        
    } catch (error) {
        console.error('❌ Error al actualizar like:', error);
        showErrorMessage('Error al actualizar el me gusta');
        filterAndDisplayTopicsOptimized();
    }
}

async function toggleTopicBookmark(topicId) {
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return;
    
    try {
        const topicRef = doc(db, 'forumTopics', topicId);
        const isBookmarking = !(topic.bookmarkedBy || []).includes(currentUser.uid);
        
        const bookmarkBtn = document.querySelector(`[data-topic-id="${topicId}"] .bookmark-btn`);
        if (bookmarkBtn) {
            bookmarkBtn.classList.toggle('bookmarked', isBookmarking);
        }
        
        if (isBookmarking) {
            topic.bookmarkedBy = [...(topic.bookmarkedBy || []), currentUser.uid];
            await updateDoc(topicRef, {
                bookmarkedBy: topic.bookmarkedBy
            });
            showSuccessMessage('Tema agregado a favoritos');
        } else {
            topic.bookmarkedBy = (topic.bookmarkedBy || []).filter(uid => uid !== currentUser.uid);
            await updateDoc(topicRef, {
                bookmarkedBy: topic.bookmarkedBy
            });
            showSuccessMessage('Tema removido de favoritos');
        }
        
    } catch (error) {
        console.error('❌ Error al actualizar bookmark:', error);
        showErrorMessage('Error al actualizar favorito');
        filterAndDisplayTopicsOptimized();
    }
}

function deleteTopicConfirm(topicId) {
    const topic = topics.find(t => t.id === topicId);
    if (!topic) {
        showErrorMessage('Tema no encontrado');
        return;
    }
    
    const isAuthor = currentUser && (
        topic.author?.email === currentUser.email || 
        topic.author?.uid === currentUser.uid ||
        topic.authorUid === currentUser.uid
    );
    
    if (!isAuthor) {
        showErrorMessage('Solo puedes borrar tus propios temas');
        return;
    }
    
    console.log('🗑️ Mostrando confirmación para borrar tema:', topicId);
    
    const confirmModal = document.createElement('div');
    confirmModal.id = 'delete-confirm-modal';
    confirmModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
        animation: modalFadeIn 0.3s ease;
    `;
    
    confirmModal.innerHTML = `
        <div style="background: white; border-radius: 16px; padding: 30px; max-width: 450px; margin: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="width: 60px; height: 60px; margin: 0 auto 15px; background: linear-gradient(135deg, #ef4444, #dc2626); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-trash-alt" style="color: white; font-size: 1.5rem;"></i>
                </div>
                <h3 style="color: #1f2937; margin-bottom: 10px;">¿Borrar este tema?</h3>
                <p style="color: #6b7280; font-size: 0.9rem; line-height: 1.5;">
                    Esta acción no se puede deshacer. El tema <strong>"${escapeHtml(topic.title)}"</strong> y todas sus respuestas serán eliminadas permanentemente.
                </p>
            </div>
            <div style="display: flex; gap: 12px; justify-content: center;">
                <button id="cancel-delete-btn" 
                        style="background: #f3f4f6; color: #374151; border: none; padding: 12px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                    Cancelar
                </button>
                <button id="confirm-delete-btn" 
                        data-topic-id="${topicId}"
                        style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; border: none; padding: 12px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                    <i class="fas fa-trash-alt"></i> Borrar Tema
                </button>
            </div>
        </div>
    `;
    
    const closeModal = () => {
        console.log('🚪 Cerrando modal de confirmación');
        if (confirmModal && confirmModal.parentNode) {
            confirmModal.remove();
        }
        document.removeEventListener('keydown', escapeHandler);
    };
    
    confirmModal.addEventListener('click', (e) => {
        if (e.target === confirmModal) {
            closeModal();
        } else if (e.target.id === 'cancel-delete-btn') {
            console.log('❌ Borrado cancelado por el usuario');
            closeModal();
        } else if (e.target.id === 'confirm-delete-btn' || e.target.closest('#confirm-delete-btn')) {
            console.log('✅ Usuario confirmó borrado');
            const targetTopicId = e.target.dataset.topicId || e.target.closest('#confirm-delete-btn').dataset.topicId;
            closeModal();
            deleteTopic(targetTopicId);
        }
    });
    
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            console.log('🔑 Modal cerrado con ESC');
            closeModal();
        }
    };
    document.addEventListener('keydown', escapeHandler);
    
    document.body.appendChild(confirmModal);
    console.log('✅ Modal de confirmación mostrado');
}

async function deleteTopic(topicId) {
    console.log('🗑️ Iniciando proceso de borrado para tema:', topicId);
    
    if (!topicId) {
        console.error('❌ ID de tema no válido:', topicId);
        showErrorMessage('ID de tema no válido');
        return;
    }
    
    const topic = topics.find(t => t.id === topicId);
    if (!topic) {
        console.error('❌ Tema no encontrado en lista local:', topicId);
        showErrorMessage('Tema no encontrado');
        return;
    }
    
    const isAuthor = currentUser && (
        topic.author?.email === currentUser.email || 
        topic.author?.uid === currentUser.uid ||
        topic.authorUid === currentUser.uid
    );
    
    if (!isAuthor) {
        console.error('❌ Usuario sin permisos para borrar tema');
        showErrorMessage('No tienes permisos para borrar este tema');
        return;
    }
    
    try {
        const topicElement = document.querySelector(`[data-topic-id="${topicId}"]`);
        if (topicElement) {
            topicElement.classList.add('deleting');
            
            const loadingIndicator = document.createElement('div');
            loadingIndicator.id = 'delete-loading-indicator';
            loadingIndicator.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                font-size: 0.9rem;
                font-weight: 600;
                z-index: 10;
                box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
                backdrop-filter: blur(5px);
            `;
            loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Borrando tema y comentarios...';
            topicElement.style.position = 'relative';
            topicElement.appendChild(loadingIndicator);
        }
        
        await deleteTopicWithComments(topicId);
        
        const topicIndex = topics.findIndex(t => t.id === topicId);
        if (topicIndex > -1) {
            topics.splice(topicIndex, 1);
            console.log(`✅ Tema removido de lista local. Quedan ${topics.length} temas`);
        }
        
        saveToLocalStorageOptimized();
        
        if (topicElement) {
            topicElement.style.transition = 'all 0.5s ease';
            topicElement.style.transform = 'translateX(-100%)';
            topicElement.style.opacity = '0';
            
            safeSetTimeout(() => {
                filterAndDisplayTopicsOptimized();
                updateForumStats();
                updateCategoryCounts();
            }, 500);
        } else {
            filterAndDisplayTopicsOptimized();
            updateForumStats();
            updateCategoryCounts();
        }
        
        showSuccessMessage('Tema y comentarios borrados exitosamente');
        
        safeSetTimeout(() => {
            if (typeof trackMinistryEvent === 'function') {
                trackMinistryEvent('forum_topic_deleted', {
                    user_id: currentUser.uid,
                    topic_id: topicId,
                    category: topic.category
                });
            }
        }, 100);
        
    } catch (error) {
        console.error('❌ Error durante el borrado del tema:', error);
        showErrorMessage(`Error al borrar el tema: ${error.message}`);
        
        const topicElement = document.querySelector(`[data-topic-id="${topicId}"]`);
        if (topicElement) {
            topicElement.classList.remove('deleting');
            topicElement.style.opacity = '1';
            topicElement.style.pointerEvents = 'auto';
            topicElement.style.transform = 'translateX(0)';
            
            const loadingIndicator = topicElement.querySelector('#delete-loading-indicator');
            if (loadingIndicator) {
                loadingIndicator.remove();
            }
        }
    }
}

// =====================================================================
// 🆕 SECCIÓN 10: LISTENERS DE FIRESTORE Y SINCRONIZACIÓN
// =====================================================================

function setupFirestoreListenersOptimized() {
    try {
        console.log('🔄 Configurando listeners de Firestore optimizados...');
        
        const topicsQuery = query(
            topicsCollection, 
            orderBy('createdAt', 'desc'),
            limit(50)
        );
        
        if (firestoreUnsubscribe) {
            firestoreUnsubscribe();
        }
        
        firestoreUnsubscribe = onSnapshot(topicsQuery, (snapshot) => {
            if (!snapshot.metadata.hasPendingWrites) {
                console.log('🔄 Actualizando temas desde Firestore...');
                updateTopicsFromSnapshot(snapshot);
            }
        }, { 
            includeMetadataChanges: false 
        }, (error) => {
            console.error('❌ Error en listener de Firestore:', error);
            loadFromLocalStorageOptimized();
        });
        
        console.log('✅ Listeners de Firestore optimizados configurados');
        
    } catch (error) {
        console.error('❌ Error al configurar listeners de Firestore:', error);
        loadFromLocalStorageOptimized();
    }
}

function updateTopicsFromSnapshot(snapshot) {
    topics = [];
    snapshot.forEach((doc) => {
        const topicData = doc.data();
        topics.push({
            id: doc.id,
            ...topicData,
            createdAt: topicData.createdAt?.toDate?.()?.toISOString() || topicData.createdAt,
            lastReply: topicData.lastReply?.toDate?.()?.toISOString() || topicData.lastReply
        });
    });
    
    saveToLocalStorageOptimized();
    
    if (document.getElementById('topics-container')) {
        displayTopicsOptimized();
        updateForumStats();
        updateCategoryCounts();
        console.log(`🔄 UI actualizada con ${topics.length} temas`);
    }
}

// =====================================================================
// 🆕 SECCIÓN 11: FUNCIONES DE ESTADÍSTICAS FINALES
// =====================================================================

function updateForumStats() {
    forumStats.totalTopics = topics.length;
    forumStats.totalComments = topics.reduce((sum, topic) => sum + (topic.replies || 0), 0);
    
    const totalTopicsEl = document.getElementById('total-topics');
    const totalCommentsEl = document.getElementById('total-comments');
    const activeUsersEl = document.getElementById('active-users');
    
    if (totalTopicsEl) totalTopicsEl.textContent = forumStats.totalTopics;
    if (totalCommentsEl) totalCommentsEl.textContent = forumStats.totalComments;
    if (activeUsersEl) activeUsersEl.textContent = forumStats.activeUsers;
    
    if (!totalTopicsEl || !totalCommentsEl || !activeUsersEl) {
        updateForumStatsHeader();
    }
}

function updateCategoryCounts() {
    const counts = {
        all: topics.length,
        estudios: topics.filter(t => t.category === 'estudios').length,
        preguntas: topics.filter(t => t.category === 'preguntas').length,
        testimonios: topics.filter(t => t.category === 'testimonios').length,
        oracion: topics.filter(t => t.category === 'oracion').length,
        general: topics.filter(t => t.category === 'general').length
    };
    
    Object.keys(counts).forEach(category => {
        const element = document.getElementById(`count-${category}`);
        if (element) element.textContent = counts[category];
    });
}

function initializeFallbackMode() {
    console.log('🔄 Inicializando modo de respaldo optimizado...');
    
    if (!currentUser) {
        currentUser = {
            uid: 'emergency_user_' + Date.now(),
            displayName: 'Usuario Temporal',
            email: 'temporal@ejemplo.com',
            photoURL: null
        };
    }
    
    topics = [];
    forumStats = { totalTopics: 0, totalComments: 0, activeUsers: 1 };
    
    setupEventListenersOptimized();
    displayTopicsOptimized();
    updateForumStats();
    hideLoadingState();
}

function measurePerformance() {
    if ('performance' in window) {
        const loadTime = performance.now();
        console.log(`🚀 Foro cargado en ${loadTime.toFixed(2)}ms`);
        
        safeSetTimeout(() => {
            if (typeof trackMinistryEvent === 'function') {
                trackMinistryEvent('forum_load_time', {
                    load_time: Math.round(loadTime),
                    topics_count: topics.length
                });
            }
        }, 1000);
    }
}

function showDebugInfo() {
    console.log('🔍 INFORMACIÓN DE DEBUG DEL FORO:');
    console.log('================================');
    console.log('📊 Estadísticas locales:', forumStats);
    console.log('📝 Temas cargados:', topics.length);
    console.log('👤 Usuario actual:', currentUser?.displayName || 'No autenticado');
    console.log('🔧 Auth inicializado:', authInitialized);
    console.log('📱 Cache localStorage:', {
        topics: localStorage.getItem('forumTopics') ? 'Presente' : 'Ausente',
        timestamp: localStorage.getItem('forumTopicsTimestamp'),
        stats: localStorage.getItem('forumStats') ? 'Presente' : 'Ausente'
    });
    
    console.log('🛠️ Funciones disponibles:', {
        addComment: typeof window.addComment,
        deleteComment: typeof window.deleteComment,
        recalculateAllStats: typeof window.recalculateAllStats,
        verifyDataConsistency: typeof window.verifyDataConsistency,
        performFullMaintenance: typeof window.performFullMaintenance
    });
}

// =====================================================================
// 🆕 SECCIÓN 12: INICIALIZACIÓN PRINCIPAL
// =====================================================================

async function initializeForum() {
    try {
        console.log('🏛️ Inicializando foro de la comunidad…');
        
        await ensureDOMReady();
        showLoadingState();
        
        await loadAuthModules();
        
        const isAuthenticated = await checkAuthentication();
        
        if (!isAuthenticated) {
            console.log('👤 Usuario no autenticado – mostrar overlay de login');
            hideLoadingState();
            showAuthRequired();
            return;
        }
        
        console.log(`👤 ¡Bienvenido al foro, ${currentUser.displayName}!`);

        await loadUserRole();

        await setupEventListenersOptimized();
        console.log('✅ Event listeners configurados');

        setupFirestoreListenersOptimized();

        await loadForumDataOptimized();
        console.log(`📊 Datos del foro cargados: ${topics.length} temas`);

        displayTopicsOptimized();
        console.log('✅ Temas mostrados en pantalla');

        updateForumStats();
        updateCategoryCounts();
        
        hideLoadingState();

        safeSetTimeout(() => {
            if (typeof trackMinistryEvent === 'function') {
                trackMinistryEvent('forum_visit', {
                    user_id: currentUser.uid,
                    category: currentCategory
                });
            }
        }, 500);

        measurePerformance();

        console.log('✅ Foro inicializado correctamente');
        
    } catch (error) {
        console.error('❌ Error al inicializar foro:', error);
        hideLoadingState();
        showErrorMessage('Error al cargar el foro. Algunos datos pueden no estar disponibles.');
        initializeFallbackMode();
    }
}

async function initializeForumWithVerification() {
    try {
        console.log('🏛️ Inicializando foro con verificación automática...');
        
        await initializeForum();

        // La verificación/corrección automática escribe en 'forumStats', restringido a
        // admin/moderador por las reglas de Firestore. Para miembros normales esa escritura
        // siempre fallaría (permission-denied) y nunca resolvería la inconsistencia, generando
        // el toast de "mantenimiento" y errores de consola en cada visita al foro.
        if (currentUserRole !== 'admin' && currentUserRole !== 'moderator') {
            return;
        }

        safeSetTimeout(async () => {
            console.log('🔍 Ejecutando verificación automática post-carga...');

            try {
                const isConsistent = await verifyDataConsistency();
                if (!isConsistent) {
                    console.log('⚠️ Inconsistencias detectadas, ejecutando corrección automática...');
                    await performFullMaintenance();
                }
            } catch (error) {
                console.error('❌ Error en verificación automática:', error);
            }
        }, 2000);
        
    } catch (error) {
        console.error('❌ Error en inicialización con verificación:', error);
        await initializeForum();
    }
}

// =====================================================================
// 🆕 SECCIÓN 13: EXPORTACIÓN GLOBAL Y LIMPIEZA
// =====================================================================

// Funciones globales para el HTML
window.openNewTopicModal = openNewTopicModal;
window.closeNewTopicModal = closeNewTopicModal;
window.toggleTopicLike = toggleTopicLike;
window.toggleTopicBookmark = toggleTopicBookmark;
window.loadMoreTopics = loadMoreTopics;
window.deleteTopicConfirm = deleteTopicConfirm;
window.deleteTopic = deleteTopic;

// Funciones globales para comentarios
window.addComment = addComment;
window.deleteComment = deleteComment;
window.refreshCommunityStats = refreshCommunityStats;

// Funciones globales para mantenimiento y debugging
window.recalculateAllStats = recalculateAllStats;
window.verifyDataConsistency = verifyDataConsistency;
window.cleanOrphanedData = cleanOrphanedData;
window.performFullMaintenance = performFullMaintenance;
window.showDebugInfo = showDebugInfo;

// Limpieza automática al salir de la página
window.addEventListener('beforeunload', () => {
    console.log('🧹 Limpiando recursos del foro...');
    
    if (firestoreUnsubscribe) {
        firestoreUnsubscribe();
    }
    
    clearAllTimers();
});

window.addEventListener('pagehide', () => {
    if (firestoreUnsubscribe) {
        firestoreUnsubscribe();
    }
    clearAllTimers();
});

// =====================================================================
// 🆕 SECCIÓN 14: INICIALIZACIÓN FINAL CON ESTILOS
// =====================================================================

ensureDOMReady().then(() => {
    console.log('✅ DOM listo, inicializando foro completo optimizado...');
    
    // Agregar estilos CSS optimizados
    const forumStyles = document.createElement('style');
    forumStyles.textContent = `
        .delete-btn:hover {
            opacity: 1 !important;
            background-color: rgba(239, 68, 68, 0.1) !important;
            transform: scale(1.05);
        }
        
        .delete-btn:active {
            transform: scale(0.95);
        }
        
        .action-btn {
            transition: all 0.3s ease;
        }
        
        .action-btn:hover {
            transform: scale(1.05);
        }
        
        .delete-confirm-modal {
            animation: modalFadeIn 0.3s ease;
        }
        
        @keyframes modalFadeIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .topic-item.deleting {
            transition: all 0.3s ease;
            transform: translateX(-20px);
            opacity: 0.3;
        }
        
        .fade-in {
            animation: fadeInUp 0.5s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .topic-item {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 16px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            border: 1px solid #f0f0f0;
        }
        
        .topic-item:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateY(-2px);
        }
        
        .topic-item.active-topic {
            border-color: var(--primary-color, #5e4b8b);
            box-shadow: 0 4px 12px rgba(94, 75, 139, 0.2);
        }
        
        .loading-indicator {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
        }
    `;
    document.head.appendChild(forumStyles);
    
    // Función de test para debugging
    window.testDeleteTopic = function(topicId) {
        console.log('🧪 Test de borrado para tema:', topicId);
        const topic = topics.find(t => t.id === topicId);
        if (topic) {
            console.log('📋 Datos del tema:', topic);
            console.log('👤 Usuario actual:', currentUser);
            deleteTopicConfirm(topicId);
        } else {
            console.error('❌ Tema no encontrado para test');
        }
    };
    
    // Inicializar foro con verificación completa
    initializeForumWithVerification();
});

// Debugging disponible
console.log('🔧 FUNCIONES DE DEBUGGING DISPONIBLES:');
console.log('=====================================');
console.log('• window.showDebugInfo() - Mostrar información de debug');
console.log('• window.verifyDataConsistency() - Verificar consistencia');
console.log('• window.recalculateAllStats() - Recalcular estadísticas');
console.log('• window.cleanOrphanedData() - Limpiar datos huérfanos');
console.log('• window.performFullMaintenance() - Mantenimiento completo');
console.log('• window.testDeleteTopic(id) - Test de borrado de tema');

console.log('🏛️ Sistema de foro completo optimizado con verificación automática de estadísticas cargado exitosamente');