// 🔐 IMPORTACIONES DE FIREBASE
import { auth, db, googleProvider } from './js/firebase-config.js';
import { 
    collection, 
    getDocs, 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc,
    query, 
    orderBy, 
    limit,
    where,
    onSnapshot,
    serverTimestamp,
    increment,
    deleteField
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { 
    onAuthStateChanged,
    signOut 
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// 🔐 CREDENCIALES DE ADMINISTRADOR
const ADMIN_CREDENTIALS = {
    username: "admin_emd_2025",
    password: "Gloria_Señor_777#",
    name: "Administrador EMD"
};

// 📊 VARIABLES GLOBALES PARA DATOS REALES
let realTimeListeners = [];
let currentStats = {
    totalTopics: 0,
    totalComments: 0,
    totalUsers: 0,
    totalViews: 0,
    activeUsers: 0,
    recentTopics: 0,
    avgTopicsPerUser: 0,
    mostActiveCategory: ''
};

// 🚀 INICIALIZACIÓN DEL PANEL DE ADMINISTRACIÓN
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🔐 Panel de Administración con Firebase inicializado');
    
    // Verificar conexión a Firebase
    try {
        // Test de conexión básica
        await getDocs(query(collection(db, 'forumTopics'), limit(1)));
        console.log('✅ Conexión a Firebase establecida');
    } catch (error) {
        console.warn('⚠️ Firebase no disponible, usando modo offline:', error.message);
        showAdminMessage('Modo offline: Algunas funciones pueden no estar disponibles', 'error');
    }
    
    // Verificar si hay sesión admin activa
    const adminLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
        // Si ya está logueado, ir directo al panel
        showAdminPanel();
        try {
            await setupRealTimeData();
        } catch (error) {
            console.error('❌ Error configurando datos en tiempo real:', error);
        }
    } else {
        // Mostrar login
        document.getElementById('admin-access').style.display = 'flex';
        document.getElementById('admin-username').focus();
    }

    // Configurar eventos
    setupAdminEvents();
    setupNavigationEvents();
    setupFloatingControl();
});

// 🔧 CONFIGURAR EVENTOS PRINCIPALES
function setupAdminEvents() {
    // Login form
    const loginForm = document.getElementById('admin-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleAdminLogin);
    }

    // Navegación del panel
    document.querySelectorAll('.admin-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const section = item.getAttribute('data-section');
            switchSection(section);
            
            // Actualizar estado activo
            document.querySelectorAll('.admin-nav-item').forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

// 🔑 MANEJAR LOGIN DE ADMINISTRADOR
function handleAdminLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Login exitoso
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminLoginTime', new Date().toISOString());
        sessionStorage.setItem('adminName', ADMIN_CREDENTIALS.name);
        
        showAdminPanel();
        showAdminMessage('¡Bienvenido al Panel de Administración!', 'success');
        
        // Cargar datos reales
        setupRealTimeData();
        
        console.log('✅ Acceso de administrador autorizado');
    } else {
        // Login fallido
        showAdminMessage('Credenciales incorrectas. Acceso denegado.', 'error');
        
        // Efecto de error visual
        const form = document.getElementById('admin-login-form');
        form.classList.add('shake');
        setTimeout(() => {
            form.classList.remove('shake');
        }, 500);
    }
}

// 📱 CONFIGURAR NAVEGACIÓN Y CONTROLES
function setupNavigationEvents() {
    // Navegación responsiva
    document.addEventListener('click', function(event) {
        const sidebar = document.getElementById('admin-sidebar');
        const toggleBtn = event.target.closest('[onclick="toggleSidebar()"]');
        
        if (window.innerWidth <= 768) {
            if (toggleBtn) {
                sidebar.classList.toggle('active');
            } else if (!sidebar.contains(event.target) && !toggleBtn) {
                sidebar.classList.remove('active');
            }
        }
    });
}

// 🎛️ CONFIGURAR CONTROL FLOTANTE
function setupFloatingControl() {
    const toggle = document.getElementById('admin-control-toggle');
    const control = document.getElementById('admin-floating-control');
    
    if (toggle && control) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            control.classList.toggle('active');
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', (event) => {
            if (!control.contains(event.target)) {
                control.classList.remove('active');
            }
        });
    }
}

