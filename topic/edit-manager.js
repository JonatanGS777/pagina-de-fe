// Comunidad/js/topic/edit-manager.js - EDICIÓN Y BORRADO SIMPLIFICADO

import { CONFIG, CATEGORIES, ANALYTICS_EVENTS } from './config.js';
import { trackEvent } from './auth-manager.js';
import { 
    escapeHtml,
    showSuccessMessage,
    showErrorMessage
} from './ui-helpers.js';
import { 
    updateTopicInFirestore,
    deleteTopicFromFirestore,
    updateCommentInFirestore,
    deleteCommentFromFirestore,
    saveTopicToLocalStorage,
    saveCommentsToLocalStorage
} from './firestore-sync.js';

export class EditManager {
    constructor(user) {
        this.currentUser = user;
        this.currentTopic = null;
        this.currentTopicId = null;
        this.onTopicUpdate = null;
        this.comments = [];
    }

    // 🔧 FUNCIÓN: Configurar event listeners
    setupEventListeners(topic, topicId, onTopicUpdate) {
        this.currentTopic = topic;
        this.currentTopicId = topicId;
        this.onTopicUpdate = onTopicUpdate;
    }

    // 🔧 FUNCIÓN: Verificar si puede editar (LÓGICA SIMPLE COMO EL ORIGINAL)
    _canEdit(item) {
        if (!this.currentUser || !item) return false;
        
        // Verificación directa por email (como en el original que funciona)
        return item.author.email === this.currentUser.email;
    }

    // 🔧 FUNCIÓN: Verificar si es admin (LÓGICA SIMPLE)
    _isAdmin() {
        return this.currentUser && this.currentUser.email === 'ministeriolagloriaesdelsenor7@gmail.com';
    }

    // 🔧 FUNCIÓN: Verificar permisos combinados
    _hasPermissions(item) {
        return this._canEdit(item) || this._isAdmin();
    }

    // 🔧 FUNCIÓN: Editar tema principal
    async editTopic() {
        if (!this.currentTopic || !this._hasPermissions(this.currentTopic)) {
            showErrorMessage('No tienes permisos para editar este tema');
            return;
        }
        
        console.log('✏️ Iniciando edición del tema...');
        
        const modal = this._createEditTopicModal();
        document.body.appendChild(modal);
        this._showModal(modal);
    }

