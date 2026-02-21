// Comunidad/js/topic/ui-helpers.js - FUNCIONES AUXILIARES SIMPLIFICADAS

// 🔧 ESTADOS DE CARGA
export function showLoadingState() {
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

export function hideLoadingState() {
    const container = document.querySelector('.topic-container');
    if (container) {
        container.style.opacity = '1';
        container.style.pointerEvents = 'auto';
    }
}

// 🔧 FUNCIÓN: Mostrar requerimiento de autenticación
export function showAuthRequired() {
    const container = document.querySelector('.topic-container');
    if (!container) return;
    
    // Obtener información de diagnóstico
    const authInitialized = localStorage.getItem('authInitialized') === 'true';
    const currentUser = localStorage.getItem('currentUser');
    
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
                    • Usuario actual: ${currentUser ? JSON.parse(currentUser).displayName : 'Ninguno'}<br>
                    • localStorage: ${currentUser ? 'Presente' : 'Ausente'}
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

// 🔧 FUNCIÓN: Mostrar tema no encontrado
export function showTopicNotFound() {
    const container = document.querySelector('.topic-container');
    if (!container) return;
    
    container.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
            <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: var(--card-shadow); max-width: 500px; margin: 0 auto;">
                <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: var(--gradient-bg); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-search" style="font-size: 2rem; color: white;"></i>
                </div>
                <h2 style="color: var(--dark-color); margin-bottom: 15px;">Tema No Encontrado</h2>
                <p style="color: #666; margin-bottom: 25px;">El tema que buscas no existe o ha sido removido.</p>
                <a href="forum.html" style="display: inline-block; background: var(--gradient-bg); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                    <i class="fas fa-arrow-left"></i> Volver al Foro
                </a>
            </div>
        </div>
    `;
}

// 🔧 FUNCIONES DE MENSAJES (SIMPLIFICADAS)
export function showSuccessMessage(message) {
    showMessage(message, 'success');
}

export function showErrorMessage(message) {
    showMessage(message, 'error');
}

export function showWarningMessage(message) {
    showMessage(message, 'warning');
}

export function showInfoMessage(message) {
    showMessage(message, 'info');
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    
    // 🎯 ESTILOS INLINE DIRECTOS (como en el archivo original que funciona)
    let backgroundColor, icon;
    switch (type) {
        case 'success':
            backgroundColor = 'linear-gradient(135deg, #10b981, #059669)';
            icon = 'fa-check-circle';
            break;
        case 'error':
            backgroundColor = 'linear-gradient(135deg, #ef4444, #dc2626)';
            icon = 'fa-exclamation-triangle';
            break;
        case 'warning':
            backgroundColor = 'linear-gradient(135deg, #f59e0b, #d97706)';
            icon = 'fa-exclamation-circle';
            break;
        case 'info':
            backgroundColor = 'linear-gradient(135deg, #3b82f6, #2563eb)';
            icon = 'fa-info-circle';
            break;
        default:
            backgroundColor = 'linear-gradient(135deg, #6b7280, #4b5563)';
            icon = 'fa-bell';
    }
    
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
        background: ${backgroundColor};
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    messageDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas ${icon}"></i>
            <span>${escapeHtml(message)}</span>
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    // Animación de entrada
    setTimeout(() => messageDiv.style.transform = 'translateX(0)', 100);
    
    // Animación de salida (tiempo fijo en lugar de CONFIG)
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => messageDiv.remove(), 300);
    }, 4000);
}

// 🔧 FUNCIONES DE FORMATEO
export function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

export function formatTopicContent(content) {
    if (!content) return '';
    
    return escapeHtml(content)
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/^/, '<p>')
        .replace(/$/, '</p>');
}

export function formatCommentContent(content) {
    if (!content) return '';
    
    return escapeHtml(content)
        .replace(/\n/g, '<br>')
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
}

// 🔧 FUNCIÓN: Obtener tiempo relativo
export function getTimeAgo(date) {
    if (!date) return 'Fecha desconocida';
    
    const now = new Date();
    const targetDate = new Date(date);
    const diffInSeconds = Math.floor((now - targetDate) / 1000);
    
    if (diffInSeconds < 60) return 'Ahora mismo';
    if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} minutos`;
    if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`;
    if (diffInSeconds < 604800) return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
    
    return targetDate.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// 🔧 FUNCIÓN: Generar ID único
export function generateId(prefix = 'element') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// 🔧 FUNCIÓN: Obtener ID de tema desde URL
export function getTopicIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    let topicId = urlParams.get('id');
    
    // Si no hay ID en URL, intentar obtener desde localStorage (último tema visitado)
    if (!topicId) {
        topicId = localStorage.getItem('lastViewedTopic');
    }
    
    return topicId;
}

// 🔧 FUNCIONES DE SCROLL Y NAVEGACIÓN
export function scrollToCommentForm() {
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

export function scrollToElement(selector, offset = 0) {
    const element = document.querySelector(selector);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: elementPosition + offset,
            behavior: 'smooth'
        });
    }
}

export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 🔧 FUNCIÓN: Actualizar contador de caracteres
export function updateCharCounter(textareaId, counterId, maxLength) {
    const textarea = document.getElementById(textareaId);
    const counter = document.getElementById(counterId);
    
    if (!textarea || !counter) return;
    
    const currentLength = textarea.value.length;
    counter.textContent = currentLength;
    
    // Cambiar color según límite
    if (currentLength > maxLength * 0.9) {
        counter.style.color = '#e74c3c';
    } else if (currentLength > maxLength * 0.8) {
        counter.style.color = '#f39c12';
    } else {
        counter.style.color = '#666';
    }
}

// 🔧 FUNCIÓN: Crear avatar de usuario
export function createUserAvatar(user, size = 40) {
    if (!user) return '<div class="default-avatar">?</div>';
    
    if (user.photo || user.photoURL) {
        return `<img src="${user.photo || user.photoURL}" alt="${user.name || user.displayName}" style="width: ${size}px; height: ${size}px; border-radius: 50%; object-fit: cover;">`;
    } else {
        const initial = (user.name || user.displayName || 'U').charAt(0).toUpperCase();
        return `<div class="default-avatar" style="width: ${size}px; height: ${size}px; border-radius: 50%; background: var(--primary-color); color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: ${size * 0.4}px;">${initial}</div>`;
    }
}

// 🔧 FUNCIÓN: Crear modal genérico (SIMPLIFICADO)
export function createModal(id, title, content, options = {}) {
    const modal = document.createElement('div');
    modal.id = id;
    modal.className = 'modal';
    
    // 🎯 ESTILOS INLINE DIRECTOS en lugar de SHARED_STYLES
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const maxWidth = options.maxWidth || '500px';
    const showCloseButton = options.showCloseButton !== false;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            border-radius: 16px;
            padding: 30px;
            max-width: ${maxWidth};
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease;
            position: relative;
        ">
            ${showCloseButton ? `
                <button class="close-modal" onclick="closeModal('${id}')" style="
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
            ` : ''}
            
            ${title ? `
                <div class="modal-header" style="text-align: center; margin-bottom: 25px;">
                    <h3 style="margin: 0; color: var(--dark-color);">${title}</h3>
                </div>
            ` : ''}
            
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    // Event listener para cerrar al hacer clic fuera
    if (options.closeOnBackdrop !== false) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(id);
            }
        });
    }
    
    return modal;
}

// 🔧 FUNCIÓN: Mostrar modal
export function showModal(modal) {
    if (typeof modal === 'string') {
        modal = document.getElementById(modal);
    }
    
    if (!modal) return;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modal.style.opacity = '1';
        const content = modal.querySelector('.modal-content');
        if (content) content.style.transform = 'scale(1)';
    }, 10);
}

// 🔧 FUNCIÓN: Cerrar modal
export function closeModal(modalId) {
    const modal = typeof modalId === 'string' ? document.getElementById(modalId) : modalId;
    if (!modal) return;
    
    modal.style.opacity = '0';
    const content = modal.querySelector('.modal-content');
    if (content) content.style.transform = 'scale(0.9)';
    document.body.style.overflow = 'auto';
    
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}

// 🔧 FUNCIÓN: Confirmar acción
export function confirmAction(message, onConfirm, onCancel = null) {
    if (confirm(message)) {
        if (typeof onConfirm === 'function') {
            onConfirm();
        }
    } else {
        if (typeof onCancel === 'function') {
            onCancel();
        }
    }
}

// 🔧 FUNCIÓN: Debounce para optimizar eventos
export function debounce(func, wait) {
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

// 🔧 FUNCIÓN: Throttle para limitar eventos
export function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 🔧 FUNCIÓN: Verificar si elemento está visible en viewport
export function isElementVisible(element) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 🔧 FUNCIÓN: Obtener información del dispositivo
export function getDeviceInfo() {
    return {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isTablet: /iPad|Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent),
        isDesktop: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        userAgent: navigator.userAgent
    };
}

// 🔧 EXPONER FUNCIONES GLOBALMENTE PARA USO DESDE HTML
window.closeModal = closeModal;
window.scrollToCommentForm = scrollToCommentForm;

console.log('🎨 Ayudantes de UI simplificados cargados');