// 📊 CONFIGURAR DATOS EN TIEMPO REAL CON FIRESTORE
async function setupRealTimeData() {
    console.log('📊 Configurando datos en tiempo real...');
    
    try {
        // Limpiar listeners anteriores
        realTimeListeners.forEach(unsubscribe => unsubscribe());
        realTimeListeners = [];

        // Listener para temas del foro en tiempo real
        const topicsRef = collection(db, 'forumTopics');
        const topicsListener = onSnapshot(topicsRef, async (snapshot) => {
            await updateForumStats(snapshot);
            console.log(`📝 Temas del foro actualizados: ${snapshot.size}`);
        });
        realTimeListeners.push(topicsListener);

        // Listener para perfiles de usuario
        const usersRef = collection(db, 'userProfiles');
        const usersListener = onSnapshot(usersRef, (snapshot) => {
            currentStats.totalUsers = snapshot.size;
            updateUserStats(snapshot);
            console.log(`👥 Usuarios actualizados: ${currentStats.totalUsers}`);
        });
        realTimeListeners.push(usersListener);

        // Cargar estadísticas del foro
        await loadForumStats();
        
        // Cargar temas recientes
        await loadRecentTopics();
        
        // Cargar actividad reciente
        await loadRecentActivity();

        // Actualizar dashboard
        updateDashboardStats();

    } catch (error) {
        console.error('❌ Error configurando datos en tiempo real:', error);
        showAdminMessage('Error al cargar datos del servidor', 'error');
    }
}

// 📝 ACTUALIZAR ESTADÍSTICAS DEL FORO
async function updateForumStats(topicsSnapshot) {
    let totalComments = 0;
    let totalViews = 0;
    let recentTopics = 0;
    const categories = {};
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Procesar cada tema
    for (const docSnapshot of topicsSnapshot.docs) {
        const topicData = docSnapshot.data();
        
        // Contar vistas
        totalViews += topicData.views || 0;
        
        // Contar categorías
        const category = topicData.category || 'Sin categoría';
        categories[category] = (categories[category] || 0) + 1;
        
        // Contar temas recientes
        const createdAt = topicData.createdAt?.toDate();
        if (createdAt && createdAt > oneWeekAgo) {
            recentTopics++;
        }
        
        // Contar comentarios de este tema
        try {
            const commentsRef = collection(db, 'forumTopics', docSnapshot.id, 'comments');
            const commentsSnapshot = await getDocs(commentsRef);
            totalComments += commentsSnapshot.size;
        } catch (error) {
            console.log('No se pudieron cargar comentarios para tema:', docSnapshot.id);
        }
    }

    // Actualizar estadísticas globales
    currentStats.totalTopics = topicsSnapshot.size;
    currentStats.totalComments = totalComments;
    currentStats.totalViews = totalViews;
    currentStats.recentTopics = recentTopics;
    
    // Calcular categoría más activa
    let mostActive = '';
    let maxCount = 0;
    for (const [category, count] of Object.entries(categories)) {
        if (count > maxCount) {
            maxCount = count;
            mostActive = category;
        }
    }
    currentStats.mostActiveCategory = mostActive;

    // Calcular promedio de temas por usuario
    if (currentStats.totalUsers > 0) {
        currentStats.avgTopicsPerUser = (currentStats.totalTopics / currentStats.totalUsers).toFixed(1);
    }

    updateDashboardStats();
}

// 👥 ACTUALIZAR ESTADÍSTICAS DE USUARIOS
function updateUserStats(usersSnapshot) {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    let activeUsers = 0;

    usersSnapshot.forEach(doc => {
        const userData = doc.data();
        const lastActive = userData.lastActive?.toDate();

        // Contar usuarios activos (últimas 24 horas)
        if (lastActive && lastActive > oneDayAgo) {
            activeUsers++;
        }
    });

    currentStats.activeUsers = activeUsers;
    updateDashboardStats();
}

