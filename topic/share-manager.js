// Comunidad/js/topic/share-manager.js - SISTEMA DE COMPARTIR

import { CONFIG, ANALYTICS_EVENTS } from './config.js';
import { trackEvent } from './auth-manager.js';
import { 
    showSuccessMessage, 
    showErrorMessage, 
    createModal, 
    showModal, 
    closeModal 
} from './ui-helpers.js';

export class ShareManager {
    constructor(user) {
        this.currentUser = user;
        this.currentTopic = null;
    }

    // 🔧 FUNCIÓN: Configurar event listeners
    setupEventListeners(topic) {
        this.currentTopic = topic;
        this._setupShareButton();
    }

    // 🔧 FUNCIÓN PRIVADA: Configurar botón de compartir
    _setupShareButton() {
        const shareBtn = document.getElementById('share-topic-btn');
        if (!shareBtn) {
            console.error('❌ BOTÓN DE COMPARTIR NO ENCONTRADO - Verifica que existe en el HTML con id="share-topic-btn"');
            return;
        }
        
        shareBtn.addEventListener('click', async () => {
            await this.shareTopic();
        });
        
        console.log('✅ Botón de compartir configurado correctamente');
    }

    // 🔧 FUNCIÓN PRINCIPAL: Compartir tema
    async shareTopic() {
        if (!this.currentTopic) {
            showErrorMessage('No hay tema para compartir');
            return;
        }

        console.log('📤 Iniciando función de compartir...');

        const shareData = this._getShareData();
        this._showLoadingState();

        try {
            // 1️⃣ Intentar Web Share API nativa (móviles y algunos navegadores)
            if (await this._tryNativeShare(shareData)) {
                return;
            }
        } catch (error) {
            console.log('⚠️ Web Share API falló, usando fallback:', error);
        }

        // 2️⃣ Fallback: Mostrar modal con opciones de compartir
        console.log('💻 Usando modal personalizado para compartir');
        this._showShareModal(shareData);
    }

    // 🔧 FUNCIÓN PRIVADA: Obtener datos para compartir
    _getShareData() {
        return {
            title: `${this.currentTopic.title} - Comunidad Ministerio`,
            text: `${this.currentTopic.content.substring(0, 150)}...`,
            url: window.location.href
        };
    }

    // 🔧 FUNCIÓN PRIVADA: Mostrar estado de carga
    _showLoadingState() {
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
    }