    // 🔧 FUNCIÓN PRIVADA: Crear modal de edición (SIMPLIFICADO)
    _createEditTopicModal() {
        const modal = document.createElement('div');
        modal.id = 'edit-topic-modal';
        modal.className = 'edit-modal';
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

        modal.innerHTML = `
            <div class="edit-content" style="
                background: white;
                border-radius: 16px;
                padding: 30px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                transform: scale(0.9);
                transition: transform 0.3s ease;
                position: relative;
            ">
                <button class="close-modal" onclick="window.closeEditTopicModal && window.closeEditTopicModal()" style="
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
                
                <div class="edit-header" style="text-align: center; margin-bottom: 25px;">
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
                        <i class="fas fa-edit" style="color: white; font-size: 24px;"></i>
                    </div>
                    <h3 style="margin: 0; color: var(--dark-color);">Editar Tema</h3>
                </div>

                <form id="edit-topic-form">
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--dark-color);">Título:</label>
                        <input type="text" id="edit-topic-title" value="${escapeHtml(this.currentTopic.title)}" style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid var(--light-accent);
                            border-radius: 8px;
                            font-family: 'Poppins', sans-serif;
                            font-size: 16px;
                            transition: border-color 0.3s ease;
                        " required maxlength="200">
                    </div>

                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--dark-color);">Categoría:</label>
                        <select id="edit-topic-category" style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid var(--light-accent);
                            border-radius: 8px;
                            font-family: 'Poppins', sans-serif;
                            font-size: 16px;
                            background: white;
                            cursor: pointer;
                        " required>
                            ${Object.entries(CATEGORIES).map(([key, cat]) => 
                                `<option value="${key}" ${this.currentTopic.category === key ? 'selected' : ''}>${cat.name}</option>`
                            ).join('')}
                        </select>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--dark-color);">Contenido:</label>
                        <textarea id="edit-topic-content" style="
                            width: 100%;
                            min-height: 200px;
                            padding: 12px;
                            border: 2px solid var(--light-accent);
                            border-radius: 8px;
                            font-family: 'Poppins', sans-serif;
                            font-size: 16px;
                            resize: vertical;
                            transition: border-color 0.3s ease;
                        " required maxlength="5000">${escapeHtml(this.currentTopic.content)}</textarea>
                        <div style="text-align: right; font-size: 14px; color: #666; margin-top: 5px;">
                            <span id="edit-content-counter">${this.currentTopic.content.length}</span>/5000 caracteres
                        </div>
                    </div>

                    <div style="margin-bottom: 25px;">
                        <label style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--dark-color);">Versículo (opcional):</label>
                        <textarea id="edit-topic-verse" placeholder="Escribe un versículo relacionado..." style="
                            width: 100%;
                            min-height: 80px;
                            padding: 12px;
                            border: 2px solid var(--light-accent);
                            border-radius: 8px;
                            font-family: 'Poppins', sans-serif;
                            font-size: 16px;
                            resize: vertical;
                        " maxlength="500">${this.currentTopic.verse || ''}</textarea>
                        
                        <input type="text" id="edit-topic-verse-ref" placeholder="Referencia (ej: Juan 3:16)" value="${this.currentTopic.verseRef || ''}" style="
                            width: 100%;
                            padding: 10px 12px;
                            border: 2px solid var(--light-accent);
                            border-radius: 8px;
                            font-family: 'Poppins', sans-serif;
                            font-size: 14px;
                            margin-top: 10px;
                        " maxlength="50">
                    </div>

                    <div style="display: flex; gap: 15px; justify-content: center;">
                        <button type="button" onclick="window.closeEditTopicModal && window.closeEditTopicModal()" style="
                            background: #f0f0f0;
                            color: #666;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 8px;
                            cursor: pointer;
                            font-weight: 500;
                            font-family: 'Poppins', sans-serif;
                        ">Cancelar</button>
                        
                        <button type="submit" id="save-topic-btn" style="
                            background: var(--gradient-bg);
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 8px;
                            cursor: pointer;
                            font-weight: 600;
                            font-family: 'Poppins', sans-serif;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        ">
                            <i class="fas fa-save"></i>
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        `;

        // Event listeners
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this._closeEditTopicModal();
            }
        });

        const form = modal.querySelector('#edit-topic-form');
        if (form) {
            form.addEventListener('submit', (e) => this._saveTopicChanges(e));
        }

        const contentTextarea = modal.querySelector('#edit-topic-content');
        const contentCounter = modal.querySelector('#edit-content-counter');
        if (contentTextarea && contentCounter) {
            contentTextarea.addEventListener('input', () => {
                contentCounter.textContent = contentTextarea.value.length;
                
                if (contentTextarea.value.length > 4500) {
                    contentCounter.style.color = '#e74c3c';
                } else if (contentTextarea.value.length > 4000) {
                    contentCounter.style.color = '#f39c12';
                } else {
                    contentCounter.style.color = '#666';
                }
            });
        }

        return modal;
    }

    // 🔧 FUNCIÓN: Mostrar modal
    _showModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            modal.style.opacity = '1';
            const content = modal.querySelector('.edit-content');
            if (content) content.style.transform = 'scale(1)';
        }, 10);
    }

    // 🔧 FUNCIÓN: Guardar cambios del tema
    async _saveTopicChanges(event) {
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
            const updates = {
                title: newTitle,
                category: newCategory,
                content: newContent,
                verse: newVerse || null,
                verseRef: newVerseRef || null
            };

            // Actualizar en Firestore
            await updateTopicInFirestore(this.currentTopicId, updates);
            
            // Actualizar objeto local
            Object.assign(this.currentTopic, updates);
            this.currentTopic.editedAt = new Date().toISOString();
            
            // Actualizar en localStorage como respaldo
            saveTopicToLocalStorage(this.currentTopic);
            
            // Notificar actualización
            if (this.onTopicUpdate) {
                this.onTopicUpdate(this.currentTopic);
            }
            
            this._closeEditTopicModal();
            showSuccessMessage('¡Tema actualizado exitosamente!');
            
            // Analytics
            if (typeof trackEvent === 'function') {
                trackEvent(ANALYTICS_EVENTS.TOPIC_EDITED, {
                    topic_id: this.currentTopicId,
                    content_length: newContent.length
                });
            }
            
        } catch (error) {
            console.error('❌ Error al actualizar tema:', error);
            
            // Fallback a localStorage
            try {
                Object.assign(this.currentTopic, {
                    title: newTitle,
                    category: newCategory,
                    content: newContent,
                    verse: newVerse || null,
                    verseRef: newVerseRef || null,
                    editedAt: new Date().toISOString()
                });
                
                saveTopicToLocalStorage(this.currentTopic);
                
                if (this.onTopicUpdate) {
                    this.onTopicUpdate(this.currentTopic);
                }
                
                this._closeEditTopicModal();
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

    // 🔧 FUNCIÓN: Borrar tema
    async deleteTopic() {
        if (!this.currentTopic || !this._hasPermissions(this.currentTopic)) {
            showErrorMessage('No tienes permisos para borrar este tema');
            return;
        }
        
        const confirmMessage = `¿Estás seguro de que quieres borrar este tema?\n\n"${this.currentTopic.title}"\n\nEsta acción no se puede deshacer y se borrarán todos los comentarios asociados.`;
        
        if (!confirm(confirmMessage)) {
            return;
        }
        
        console.log('🗑️ Borrando tema...');
        
        try {
            // Borrar de Firestore
            await deleteTopicFromFirestore(this.currentTopicId);
            
            console.log('✅ Tema borrado de Firestore');
            
            // Analytics
            if (typeof trackEvent === 'function') {
                trackEvent(ANALYTICS_EVENTS.TOPIC_DELETED, {
                    topic_id: this.currentTopicId,
                    topic_title: this.currentTopic.title
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
                const updatedTopics = topics.filter(t => t.id !== this.currentTopicId);
                localStorage.setItem('forumTopics', JSON.stringify(updatedTopics));
                
                showSuccessMessage('Tema borrado exitosamente');
                
                setTimeout(() => {
                    window.location.href = 'forum.html';
                }, 1500);
                
            } catch (localError) {
                console.error('❌ Error en fallback localStorage:', localError);
                showErrorMessage('Error al borrar el tema');
            }
        }
    }

    // 🔧 FUNCIÓN: Editar comentario
    async editComment(commentId) {
        const comment = this._findCommentById(commentId);
        if (!comment) {
            showErrorMessage('Comentario no encontrado');
            return;
        }
        
        // 🎯 VERIFICACIÓN SIMPLE COMO EN EL ARCHIVO ORIGINAL
        if (!this._hasPermissions(comment)) {
            showErrorMessage('No tienes permisos para editar este comentario');
            return;
        }
        
        const newContent = prompt('Editar comentario:', comment.content);
        if (newContent === null || newContent.trim() === comment.content) {
            return; // Usuario canceló o no cambió nada
        }
        
        if (!this._validateCommentContent(newContent.trim())) {
            return;
        }
        
        const originalContent = comment.content;
        
        try {
            // Actualizar en Firestore
            await updateCommentInFirestore(this.currentTopicId, commentId, {
                content: newContent.trim(),
                editedAt: new Date().toISOString(),
                isEdited: true
            });
            
            // Actualizar objeto local
            comment.content = newContent.trim();
            comment.editedAt = new Date().toISOString();
            comment.isEdited = true;
            
            // Guardar en localStorage como respaldo
            saveCommentsToLocalStorage(this.currentTopicId, this.comments);
            
            showSuccessMessage('Comentario editado exitosamente');
            
            // Analytics
            if (typeof trackEvent === 'function') {
                trackEvent(ANALYTICS_EVENTS.COMMENT_EDITED, {
                    comment_id: commentId,
                    topic_id: this.currentTopicId,
                    content_length: newContent.trim().length
                });
            }
            
        } catch (error) {
            console.error('❌ Error al editar comentario:', error);
            showErrorMessage('Error al editar el comentario');
        }
    }

    // 🔧 FUNCIÓN: Borrar comentario
    async deleteComment(commentId) {
        const comment = this._findCommentById(commentId);
        if (!comment) {
            showErrorMessage('Comentario no encontrado');
            return;
        }
        
        // 🎯 VERIFICACIÓN SIMPLE COMO EN EL ARCHIVO ORIGINAL
        if (!this._hasPermissions(comment)) {
            showErrorMessage('No tienes permisos para borrar este comentario');
            return;
        }
        
        const confirmMessage = '¿Estás seguro de que quieres borrar este comentario?\n\nEsta acción no se puede deshacer.';
        if (!confirm(confirmMessage)) {
            return;
        }
        
        console.log('🗑️ Borrando comentario:', commentId);
        
        try {
            // Borrar de Firestore
            await deleteCommentFromFirestore(this.currentTopicId, commentId);
            
            console.log('✅ Comentario borrado de Firestore');
            
            // Analytics
            if (typeof trackEvent === 'function') {
                trackEvent(ANALYTICS_EVENTS.COMMENT_DELETED, {
                    comment_id: commentId,
                    topic_id: this.currentTopicId
                });
            }
            
            showSuccessMessage('Comentario borrado exitosamente');
            
        } catch (error) {
            console.error('❌ Error al borrar comentario:', error);
            showErrorMessage('Error al borrar el comentario');
        }
    }

    // 🔧 FUNCIÓN: Reportar comentario
    reportComment(commentId) {
        const comment = this._findCommentById(commentId);
        if (!comment) {
            showErrorMessage('Comentario no encontrado');
            return;
        }
        
        // No puede reportar su propio comentario
        if (this.currentUser && comment.author.email === this.currentUser.email) {
            showErrorMessage('No puedes reportar tu propio comentario');
            return;
        }
        
        const confirmMessage = '¿Quieres reportar este comentario?\n\nEsto notificará a los moderadores sobre contenido potencialmente inapropiado.';
        
        if (confirm(confirmMessage)) {
            showSuccessMessage('Comentario reportado. Los moderadores revisarán el contenido.');
            
            // Analytics
            if (typeof trackEvent === 'function') {
                trackEvent(ANALYTICS_EVENTS.COMMENT_REPORTED, {
                    comment_id: commentId,
                    topic_id: this.currentTopicId,
                    reason: 'user_report'
                });
            }
        }
    }

    // 🔧 FUNCIONES AUXILIARES

    _validateCommentContent(content) {
        if (!content) {
            showErrorMessage('El comentario no puede estar vacío');
            return false;
        }
        
        if (content.length < 5) {
            showErrorMessage('El comentario debe tener al menos 5 caracteres');
            return false;
        }
        
        if (content.length > 1000) {
            showErrorMessage('El comentario no puede exceder 1000 caracteres');
            return false;
        }
        
        return true;
    }

    _findCommentById(commentId) {
        for (const comment of this.comments) {
            if (comment.id === commentId) return comment;
            if (comment.replies) {
                const reply = comment.replies.find(r => r.id === commentId);
                if (reply) return reply;
            }
        }
        return null;
    }

    _closeEditTopicModal() {
        const modal = document.getElementById('edit-topic-modal');
        if (modal) {
            modal.style.opacity = '0';
            const content = modal.querySelector('.edit-content');
            if (content) content.style.transform = 'scale(0.9)';
            document.body.style.overflow = 'auto';
            
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    // 🔧 FUNCIÓN: Actualizar comentarios
    updateComments(comments) {
        this.comments = comments;
    }
}

// 🔧 EXPONER FUNCIONES GLOBALMENTE
window.editTopic = function() {
    const manager = window.editManager && window.editManager();
    if (manager) {
        manager.editTopic();
    }
};

window.deleteTopic = function() {
    const manager = window.editManager && window.editManager();
    if (manager) {
        manager.deleteTopic();
    }
};

window.editComment = function(commentId) {
    const manager = window.editManager && window.editManager();
    if (manager) {
        manager.editComment(commentId);
    }
};

window.deleteComment = function(commentId) {
    const manager = window.editManager && window.editManager();
    if (manager) {
        manager.deleteComment(commentId);
    }
};

window.reportComment = function(commentId) {
    const manager = window.editManager && window.editManager();
    if (manager) {
        manager.reportComment(commentId);
    }
};

window.closeEditTopicModal = function() {
    const manager = window.editManager && window.editManager();
    if (manager) {
        manager._closeEditTopicModal();
    }
};

console.log('✏️ Gestor de edición y borrado simplificado listo');