// 📊 CARGAR ESTADÍSTICAS DEL FORO
async function loadForumStats() {
    try {
        const statsRef = doc(db, 'forumStats', 'general');
        const statsDoc = await getDoc(statsRef);
        
        if (statsDoc.exists()) {
            const data = statsDoc.data();
            // Usar estadísticas guardadas si están disponibles
            console.log('📊 Estadísticas del foro cargadas:', data);
        } else {
            // Crear documento de estadísticas si no existe
            await setDoc(statsRef, {
                lastUpdated: serverTimestamp(),
                totalTopics: currentStats.totalTopics,
                totalComments: currentStats.totalComments
            });
        }
    } catch (error) {
        console.error('❌ Error cargando estadísticas del foro:', error);
    }
}

// 📝 CARGAR TEMAS RECIENTES
async function loadRecentTopics() {
    try {
        const topicsRef = collection(db, 'forumTopics');
        const recentTopicsQuery = query(topicsRef, orderBy('createdAt', 'desc'), limit(5));
        const querySnapshot = await getDocs(recentTopicsQuery);
        
        const usersList = document.getElementById('recent-users');
        if (!usersList) return;

        usersList.innerHTML = '';

        querySnapshot.forEach(doc => {
            const topicData = doc.data();
            const topicElement = createTopicElement(topicData);
            usersList.appendChild(topicElement);
        });

    } catch (error) {
        console.error('❌ Error cargando temas recientes:', error);
    }
}

// 📝 CREAR ELEMENTO DE TEMA
function createTopicElement(topicData) {
    const div = document.createElement('div');
    div.className = 'user-item';
    
    const authorName = topicData.author?.displayName || topicData.author?.email || 'Usuario';
    const initials = authorName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const timeAgo = formatTimeAgo(topicData.createdAt?.toDate());
    
    div.innerHTML = `
        <div class="user-avatar-small">${initials}</div>
        <div class="user-info">
            <h5>${topicData.title || 'Sin título'}</h5>
            <span>${timeAgo} - ${topicData.category || 'General'}</span>
        </div>
    `;
    
    return div;
}

// 🔄 CARGAR ACTIVIDAD RECIENTE
async function loadRecentActivity() {
    try {
        const topicsRef = collection(db, 'forumTopics');
        const recentQuery = query(topicsRef, orderBy('createdAt', 'desc'), limit(10));
        const querySnapshot = await getDocs(recentQuery);
        
        const activityFeed = document.getElementById('real-time-activity');
        if (!activityFeed) return;

        activityFeed.innerHTML = '';

        for (const doc of querySnapshot.docs) {
            const topicData = doc.data();
            
            // Actividad de tema creado
            const topicActivity = {
                type: 'topic_created',
                description: `Nuevo tema: "${topicData.title}"`,
                timestamp: topicData.createdAt?.toDate(),
                author: topicData.author?.displayName || 'Usuario'
            };
            
            const activityElement = createActivityElement(topicActivity);
            activityFeed.appendChild(activityElement);

            // Verificar comentarios recientes en este tema
            try {
                const commentsRef = collection(db, 'forumTopics', doc.id, 'comments');
                const recentCommentsQuery = query(commentsRef, orderBy('createdAt', 'desc'), limit(2));
                const commentsSnapshot = await getDocs(recentCommentsQuery);
                
                commentsSnapshot.forEach(commentDoc => {
                    const commentData = commentDoc.data();
                    const commentActivity = {
                        type: 'comment_created',
                        description: `Comentario en: "${topicData.title}"`,
                        timestamp: commentData.createdAt?.toDate(),
                        author: commentData.author?.displayName || 'Usuario'
                    };
                    
                    const commentElement = createActivityElement(commentActivity);
                    activityFeed.appendChild(commentElement);
                });
            } catch (error) {
                console.log('No se pudieron cargar comentarios para actividad');
            }
        }

    } catch (error) {
        console.error('❌ Error cargando actividad reciente:', error);
    }
}