    // 🔧 FUNCIÓN PRIVADA: Intentar compartir nativo
    async _tryNativeShare(shareData) {
        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            console.log('📱 Usando Web Share API nativa');
            await navigator.share(shareData);
            
            // Analytics
            trackEvent(ANALYTICS_EVENTS.TOPIC_SHARED, {
                topic_id: this.currentTopic.id,
                method: 'native_share'
            });
            
            showSuccessMessage('¡Tema compartido exitosamente!');
            return true;
        }
        return false;
    }

    // 🔧 FUNCIÓN PRIVADA: Mostrar modal de compartir
    _showShareModal(shareData) {
        const modal = this._createShareModal();
        this._updateShareModalContent(modal, shareData);
        
        document.body.appendChild(modal);
        showModal(modal);
    }

    // 🔧 FUNCIÓN PRIVADA: Crear modal de compartir
    _createShareModal() {
        const modalContent = `
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
                ${this._createShareOption('copyUrl', 'fa-link', '#6366f1', 'Copiar Enlace', 'Copia la URL del tema')}
                ${this._createShareOption('whatsapp', 'fa-whatsapp', '#25d366', 'WhatsApp', 'Compartir por WhatsApp')}
                ${this._createShareOption('telegram', 'fa-telegram-plane', '#0088cc', 'Telegram', 'Compartir por Telegram')}
                ${this._createShareOption('email', 'fa-envelope', '#ea4335', 'Email', 'Enviar por correo electrónico')}
            </div>

            <div style="text-align: center; margin-top: 25px;">
                <button onclick="window.closeShareModal && window.closeShareModal()" style="
                    background: #f0f0f0;
                    color: #666;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                ">Cerrar</button>
            </div>
        `;

        const modal = createModal('share-modal', null, modalContent, {
            maxWidth: '500px',
            showCloseButton: true
        });

        // Agregar estilos CSS
        this._addShareModalStyles();

        return modal;
    }

    // 🔧 FUNCIÓN PRIVADA: Crear opción de compartir
    _createShareOption(action, icon, color, title, description) {
        return `
            <div class="share-option" style="
                display: flex;
                align-items: center;
                padding: 15px;
                border: 2px solid #f0f0f0;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
            " onclick="window.shareAction && window.shareAction('${action}')">
                <div style="
                    width: 45px;
                    height: 45px;
                    background: ${color};
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 15px;
                ">
                    <i class="fas ${icon}" style="color: white; font-size: 18px;"></i>
                </div>
                <div style="flex: 1;">
                    <h4 style="margin: 0; font-size: 16px; color: var(--dark-color);">${title}</h4>
                    <p style="margin: 0; font-size: 14px; color: #666;">${description}</p>
                </div>
                <i class="fas fa-chevron-right" style="color: #ccc;"></i>
            </div>
        `;
    }

    // 🔧 FUNCIÓN PRIVADA: Agregar estilos CSS
    _addShareModalStyles() {
        if (document.getElementById('share-modal-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'share-modal-styles';
        style.textContent = `
            .modal.active {
                opacity: 1 !important;
            }
            .modal.active .modal-content {
                transform: scale(1) !important;
            }
            .share-option:hover {
                border-color: var(--secondary-color) !important;
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
        `;
        document.head.appendChild(style);
    }

    // 🔧 FUNCIÓN PRIVADA: Actualizar contenido del modal
    _updateShareModalContent(modal, shareData) {
        const titleElement = modal.querySelector('#share-topic-title');
        if (titleElement) {
            titleElement.textContent = shareData.title;
        }
        
        // Guardar datos para las funciones de compartir
        modal.shareData = shareData;
    }

    // 🔧 FUNCIÓN: Copiar URL del tema
    async copyUrl() {
        console.log('📋 Copiando URL del tema...');
        try {
            await navigator.clipboard.writeText(window.location.href);
            showSuccessMessage('¡Enlace copiado al portapapeles!');
            this._closeShareModal();
            
            // Analytics
            trackEvent(ANALYTICS_EVENTS.TOPIC_SHARED, {
                topic_id: this.currentTopic.id,
                method: 'copy_url'
            });
        } catch (error) {
            console.error('Error al copiar:', error);
            this._fallbackCopyUrl();
        }
    }

    // 🔧 FUNCIÓN PRIVADA: Fallback para copiar URL
    _fallbackCopyUrl() {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            showSuccessMessage('¡Enlace copiado al portapapeles!');
            this._closeShareModal();
            
            // Analytics
            trackEvent(ANALYTICS_EVENTS.TOPIC_SHARED, {
                topic_id: this.currentTopic.id,
                method: 'copy_url_fallback'
            });
        } catch (fallbackError) {
            console.error('Error en fallback de copia:', fallbackError);
            showErrorMessage('No se pudo copiar el enlace');
        }
    }

    // 🔧 FUNCIÓN: Compartir por WhatsApp
    shareToWhatsApp() {
        console.log('📱 Compartiendo por WhatsApp...');
        if (!this.currentTopic) return;
        
        const text = `*${this.currentTopic.title}*\n\n${this.currentTopic.content.substring(0, 200)}...\n\n📖 Lee más: ${window.location.href}`;
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        
        window.open(url, '_blank');
        this._closeShareModal();
        
        // Analytics
        trackEvent(ANALYTICS_EVENTS.TOPIC_SHARED, {
            topic_id: this.currentTopic.id,
            method: 'whatsapp'
        });
    }

    // 🔧 FUNCIÓN: Compartir por Telegram
    shareToTelegram() {
        console.log('✈️ Compartiendo por Telegram...');
        if (!this.currentTopic) return;
        
        const text = `${this.currentTopic.title}\n\n${this.currentTopic.content.substring(0, 200)}...\n\n📖 Lee más: ${window.location.href}`;
        const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
        
        window.open(url, '_blank');
        this._closeShareModal();
        
        // Analytics
        trackEvent(ANALYTICS_EVENTS.TOPIC_SHARED, {
            topic_id: this.currentTopic.id,
            method: 'telegram'
        });
    }

    // 🔧 FUNCIÓN: Compartir por email
    shareByEmail() {
        console.log('📧 Compartiendo por Email...');
        if (!this.currentTopic) return;
        
        const subject = `Te comparto: ${this.currentTopic.title}`;
        const body = `Hola,\n\nQuería compartir contigo este tema de nuestra comunidad:\n\n"${this.currentTopic.title}"\n\n${this.currentTopic.content.substring(0, 300)}...\n\nPuedes leer el tema completo aquí: ${window.location.href}\n\n¡Bendiciones!`;
        
        const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
        
        this._closeShareModal();
        
        // Analytics
        trackEvent(ANALYTICS_EVENTS.TOPIC_SHARED, {
            topic_id: this.currentTopic.id,
            method: 'email'
        });
    }

    // 🔧 FUNCIÓN PRIVADA: Cerrar modal de compartir
    _closeShareModal() {
        closeModal('share-modal');
    }

    // 🔧 FUNCIÓN: Ejecutar acción de compartir
    executeShareAction(action) {
        switch (action) {
            case 'copyUrl':
                this.copyUrl();
                break;
            case 'whatsapp':
                this.shareToWhatsApp();
                break;
            case 'telegram':
                this.shareToTelegram();
                break;
            case 'email':
                this.shareByEmail();
                break;
            default:
                console.warn('Acción de compartir no reconocida:', action);
        }
    }

    // 🔧 FUNCIÓN: Obtener estadísticas de compartir
    getShareStats() {
        // En una implementación real, esto podría obtener estadísticas del servidor
        return {
            nativeShareSupported: !!(navigator.share && navigator.canShare),
            clipboardSupported: !!navigator.clipboard,
            timestamp: new Date().toISOString()
        };
    }
}

// 🔧 EXPONER FUNCIONES GLOBALMENTE PARA USO DESDE HTML
window.shareAction = function(action) {
    const manager = window.shareManager && window.shareManager();
    if (manager) {
        manager.executeShareAction(action);
    }
};

window.closeShareModal = function() {
    closeModal('share-modal');
};

// Funciones específicas para compatibilidad
window.shareTopicThisTopic = function() {
    const manager = window.shareManager && window.shareManager();
    if (manager) {
        manager.shareTopic();
    }
};

window.copyTopicUrl = function() {
    const manager = window.shareManager && window.shareManager();
    if (manager) {
        manager.copyUrl();
    }
};

window.shareToWhatsApp = function() {
    const manager = window.shareManager && window.shareManager();
    if (manager) {
        manager.shareToWhatsApp();
    }
};

window.shareToTelegram = function() {
    const manager = window.shareManager && window.shareManager();
    if (manager) {
        manager.shareToTelegram();
    }
};

window.shareByEmail = function() {
    const manager = window.shareManager && window.shareManager();
    if (manager) {
        manager.shareByEmail();
    }
};

console.log('📤 Gestor de compartir listo');