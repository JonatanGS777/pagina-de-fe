// Comunidad/js/favorites.js - SISTEMA DE FAVORITOS CORREGIDO PARA REGLAS FIRESTORE

// Importar funciones de Firebase Firestore
import { db } from '../../js/firebase-config.js';
import { 
    collection, 
    getDocs, 
    doc, 
    getDoc,
    updateDoc,
    query, 
    where,
    orderBy,
    limit,
    onSnapshot
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// Importar Firebase Auth directamente para verificación robusta
import { auth } from '../../js/firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// Importar funciones reales de auth y analytics con manejo mejorado
let getCurrentUser, trackMinistryEvent;

// Variables globales
let currentUser = null;
let authInitialized = false;
let favoriteTopics = [];
let firestoreListenerUnsubscribe = null;

// Referencias a las colecciones de Firestore
const topicsCollection = collection(db, 'forumTopics');

// Categorías (compartidas)
const categories = {
    estudios: { name: 'Estudios Bíblicos', icon: 'fas fa-bible', color: '#5e4b8b' },
    preguntas: { name: 'Preguntas y Respuestas', icon: 'fas fa-question-circle', color: '#467b8a' },
    testimonios: { name: 'Testimonios', icon: 'fas fa-heart', color: '#d1a35f' },
    oracion: { name: 'Peticiones de Oración', icon: 'fas fa-praying-hands', color: '#10b981' },
    general: { name: 'Conversación General', icon: 'fas fa-comments', color: '#f59e0b' }
};

// 🔧 VERIFICACIÓN MEJORADA: Esperar a que auth esté completamente listo
async function waitForAuthReady() {
    return new Promise((resolve) => {
        console.log('⏳ Esperando a que la autenticación esté lista...');
        
        let attempts = 0;
        const maxAttempts = 30; // 15 segundos máximo
        
        const checkAuth = () => {
            attempts++;
            
            // 1. Verificar Firebase Auth directamente
            if (auth.currentUser) {
                console.log('✅ Usuario autenticado detectado:', auth.currentUser.displayName);
                currentUser = {
                    uid: auth.currentUser.uid,
                    displayName: auth.currentUser.displayName || 'Usuario',
                    email: auth.currentUser.email,
                    photoURL: auth.currentUser.photoURL
                };
                authInitialized = true;
                resolve(true);
                return;
            }
            
            // 2. Verificar localStorage como backup
            const storedUser = localStorage.getItem('uid');
            if (storedUser && localStorage.getItem('name')) {
                console.log('✅ Usuario encontrado en localStorage');
                currentUser = {
                    uid: localStorage.getItem('uid'),
                    displayName: localStorage.getItem('name') || 'Usuario',
                    email: localStorage.getItem('email') || '',
                    photoURL: localStorage.getItem('photo') || ''
                };
                authInitialized = true;
                resolve(true);
                return;
            }
            
            // 3. Reintentar o timeout
            if (attempts >= maxAttempts) {
                console.log('⏰ Timeout esperando autenticación');
                authInitialized = true;
                resolve(false);
                return;
            }
            
            setTimeout(checkAuth, 500);
        };
        
        checkAuth();
    });
}

// 🔧 FUNCIÓN MEJORADA: Cargar módulos de auth y analytics con fallbacks
async function loadAuthModules() {
    try {
        console.log('📦 Cargando módulos de auth y analytics...');
        
        const authModule = await import('../../js/auth.js');
        const analyticsModule = await import('../../js/analytics.js');
        
        getCurrentUser = authModule.getCurrentUser;
        trackMinistryEvent = analyticsModule.trackMinistryEvent;
        
        console.log('✅ Módulos de auth y analytics cargados correctamente');
        return true;
        
    } catch (error) {
        console.warn('⚠️ Error al cargar módulos, usando fallbacks:', error);
        
        // Fallback functions
        getCurrentUser = () => currentUser;
        trackMinistryEvent = (event, params) => {
            console.log('📊 Analytics Event (fallback):', event, params);
        };
        
        return false;
    }
}

// 🔧 FUNCIÓN PRINCIPAL: Inicialización con mejor manejo de auth
async function initializeFavoritesPage() {
    try {
        console.log('🔖 Inicializando página de favoritos...');
        
        showLoadingState();
        
        // 1️⃣ Cargar módulos de auth
        await loadAuthModules();
        
        // 2️⃣ Esperar a que auth esté listo
        const isAuthenticated = await waitForAuthReady();
        
        if (!isAuthenticated) {
            console.log('❌ Usuario no autenticado');
            hideLoadingState();
            showAuthRequired();
            return;
        }
        
        console.log(`👤 Usuario autenticado: ${currentUser.displayName}`);
        
        // 3️⃣ Cargar favoritos con método optimizado
        await loadFavoritesOptimized();
        
        // 4️⃣ Configurar listeners (aprovechando el índice)
        setupOptimizedListeners();
        
        // 5️⃣ Actualizar UI
        updateStats();
        hideLoadingState();
        
        // 6️⃣ Analytics
        if (typeof trackMinistryEvent === 'function') {
            trackMinistryEvent('favorites_page_visit', {
                user_id: currentUser.uid
            });
        }
        
        console.log('✅ Página de favoritos inicializada');
        
    } catch (error) {
        console.error('❌ Error al inicializar favoritos:', error);
        hideLoadingState();
        showErrorMessage('Error al cargar favoritos. Usando modo offline.');
        initializeFallbackMode();
    }
}

// 🔧 NUEVA FUNCIÓN: Cargar favoritos usando el índice Firebase optimizado
async function loadFavoritesOptimized() {
    try {
        console.log('🔖 Cargando favoritos con orderBy optimizado...');
        
        if (!currentUser) {
            console.warn('⚠️ No hay usuario para cargar favoritos');
            return;
        }
        
        // MÉTODO 1: Query optimizada con where + orderBy (usando el índice creado)
        try {
            console.log('🔄 Método 1: Query con orderBy (usando índice Firebase)...');
            
            const orderedQuery = query(
                topicsCollection, 
                where('bookmarkedBy', 'array-contains', currentUser.uid),
                orderBy('createdAt', 'desc'), // ✅ Ahora funciona con el índice
                limit(50) // Limitar para performance
            );
            
            const snapshot = await getDocs(orderedQuery);
            
            favoriteTopics = [];
            snapshot.forEach((doc) => {
                const topicData = doc.data();
                favoriteTopics.push({
                    id: doc.id,
                    ...topicData,
                    createdAt: convertFirestoreTimestamp(topicData.createdAt),
                    lastReply: convertFirestoreTimestamp(topicData.lastReply)
                });
            });
            
            // ✅ Ya no necesitamos .sort() porque Firestore devuelve ordenado
            displayFavorites();
            console.log(`✅ Favoritos cargados con índice: ${favoriteTopics.length} documentos`);
            return;
            
        } catch (queryError) {
            console.warn('⚠️ Query con orderBy falló:', queryError.code, queryError.message);
            
            // MÉTODO 2: Fallback a query simple sin orderBy
            if (queryError.code === 'failed-precondition') {
                console.log('🔄 Índice aún no listo, usando query simple...');
                await loadWithSimpleQuery();
                return;
            }
            
            // MÉTODO 3: Cargar todos los temas y filtrar en cliente
            if (queryError.code === 'permission-denied') {
                console.log('🔄 Problema de permisos, intentando cargar y filtrar...');
                await loadAndFilterTopics();
                return;
            }
            
            throw queryError;
        }
        
    } catch (error) {
        console.error('❌ Error en carga optimizada:', error);
        
        // MÉTODO 4: Fallback final a localStorage
        console.log('🔄 Fallback final a localStorage...');
        loadFavoritesFromLocalStorage();
    }
}

// 🔧 MÉTODO DE RESPALDO: Query simple sin orderBy
async function loadWithSimpleQuery() {
    try {
        console.log('🔄 Cargando con query simple (sin orderBy)...');
        
        const simpleQuery = query(
            topicsCollection, 
            where('bookmarkedBy', 'array-contains', currentUser.uid),
            limit(50)
        );
        
        const snapshot = await getDocs(simpleQuery);
        
        favoriteTopics = [];
        snapshot.forEach((doc) => {
            const topicData = doc.data();
            favoriteTopics.push({
                id: doc.id,
                ...topicData,
                createdAt: convertFirestoreTimestamp(topicData.createdAt),
                lastReply: convertFirestoreTimestamp(topicData.lastReply)
            });
        });
        
        // Ordenar en cliente como respaldo
        favoriteTopics.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        displayFavorites();
        console.log(`✅ Favoritos cargados con query simple: ${favoriteTopics.length} documentos`);
        
    } catch (error) {
        console.error('❌ Query simple también falló:', error);
        throw error;
    }
}

// 🔧 MÉTODO 2: Cargar todos los temas y filtrar localmente
async function loadAndFilterTopics() {
    try {
        console.log('🔄 Cargando todos los temas para filtrar favoritos...');
        
        // Query simple para todos los temas (ordenados por fecha)
        const allTopicsQuery = query(
            topicsCollection,
            orderBy('createdAt', 'desc'),
            limit(200) // Limitar para performance
        );
        
        const snapshot = await getDocs(allTopicsQuery);
        
        favoriteTopics = [];
        snapshot.forEach((doc) => {
            const topicData = doc.data();
            
            // Filtrar solo los temas que el usuario ha marcado como favoritos
            if (topicData.bookmarkedBy && topicData.bookmarkedBy.includes(currentUser.uid)) {
                favoriteTopics.push({
                    id: doc.id,
                    ...topicData,
                    createdAt: convertFirestoreTimestamp(topicData.createdAt),
                    lastReply: convertFirestoreTimestamp(topicData.lastReply)
                });
            }
        });
        
        displayFavorites();
        console.log(`✅ Método 2 exitoso: ${favoriteTopics.length} favoritos encontrados`);
        
    } catch (error) {
        console.error('❌ Método 2 también falló:', error);
        throw error;
    }
}

// 🔧 FUNCIÓN AUXILIAR: Convertir timestamps de Firestore
function convertFirestoreTimestamp(timestamp) {
    try {
        if (!timestamp) return new Date().toISOString();
        
        if (timestamp.toDate && typeof timestamp.toDate === 'function') {
            return timestamp.toDate().toISOString();
        } else if (typeof timestamp === 'string') {
            return timestamp;
        } else if (timestamp instanceof Date) {
            return timestamp.toISOString();
        } else if (timestamp.seconds) {
            return new Date(timestamp.seconds * 1000).toISOString();
        } else {
            return new Date(timestamp).toISOString();
        }
    } catch (error) {
        console.warn('⚠️ Error convirtiendo timestamp:', error);
        return new Date().toISOString();
    }
}

// 🔧 LISTENERS OPTIMIZADOS: Usando el índice Firebase para orderBy
function setupOptimizedListeners() {
    try {
        console.log('🔄 Configurando listeners optimizados con índice...');
        
        // Intentar usar query con orderBy (aprovechando el índice creado)
        try {
            const orderedQuery = query(
                topicsCollection, 
                where('bookmarkedBy', 'array-contains', currentUser.uid),
                orderBy('createdAt', 'desc') // ✅ Usar el índice creado
            );
            
            firestoreListenerUnsubscribe = onSnapshot(orderedQuery, 
                (snapshot) => {
                    console.log('🔄 Actualizando favoritos desde listener optimizado...');
                    
                    favoriteTopics = [];
                    snapshot.forEach((doc) => {
                        const topicData = doc.data();
                        favoriteTopics.push({
                            id: doc.id,
                            ...topicData,
                            createdAt: convertFirestoreTimestamp(topicData.createdAt),
                            lastReply: convertFirestoreTimestamp(topicData.lastReply)
                        });
                    });
                    
                    // ✅ Ya no necesitamos ordenar en cliente - Firestore devuelve ordenado
                    if (document.getElementById('favorites-content')) {
                        displayFavorites();
                        updateStats();
                    }
                },
                (error) => {
                    console.warn('⚠️ Error en listener optimizado:', error);
                    
                    // Fallback a listener simple sin orderBy
                    if (error.code === 'failed-precondition') {
                        console.log('🔄 Fallback a listener simple...');
                        setupSimpleListener();
                    } else {
                        console.log('🔄 Deshabilitando listeners en tiempo real');
                        if (firestoreListenerUnsubscribe) {
                            firestoreListenerUnsubscribe();
                            firestoreListenerUnsubscribe = null;
                        }
                    }
                }
            );
            
            console.log('✅ Listener optimizado configurado con índice');
            
        } catch (error) {
            console.warn('⚠️ No se pudo configurar listener optimizado:', error);
            setupSimpleListener();
        }
        
    } catch (error) {
        console.warn('⚠️ Error general en listeners:', error);
        // No es crítico, continuar sin listeners en tiempo real
    }
}

// 🔧 LISTENER DE RESPALDO: Sin orderBy
function setupSimpleListener() {
    try {
        console.log('🔄 Configurando listener simple (fallback)...');
        
        const simpleQuery = query(
            topicsCollection, 
            where('bookmarkedBy', 'array-contains', currentUser.uid)
        );
        
        firestoreListenerUnsubscribe = onSnapshot(simpleQuery, 
            (snapshot) => {
                console.log('🔄 Actualizando favoritos desde listener simple...');
                
                favoriteTopics = [];
                snapshot.forEach((doc) => {
                    const topicData = doc.data();
                    favoriteTopics.push({
                        id: doc.id,
                        ...topicData,
                        createdAt: convertFirestoreTimestamp(topicData.createdAt),
                        lastReply: convertFirestoreTimestamp(topicData.lastReply)
                    });
                });
                
                // Ordenar en cliente como respaldo
                favoriteTopics.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                
                if (document.getElementById('favorites-content')) {
                    displayFavorites();
                    updateStats();
                }
            },
            (error) => {
                console.warn('⚠️ Error en listener simple, deshabilitando:', error);
                if (firestoreListenerUnsubscribe) {
                    firestoreListenerUnsubscribe();
                    firestoreListenerUnsubscribe = null;
                }
            }
        );
        
        console.log('✅ Listener simple configurado');
        
    } catch (error) {
        console.warn('⚠️ No se pudo configurar listener simple:', error);
    }
}

// Estados de carga
function showLoadingState() {
    const container = document.querySelector('.favorites-container');
    if (container) {
        container.style.opacity = '0.6';
        container.style.pointerEvents = 'none';
    }
    
    const statsCards = document.querySelectorAll('.stat-card');
    statsCards.forEach(card => {
        const value = card.querySelector('.stat-value');
        if (value) {
            value.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        }
    });
}

function hideLoadingState() {
    const container = document.querySelector('.favorites-container');
    if (container) {
        container.style.opacity = '1';
        container.style.pointerEvents = 'auto';
    }
}

// Mostrar requerimiento de autenticación
function showAuthRequired() {
    const container = document.querySelector('.favorites-container');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: var(--card-shadow); max-width: 500px; margin: 0 auto;">
                    <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: var(--gradient-bg); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-lock" style="font-size: 2rem; color: white;"></i>
                    </div>
                    <h2 style="color: var(--dark-color); margin-bottom: 15px;">Acceso Requerido</h2>
                    <p style="color: #666; margin-bottom: 15px;">Para ver tus favoritos necesitas estar registrado en nuestra comunidad.</p>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 25px; font-size: 0.9rem; color: #666;">
                        <strong>💡 Estado:</strong><br>
                        • Auth: ${authInitialized ? 'Inicializado' : 'Pendiente'}<br>
                        • Usuario: ${currentUser ? currentUser.displayName : 'No detectado'}<br>
                        • Firebase: ${auth.currentUser ? 'Conectado' : 'Desconectado'}
                    </div>
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <button onclick="location.reload()" style="background: var(--secondary-color); color: white; padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                            <i class="fas fa-refresh"></i> Recargar
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

// Modo de respaldo
function initializeFallbackMode() {
    console.log('🔄 Activando modo de respaldo...');
    
    if (!currentUser && localStorage.getItem('uid')) {
        currentUser = {
            uid: localStorage.getItem('uid'),
            displayName: localStorage.getItem('name') || 'Usuario',
            email: localStorage.getItem('email') || '',
            photoURL: localStorage.getItem('photo') || ''
        };
    }
    
    if (currentUser) {
        loadFavoritesFromLocalStorage();
        updateStats();
    } else {
        favoriteTopics = [];
        displayFavorites();
    }
    
    console.log('✅ Modo de respaldo activado');
}

// Cargar favoritos desde localStorage
function loadFavoritesFromLocalStorage() {
    try {
        console.log('💾 Cargando favoritos desde localStorage...');
        
        if (!currentUser) {
            console.warn('⚠️ No hay usuario para cargar favoritos');
            favoriteTopics = [];
            displayFavorites();
            return;
        }
        
        const topics = JSON.parse(localStorage.getItem('forumTopics') || '[]');
        favoriteTopics = topics.filter(topic => 
            topic.bookmarkedBy && topic.bookmarkedBy.includes(currentUser.uid)
        );
        
        // Ordenar por fecha
        favoriteTopics.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        displayFavorites();
        console.log(`💾 ${favoriteTopics.length} favoritos cargados desde localStorage`);
        
    } catch (error) {
        console.error('❌ Error al cargar favoritos desde localStorage:', error);
        favoriteTopics = [];
        displayFavorites();
    }
}

// Mostrar favoritos
function displayFavorites() {
    const container = document.getElementById('favorites-content');
    const emptyState = document.getElementById('empty-favorites');
    const clearBtn = document.getElementById('clear-all-btn');
    
    if (!container) {
        console.error('❌ Container de favoritos no encontrado');
        return;
    }
    
    if (favoriteTopics.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #666;">
                <div style="font-size: 4rem; margin-bottom: 20px; opacity: 0.3;">
                    <i class="fas fa-bookmark"></i>
                </div>
                <h3 style="margin-bottom: 10px;">No tienes favoritos aún</h3>
                <p style="margin-bottom: 30px;">Explora el foro y marca temas que te interesen para encontrarlos aquí.</p>
                <a href="forum.html" style="display: inline-block; background: var(--gradient-bg); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                    <i class="fas fa-search"></i> Explorar Foro
                </a>
            </div>
        `;
        if (clearBtn) clearBtn.style.display = 'none';
        return;
    }
    
    if (clearBtn) clearBtn.style.display = 'block';
    
    const favoritesHTML = favoriteTopics.map(topic => createFavoriteHTML(topic)).join('');
    container.innerHTML = favoritesHTML;
    
    // Agregar event listeners
    container.querySelectorAll('.favorite-item').forEach((item, index) => {
        const topic = favoriteTopics[index];
        if (!topic) return;
        
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.action-btn')) {
                openTopic(topic.id);
            }
        });
    });
    
    // Animaciones
    container.querySelectorAll('.favorite-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Crear HTML para favorito
function createFavoriteHTML(topic) {
    const category = categories[topic.category] || { name: 'General', icon: 'fas fa-comments', color: '#666' };
    const timeAgo = getTimeAgo(new Date(topic.createdAt));
    
    return `
        <div class="favorite-item">
            <div class="favorite-avatar">
                ${topic.author.photo ? 
                    `<img src="${topic.author.photo}" alt="${topic.author.name}">` :
                    `<div class="default-avatar">${topic.author.name.charAt(0).toUpperCase()}</div>`
                }
            </div>
            <div class="favorite-content">
                <div class="favorite-header">
                    <div>
                        <h3 class="favorite-title">${escapeHtml(topic.title)}</h3>
                        <div class="favorite-meta">
                            <span><strong>${escapeHtml(topic.author.name)}</strong></span>
                            <span>•</span>
                            <span>${timeAgo}</span>
                        </div>
                    </div>
                    <div class="favorite-category" style="background-color: ${category.color}15; color: ${category.color};">
                        <i class="${category.icon}"></i>
                        ${category.name}
                    </div>
                </div>
                <div class="favorite-preview">
                    ${escapeHtml(topic.content.substring(0, 150))}${topic.content.length > 150 ? '...' : ''}
                </div>
                <div class="favorite-stats">
                    <div class="favorite-stat">
                        <i class="fas fa-heart"></i>
                        <span>${topic.likes || 0}</span>
                    </div>
                    <div class="favorite-stat">
                        <i class="fas fa-comments"></i>
                        <span>${topic.replies || 0} respuestas</span>
                    </div>
                    <div class="favorite-stat">
                        <i class="fas fa-eye"></i>
                        <span>${topic.views || 0} vistas</span>
                    </div>
                </div>
            </div>
            <div class="favorite-actions">
                <button class="action-btn" onclick="event.stopPropagation(); shareTopic('${topic.id}')">
                    <i class="fas fa-share"></i>
                </button>
                <button class="action-btn remove" onclick="event.stopPropagation(); removeFavorite('${topic.id}')">
                    <i class="fas fa-bookmark-slash"></i>
                </button>
            </div>
        </div>
    `;
}

// Actualizar estadísticas
function updateStats() {
    const totalFavoritesEl = document.getElementById('total-favorites');
    const categoriesCountEl = document.getElementById('categories-count');
    const recentFavoritesEl = document.getElementById('recent-favorites');
    
    if (totalFavoritesEl) totalFavoritesEl.textContent = favoriteTopics.length;
    
    const uniqueCategories = new Set(favoriteTopics.map(t => t.category));
    if (categoriesCountEl) categoriesCountEl.textContent = uniqueCategories.size;
    
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentFavorites = favoriteTopics.filter(topic => {
        return new Date(topic.createdAt) > weekAgo;
    });
    if (recentFavoritesEl) recentFavoritesEl.textContent = recentFavorites.length;
}

// Abrir tema
function openTopic(topicId) {
    if (typeof trackMinistryEvent === 'function') {
        trackMinistryEvent('favorite_topic_opened', {
            user_id: currentUser.uid,
            topic_id: topicId
        });
    }
    
    window.location.href = `topic.html?id=${topicId}`;
}

// Remover favorito - VERSIÓN MEJORADA
async function removeFavorite(topicId) {
    if (!confirm('¿Quitar este tema de tus favoritos?')) return;
    
    try {
        console.log('🗑️ Removiendo favorito:', topicId);
        
        // Intentar actualizar en Firestore primero
        const topicRef = doc(db, 'forumTopics', topicId);
        const topicSnap = await getDoc(topicRef);
        
        if (topicSnap.exists()) {
            const topicData = topicSnap.data();
            const currentBookmarkedBy = topicData.bookmarkedBy || [];
            const newBookmarkedBy = currentBookmarkedBy.filter(uid => uid !== currentUser.uid);
            
            await updateDoc(topicRef, {
                bookmarkedBy: newBookmarkedBy
            });
            
            console.log('✅ Favorito removido de Firestore');
            showSuccessMessage('Tema removido de favoritos');
        }
        
    } catch (error) {
        console.warn('⚠️ Error al remover de Firestore, usando localStorage:', error);
        removeFavoriteFromLocalStorage(topicId);
    }
    
    // Actualizar UI inmediatamente
    favoriteTopics = favoriteTopics.filter(topic => topic.id !== topicId);
    displayFavorites();
    updateStats();
    
    if (typeof trackMinistryEvent === 'function') {
        trackMinistryEvent('favorite_removed', {
            user_id: currentUser.uid,
            topic_id: topicId
        });
    }
}

// Remover favorito desde localStorage
function removeFavoriteFromLocalStorage(topicId) {
    try {
        const topics = JSON.parse(localStorage.getItem('forumTopics') || '[]');
        const topicIndex = topics.findIndex(t => t.id === topicId);
        
        if (topicIndex > -1) {
            const topic = topics[topicIndex];
            if (topic.bookmarkedBy) {
                const userIndex = topic.bookmarkedBy.indexOf(currentUser.uid);
                if (userIndex > -1) {
                    topic.bookmarkedBy.splice(userIndex, 1);
                    localStorage.setItem('forumTopics', JSON.stringify(topics));
                    console.log('✅ Favorito removido de localStorage');
                    showSuccessMessage('Tema removido de favoritos');
                }
            }
        }
    } catch (error) {
        console.error('❌ Error al remover favorito de localStorage:', error);
        showErrorMessage('Error al remover favorito');
    }
}

// Compartir tema
function shareTopic(topicId) {
    const topic = favoriteTopics.find(t => t.id === topicId);
    if (!topic) return;
    
    const url = `${window.location.origin}/Comunidad/topic.html?id=${topicId}`;
    
    if (navigator.share) {
        navigator.share({
            title: topic.title,
            text: `${topic.content.substring(0, 100)}...`,
            url: url
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(url).then(() => {
            showSuccessMessage('Enlace copiado al portapapeles');
        }).catch(() => {
            showErrorMessage('No se pudo copiar el enlace');
        });
    }
    
    if (typeof trackMinistryEvent === 'function') {
        trackMinistryEvent('favorite_shared', {
            user_id: currentUser.uid,
            topic_id: topicId,
            method: navigator.share ? 'native' : 'clipboard'
        });
    }
}

// Limpiar todos los favoritos
async function clearAllFavorites() {
    if (!confirm('¿Estás seguro de que quieres quitar todos los temas de tus favoritos?\n\nEsta acción no se puede deshacer.')) {
        return;
    }
    
    try {
        console.log('🗑️ Limpiando todos los favoritos...');
        
        // Intentar actualizar en Firestore
        const updatePromises = favoriteTopics.map(async (topic) => {
            try {
                const topicRef = doc(db, 'forumTopics', topic.id);
                const newBookmarkedBy = (topic.bookmarkedBy || []).filter(uid => uid !== currentUser.uid);
                return updateDoc(topicRef, { bookmarkedBy: newBookmarkedBy });
            } catch (error) {
                console.warn('⚠️ Error actualizando tema:', topic.id, error);
                return Promise.resolve(); // Continue with others
            }
        });
        
        await Promise.allSettled(updatePromises);
        console.log('✅ Favoritos removidos de Firestore');
        
    } catch (error) {
        console.warn('⚠️ Error en Firestore, limpiando localStorage:', error);
        clearAllFavoritesFromLocalStorage();
    }
    
    // Actualizar UI inmediatamente
    favoriteTopics = [];
    displayFavorites();
    updateStats();
    
    showSuccessMessage('Todos los favoritos han sido removidos');
    
    if (typeof trackMinistryEvent === 'function') {
        trackMinistryEvent('all_favorites_cleared', {
            user_id: currentUser.uid,
            count: favoriteTopics.length
        });
    }
}

// Limpiar favoritos desde localStorage
function clearAllFavoritesFromLocalStorage() {
    try {
        const topics = JSON.parse(localStorage.getItem('forumTopics') || '[]');
        
        topics.forEach(topic => {
            if (topic.bookmarkedBy) {
                const userIndex = topic.bookmarkedBy.indexOf(currentUser.uid);
                if (userIndex > -1) {
                    topic.bookmarkedBy.splice(userIndex, 1);
                }
            }
        });
        
        localStorage.setItem('forumTopics', JSON.stringify(topics));
        console.log('✅ Favoritos limpiados de localStorage');
        
    } catch (error) {
        console.error('❌ Error al limpiar favoritos de localStorage:', error);
    }
}

// Funciones auxiliares
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

// Cleanup al salir
window.addEventListener('beforeunload', () => {
    if (firestoreListenerUnsubscribe) {
        firestoreListenerUnsubscribe();
        console.log('🧹 Listeners de favoritos limpiados');
    }
});

// Hacer funciones disponibles globalmente
window.openTopic = openTopic;
window.removeFavorite = removeFavorite;
window.shareTopic = shareTopic;
window.clearAllFavorites = clearAllFavorites;

// Inicialización
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFavoritesPage);
} else {
    initializeFavoritesPage();
}

console.log('🔖 Sistema de favoritos optimizado para reglas Firestore cargado exitosamente');