// 🆕 CREAR ELEMENTO DE ACTIVIDAD
function createActivityElement(activity) {
    const div = document.createElement('div');
    div.className = 'activity-item';
    
    const iconMap = {
        'topic_created': 'fas fa-plus-circle',
        'comment_created': 'fas fa-comment',
        'user_joined': 'fas fa-user-plus',
        'admin_action': 'fas fa-cog'
    };

    const timeAgo = formatTimeAgo(activity.timestamp);
    
    div.innerHTML = `
        <div class="activity-icon">
            <i class="${iconMap[activity.type] || 'fas fa-info'}"></i>
        </div>
        <div class="activity-text">
            <p>${activity.description}</p>
            <span>${timeAgo} • ${activity.author || 'Sistema'}</span>
        </div>
    `;
    
    return div;
}

// 🕐 FORMATEAR TIEMPO TRANSCURRIDO
function formatTimeAgo(date) {
    if (!date) return 'Fecha desconocida';
    
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return 'Ahora mismo';
    if (diffMinutes < 60) return `Hace ${diffMinutes} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;
    if (diffDays < 30) return `Hace ${diffDays} días`;
    
    return date.toLocaleDateString('es-ES');
}

// 📊 ACTUALIZAR DASHBOARD CON DATOS REALES
function updateDashboardStats() {
    // Estadísticas principales
    const elements = {
        'total-users': currentStats.totalUsers,
        'total-visits': currentStats.totalViews.toLocaleString(),
        'content-views': currentStats.totalTopics.toLocaleString(),
        'avg-time': currentStats.totalComments.toLocaleString(),
        'quick-users': currentStats.totalUsers,
        'quick-visits': (currentStats.totalViews / 1000).toFixed(1) + 'K'
    };

    // Actualizar elementos del DOM
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });

    // Actualizar labels más descriptivos
    updateStatsLabels();
    updateSectionStats();
}

// 🏷️ ACTUALIZAR ETIQUETAS DE ESTADÍSTICAS
function updateStatsLabels() {
    const labels = {
        'total-users': 'Usuarios Registrados',
        'total-visits': 'Vistas Totales',
        'content-views': 'Temas Creados',
        'avg-time': 'Total Comentarios'
    };

    Object.entries(labels).forEach(([id, label]) => {
        const element = document.getElementById(id);
        if (element && element.nextElementSibling) {
            element.nextElementSibling.textContent = label;
        }
    });
}

// 📊 ACTUALIZAR ESTADÍSTICAS DE SECCIONES
function updateSectionStats() {
    // Sección de usuarios
    const activeUsersElements = document.querySelectorAll('#admin-users-section .stat-details h3');
    if (activeUsersElements[0]) activeUsersElements[0].textContent = currentStats.activeUsers;
    if (activeUsersElements[1]) activeUsersElements[1].textContent = currentStats.recentTopics;

    // Sección de analytics
    const analyticsElements = document.querySelectorAll('#admin-analytics-section .stat-details h3');
    if (analyticsElements[0]) analyticsElements[0].textContent = currentStats.avgTopicsPerUser;
    if (analyticsElements[1]) analyticsElements[1].textContent = currentStats.mostActiveCategory;

    // Sección de contenido
    const contentElements = document.querySelectorAll('#admin-content-section .stat-details h3');
    if (contentElements[0]) contentElements[0].textContent = currentStats.totalTopics;
    if (contentElements[1]) contentElements[1].textContent = currentStats.totalComments;
}

// 🔄 CAMBIAR SECCIONES DEL PANEL
function switchSection(sectionName) {
    // Ocultar todas las secciones
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(`admin-${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Actualizar título
    const titles = {
        dashboard: 'Dashboard Principal',
        users: 'Gestión de Usuarios',
        analytics: 'Analytics del Foro',
        content: 'Gestión de Contenido',
        settings: 'Configuración del Sistema'
    };
    
    document.getElementById('admin-section-title').textContent = titles[sectionName] || 'Panel Admin';
}

// 🚀 MOSTRAR PANEL DE ADMINISTRACIÓN
function showAdminPanel() {
    document.getElementById('admin-access').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    document.getElementById('admin-floating-control').style.display = 'block';
    
    // Actualizar nombre del admin
    const adminName = sessionStorage.getItem('adminName') || ADMIN_CREDENTIALS.name;
    document.getElementById('admin-name').textContent = adminName;
}

// 🌍 MOSTRAR VISTA DE CONTENIDO (PÁGINA PRINCIPAL)
function showContentView() {
    window.location.href = 'index.html';
}

// 🔄 ALTERNAR VISTA ENTRE PANEL Y CONTENIDO
function toggleContentView() {
    const currentView = sessionStorage.getItem('adminViewMode') || 'panel';
    
    if (currentView === 'panel') {
        sessionStorage.setItem('adminViewMode', 'content');
        showContentView();
    } else {
        sessionStorage.setItem('adminViewMode', 'panel');
        showAdminPanel();
    }
}

// 🚪 CERRAR SESIÓN DE ADMINISTRADOR
function logoutAdmin() {
    // Limpiar listeners en tiempo real
    realTimeListeners.forEach(unsubscribe => unsubscribe());
    realTimeListeners = [];
    
    // Limpiar datos de sesión
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminLoginTime');
    sessionStorage.removeItem('adminName');
    sessionStorage.removeItem('adminViewMode');
    
    showAdminMessage('Sesión de administrador cerrada', 'success');
    
    // Redirigir a página principal después de un delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// 🔙 VOLVER AL SITIO PRINCIPAL
function backToSite() {
    window.location.href = 'index.html';
}

// 👁️ TOGGLE PASSWORD VISIBILITY
function toggleAdminPassword() {
    const passwordInput = document.getElementById('admin-password');
    const toggleBtn = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

// 📱 TOGGLE SIDEBAR MÓVIL
function toggleSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    sidebar.classList.toggle('active');
}

// 🔄 REFRESCAR DATOS
async function refreshData() {
    try {
        showAdminMessage('Actualizando datos...', 'success');
        
        // Recargar todos los datos
        await setupRealTimeData();
        
        showAdminMessage('Datos actualizados correctamente', 'success');
    } catch (error) {
        console.error('❌ Error refrescando datos:', error);
        showAdminMessage('Error al actualizar datos', 'error');
    }
}

// 📊 EXPORTAR DATOS
async function exportData() {
    try {
        showAdminMessage('Preparando exportación...', 'success');
        
        // Obtener datos para exportar
        const topicsSnapshot = await getDocs(collection(db, 'forumTopics'));
        const usersSnapshot = await getDocs(collection(db, 'userProfiles'));
        
        const exportData = {
            timestamp: new Date().toISOString(),
            forum: {
                totalTopics: currentStats.totalTopics,
                totalComments: currentStats.totalComments,
                totalViews: currentStats.totalViews,
                mostActiveCategory: currentStats.mostActiveCategory
            },
            users: {
                total: currentStats.totalUsers,
                active: currentStats.activeUsers,
                avgTopicsPerUser: currentStats.avgTopicsPerUser
            },
            stats: currentStats
        };
        
        // Crear y descargar archivo JSON
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `ministerio-emd-datos-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        showAdminMessage('Datos exportados exitosamente', 'success');
        
    } catch (error) {
        console.error('❌ Error exportando datos:', error);
        showAdminMessage('Error al exportar datos', 'error');
    }
}

// 💬 MOSTRAR MENSAJES DE ADMINISTRADOR
function showAdminMessage(message, type = 'success') {
    // Crear elemento de mensaje
    const messageEl = document.createElement('div');
    messageEl.className = `admin-message ${type}`;
    messageEl.textContent = message;
    
    // Agregar al DOM
    document.body.appendChild(messageEl);
    
    // Mostrar mensaje
    setTimeout(() => messageEl.classList.add('show'), 100);
    
    // Ocultar y remover después de 3 segundos
    setTimeout(() => {
        messageEl.classList.remove('show');
        setTimeout(() => document.body.removeChild(messageEl), 300);
    }, 3000);
}

// 🌍 FUNCIONES GLOBALES PARA USO EN HTML
window.showAdminPanel = showAdminPanel;
window.showContentView = showContentView;
window.toggleContentView = toggleContentView;
window.logoutAdmin = logoutAdmin;
window.backToSite = backToSite;
window.toggleAdminPassword = toggleAdminPassword;
window.toggleSidebar = toggleSidebar;
window.refreshData = refreshData;
window.exportData = exportData;

console.log('🔐 Panel de Administración EMD con datos reales - Cargado');