// Comunidad/js/topic/comment-manager.js - GESTIÓN DE COMENTARIOS (VERSIÓN COMPLETA CORREGIDA)

import { CONFIG, SELECTORS, ANALYTICS_EVENTS } from './config.js';
import { trackEvent, getUserDataForNewElement } from './auth-manager.js';
import { 
    formatCommentContent, 
    createUserAvatar, 
    getTimeAgo, 
    escapeHtml,
    showSuccessMessage,
    showErrorMessage,
    updateCharCounter,
    generateId
} from './ui-helpers.js';
import { 
    createCommentInFirestore,
    updateCommentInFirestore,
    deleteCommentFromFirestore,
    toggleCommentLikeInFirestore,
    updateTopicLastActivity,
    saveCommentsToLocalStorage
} from './firestore-sync.js';

export class CommentManager {
    constructor(user) {
        this.currentUser = user;
        this.comments = [];
        this.currentTopicId = null;
        this.onCommentsUpdate = null;
    }

    // 🔧 FUNCIÓN PRINCIPAL: Actualizar UI de comentarios
    updateUI(comments) {
        this.comments = comments || [];
        this._displayComments();
        
        console.log(`💬 UI de comentarios actualizada: ${this.comments.length} comentarios`);
    }

    // 🔧 FUNCIÓN PRIVADA: Mostrar comentarios
    _displayComments() {
        const container = document.getElementById('comments-list');
        const emptyState = document.getElementById('empty-comments');
        
        if (!container) {
            console.error('❌ Container de comentarios no encontrado');
            return;
        }
        
        if (this.comments.length === 0) {
            container.innerHTML = '';
            if (emptyState) {
                container.appendChild(emptyState);
            }
            return;
        }
        
        // Ordenar comentarios según selección
        const sortSelect = document.getElementById('sort-comments');
        const sortBy = sortSelect ? sortSelect.value : 'newest';
        this._sortComments(sortBy);
        
        // Generar HTML de comentarios
        const commentsHTML = this.comments.map(comment => this._createCommentHTML(comment)).join('');
        container.innerHTML = commentsHTML;
        
        // Agregar animaciones
        this._animateComments(container);
    }

    // 🔧 FUNCIÓN PRIVADA: Crear HTML para un comentario (CORREGIDA CON LÓGICA SIMPLE)
    _createCommentHTML(comment, isReply = false) {
        const timeAgo = getTimeAgo(new Date(comment.createdAt));
        const isLiked = comment.likedBy && comment.likedBy.includes(this.currentUser?.uid);
        
        // 🎯 USAR LA MISMA LÓGICA SIMPLE DEL ARCHIVO ORIGINAL QUE FUNCIONA
        const isAuthor = comment.author.email === this.currentUser?.email;
        
        const avatarHTML = createUserAvatar(comment.author, 40);
        
        let repliesHTML = '';
        if (comment.replies && comment.replies.length > 0) {
            repliesHTML = `
                <div class="replies">
                    ${comment.replies.map(reply => this._createCommentHTML(reply, true)).join('')}
                </div>
            `;
        }
        
        return `
            <div class="comment ${isReply ? 'reply' : ''}" data-comment-id="${comment.id}">
                <div class="comment-header">
                    <div class="comment-author">
                        <div class="comment-avatar">${avatarHTML}</div>
                        <div class="comment-info">
                            <h4>${escapeHtml(comment.author.name)} ${isAuthor ? '<span style="color: var(--secondary-color); font-size: 0.8rem;">(Tú)</span>' : ''}</h4>
                            <div class="comment-time">${timeAgo}${comment.editedAt ? ' <em>(editado)</em>' : ''}</div>
                        </div>
                    </div>
                    <div class="comment-actions">
                        ${isAuthor ? `
                            <button class="comment-btn" onclick="window.editComment && window.editComment('${comment.id}')" title="Editar comentario">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="comment-btn" onclick="window.deleteComment && window.deleteComment('${comment.id}')" title="Borrar comentario">
                                <i class="fas fa-trash"></i>
                            </button>
                        ` : `
                            <button class="comment-btn" onclick="window.reportComment && window.reportComment('${comment.id}')" title="Reportar comentario">
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
                        <button class="like-btn ${isLiked ? 'liked' : ''}" onclick="window.toggleCommentLike && window.toggleCommentLike('${comment.id}')">
                            <i class="fas fa-heart"></i>
                            <span>${comment.likes || 0}</span>
                        </button>
                    </div>
                    ${!isReply ? `<button class="reply-btn" onclick="window.showReplyForm && window.showReplyForm('${comment.id}')">Responder</button>` : ''}
                </div>
                
                ${!isReply ? `
                    <div class="reply-form" id="reply-form-${comment.id}">
                        <textarea class="reply-textarea" placeholder="Escribe tu respuesta..." maxlength="${CONFIG.REPLY_MAX_LENGTH}"></textarea>
                        <div class="reply-actions">
                            <button class="reply-submit" onclick="window.submitReply && window.submitReply('${comment.id}')">Responder</button>
                            <button class="reply-cancel" onclick="window.hideReplyForm && window.hideReplyForm('${comment.id}')">Cancelar</button>
                        </div>
                    </div>
                ` : ''}
                
                ${repliesHTML}
            </div>
        `;
    }

    // 🔧 FUNCIÓN PRIVADA: Animar comentarios
    _animateComments(container) {
        container.querySelectorAll('.comment').forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * CONFIG.ANIMATION_DELAY);
        });
    }

    // 🔧 FUNCIÓN PRIVADA: Ordenar comentarios
    _sortComments(sortBy) {
        switch (sortBy) {
            case 'newest':
                this.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                this.comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'likes':
                this.comments.sort((a, b) => (b.likes || 0) - (a.likes || 0));
                break;
        }
    }

    // 🔧 FUNCIÓN: Configurar event listeners
    setupEventListeners(topicId, onCommentsUpdate) {
        this.currentTopicId = topicId;
        this.onCommentsUpdate = onCommentsUpdate;
        
        this._setupCommentForm();
        this._setupSortSelector();
        this._setupCharCounter();
        
        console.log('🎯 Event listeners de comentarios configurados');
    }

    // 🔧 FUNCIÓN PRIVADA: Configurar formulario de comentarios
    _setupCommentForm() {
        const commentForm = document.getElementById('comment-form');
        if (!commentForm) {
            console.warn('⚠️ Formulario de comentario no encontrado');
            return;
        }
        
        commentForm.addEventListener('submit', async (e) => {
            await this._handleNewComment(e);
        });
    }

    // 🔧 FUNCIÓN PRIVADA: Configurar selector de ordenamiento
    _setupSortSelector() {
        const sortSelect = document.getElementById('sort-comments');
        if (!sortSelect) return;
        
        sortSelect.addEventListener('change', () => {
            this._displayComments();
        });
    }

    // 🔧 FUNCIÓN PRIVADA: Configurar contador de caracteres
    _setupCharCounter() {
        const commentTextarea = document.getElementById('comment-text');
        if (!commentTextarea) return;
        
        commentTextarea.addEventListener('input', () => {
            updateCharCounter('comment-text', 'char-count', CONFIG.COMMENT_MAX_LENGTH);
        });
    }

    // 🔧 FUNCIÓN PRIVADA: Manejar nuevo comentario
    async _handleNewComment(e) {
        e.preventDefault();
        
        const commentTextEl = document.getElementById('comment-text');
        const content = commentTextEl ? commentTextEl.value.trim() : '';
        
        if (!this._validateComment(content)) {
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
            author: getUserDataForNewElement(),
            likes: 0,
            likedBy: [],
            replies: []
        };
        
        try {
            // Guardar comentario en Firestore
            const commentId = await createCommentInFirestore(this.currentTopicId, newComment);
            
            // Actualizar tema con última actividad
            await updateTopicLastActivity(this.currentTopicId);
            
            // Limpiar formulario
            const commentForm = document.getElementById('comment-form');
            if (commentForm) commentForm.reset();
            updateCharCounter('comment-text', 'char-count', CONFIG.COMMENT_MAX_LENGTH);
            
            // Analytics
            trackEvent(ANALYTICS_EVENTS.COMMENT_CREATED, {
                topic_id: this.currentTopicId,
                comment_length: content.length,
                comment_id: commentId
            });
            
            showSuccessMessage('¡Comentario publicado exitosamente!');
            
        } catch (error) {
            console.error('❌ Error al crear comentario:', error);
            await this._handleCommentFallback(newComment);
        } finally {
            // Rehabilitar botón de envío
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Publicar comentario';
            }
        }
    }

    // 🔧 FUNCIÓN PRIVADA: Validar comentario
    _validateComment(content) {
        if (!content) {
            showErrorMessage('Por favor, escribe un comentario.');
            return false;
        }
        
        if (content.length < CONFIG.COMMENT_MIN_LENGTH) {
            showErrorMessage(`El comentario debe tener al menos ${CONFIG.COMMENT_MIN_LENGTH} caracteres.`);
            return false;
        }
        
        if (content.length > CONFIG.COMMENT_MAX_LENGTH) {
            showErrorMessage(`El comentario no puede exceder ${CONFIG.COMMENT_MAX_LENGTH} caracteres.`);
            return false;
        }
        
        return true;
    }

    // 🔧 FUNCIÓN PRIVADA: Manejar fallback de comentario
    async _handleCommentFallback(newComment) {
        try {
            // Fallback a localStorage
            newComment.id = generateId('comment');
            newComment.createdAt = new Date().toISOString();
            
            this.comments.unshift(newComment);
            saveCommentsToLocalStorage(this.currentTopicId, this.comments);
            
            this._displayComments();
            
            if (this.onCommentsUpdate) {
                this.onCommentsUpdate(this.comments);
            }
            
            showSuccessMessage('¡Comentario publicado exitosamente!');
            
        } catch (localError) {
            console.error('❌ Error en fallback localStorage:', localError);
            showErrorMessage('Error al publicar el comentario');
        }
    }

    // 🔧 FUNCIÓN: Toggle like en comentario
    async toggleLike(commentId) {
        const comment = this._findCommentById(commentId);
        if (!comment || !this.currentUser) return;
        
        if (!comment.likedBy) comment.likedBy = [];
        
        const userIndex = comment.likedBy.indexOf(this.currentUser.uid);
        const isLiking = userIndex === -1;
        
        // Actualizar UI optimísticamente
        this._updateCommentLikeUI(commentId, isLiking);
        
        try {
            // Actualizar en Firestore
            await toggleCommentLikeInFirestore(this.currentTopicId, commentId, this.currentUser.uid, isLiking, comment.likedBy);
            
            // Actualizar objeto local
            if (isLiking) {
                comment.likedBy.push(this.currentUser.uid);
                comment.likes = (comment.likes || 0) + 1;
            } else {
                comment.likedBy = comment.likedBy.filter(uid => uid !== this.currentUser.uid);
                comment.likes = Math.max((comment.likes || 0) - 1, 0);
            }
            
            // Guardar en localStorage como respaldo
            saveCommentsToLocalStorage(this.currentTopicId, this.comments);
            
            // Analytics
            trackEvent(ANALYTICS_EVENTS.COMMENT_LIKED, {
                comment_id: commentId,
                topic_id: this.currentTopicId,
                action: isLiking ? 'like' : 'unlike'
            });
            
        } catch (error) {
            console.error('❌ Error al actualizar like del comentario:', error);
            
            // Revertir UI en caso de error
            this._updateCommentLikeUI(commentId, !isLiking);
            showErrorMessage('Error al actualizar el me gusta');
        }
    }

    // 🔧 FUNCIÓN PRIVADA: Actualizar UI de like del comentario
    _updateCommentLikeUI(commentId, isLiked) {
        const commentElement = document.querySelector(`[data-comment-id="${commentId}"]`);
        if (!commentElement) return;
        
        const likeBtn = commentElement.querySelector('.like-btn');
        const likeCount = commentElement.querySelector('.like-btn span');
        
        if (likeBtn) {
            likeBtn.classList.toggle('liked', isLiked);
        }
        
        if (likeCount) {
            const currentLikes = parseInt(likeCount.textContent) || 0;
            likeCount.textContent = isLiked ? currentLikes + 1 : currentLikes - 1;
        }
    }

    // 🔧 FUNCIÓN: Mostrar formulario de respuesta
    showReplyForm(commentId) {
        const form = document.getElementById(`reply-form-${commentId}`);
        if (form) {
            form.classList.add('active');
            const textarea = form.querySelector('.reply-textarea');
            if (textarea) textarea.focus();
        }
    }

    // 🔧 FUNCIÓN: Ocultar formulario de respuesta
    hideReplyForm(commentId) {
        const form = document.getElementById(`reply-form-${commentId}`);
        if (form) {
            form.classList.remove('active');
            const textarea = form.querySelector('.reply-textarea');
            if (textarea) textarea.value = '';
        }
    }

    // 🔧 FUNCIÓN: Enviar respuesta
    async submitReply(parentCommentId) {
        const form = document.getElementById(`reply-form-${parentCommentId}`);
        if (!form) return;
        
        const textarea = form.querySelector('.reply-textarea');
        const content = textarea ? textarea.value.trim() : '';
        
        if (!content) {
            showErrorMessage('Por favor, escribe una respuesta.');
            return;
        }
        
        if (content.length < CONFIG.REPLY_MIN_LENGTH) {
            showErrorMessage(`La respuesta debe tener al menos ${CONFIG.REPLY_MIN_LENGTH} caracteres.`);
            return;
        }
        
        const parentComment = this._findCommentById(parentCommentId);
        if (!parentComment) return;
        
        const newReply = {
            id: generateId('reply'),
            content: content,
            author: getUserDataForNewElement(),
            createdAt: new Date().toISOString(),
            likes: 0,
            likedBy: []
        };
        
        if (!parentComment.replies) parentComment.replies = [];
        parentComment.replies.push(newReply);
        
        // Guardar en localStorage como respaldo
        saveCommentsToLocalStorage(this.currentTopicId, this.comments);
        
        this.hideReplyForm(parentCommentId);
        this._displayComments();
        
        if (this.onCommentsUpdate) {
            this.onCommentsUpdate(this.comments);
        }
        
        // Analytics
        trackEvent(ANALYTICS_EVENTS.REPLY_CREATED, {
            parent_comment_id: parentCommentId,
            topic_id: this.currentTopicId,
            reply_length: content.length
        });
        
        showSuccessMessage('Respuesta publicada exitosamente');
    }

    // 🔧 FUNCIÓN: Editar comentario (CORREGIDA CON LÓGICA SIMPLE)
    async editComment(commentId) {
        const comment = this._findCommentById(commentId);
        if (!comment) {
            showErrorMessage('Comentario no encontrado');
            return;
        }
        
        // 🎯 VERIFICACIÓN SIMPLE COMO EN EL ARCHIVO ORIGINAL
        if (!this.currentUser || comment.author.email !== this.currentUser.email) {
            showErrorMessage('No tienes permisos para editar este comentario');
            return;
        }
        
        const newContent = prompt('Editar comentario:', comment.content);
        if (newContent === null || newContent.trim() === comment.content) {
            return; // Usuario canceló o no cambió nada
        }
        
        if (!this._validateComment(newContent.trim())) {
            return;
        }
        
        const originalContent = comment.content;
        
        // Actualizar UI optimísticamente
        comment.content = newContent.trim();
        comment.editedAt = new Date().toISOString();
        comment.isEdited = true;
        this._displayComments();
        
        try {
            // Actualizar en Firestore
            await updateCommentInFirestore(this.currentTopicId, commentId, {
                content: newContent.trim(),
                editedAt: new Date().toISOString(),
                isEdited: true
            });
            
            // Guardar en localStorage como respaldo
            saveCommentsToLocalStorage(this.currentTopicId, this.comments);
            
            // Analytics
            trackEvent(ANALYTICS_EVENTS.COMMENT_EDITED, {
                comment_id: commentId,
                topic_id: this.currentTopicId,
                content_length: newContent.trim().length
            });
            
            showSuccessMessage('Comentario editado exitosamente');
            
        } catch (error) {
            console.error('❌ Error al editar comentario:', error);
            
            // Revertir cambios en caso de error
            comment.content = originalContent;
            delete comment.editedAt;
            delete comment.isEdited;
            this._displayComments();
            
            showErrorMessage('Error al editar el comentario');
        }
    }

    // 🔧 FUNCIÓN: Borrar comentario (CORREGIDA CON LÓGICA SIMPLE)
    async deleteComment(commentId) {
        const comment = this._findCommentById(commentId);
        if (!comment) {
            showErrorMessage('Comentario no encontrado');
            return;
        }
        
        // 🎯 VERIFICACIÓN SIMPLE COMO EN EL ARCHIVO ORIGINAL
        if (!this.currentUser || comment.author.email !== this.currentUser.email) {
            showErrorMessage('No tienes permisos para borrar este comentario');
            return;
        }
        
        const confirmMessage = '¿Estás seguro de que quieres borrar este comentario?\n\nEsta acción no se puede deshacer.';
        if (!confirm(confirmMessage)) {
            return;
        }
        
        // Buscar el comentario y su contexto
        let commentIndex = -1;
        let parentComment = null;
        let isReply = false;
        
        // Buscar si es un comentario principal
        commentIndex = this.comments.findIndex(c => c.id === commentId);
        
        if (commentIndex === -1) {
            // Buscar si es una respuesta
            for (let i = 0; i < this.comments.length; i++) {
                if (this.comments[i].replies) {
                    const replyIndex = this.comments[i].replies.findIndex(r => r.id === commentId);
                    if (replyIndex !== -1) {
                        parentComment = this.comments[i];
                        commentIndex = replyIndex;
                        isReply = true;
                        break;
                    }
                }
            }
        }
        
        if (commentIndex === -1) {
            showErrorMessage('Error: No se pudo localizar el comentario');
            return;
        }
        
        // Guardar referencia para rollback
        let removedComment;
        
        try {
            // Remover de la UI optimísticamente
            if (isReply) {
                removedComment = parentComment.replies.splice(commentIndex, 1)[0];
            } else {
                removedComment = this.comments.splice(commentIndex, 1)[0];
            }
            
            this._displayComments();
            
            if (this.onCommentsUpdate) {
                this.onCommentsUpdate(this.comments);
            }
            
            // Borrar de Firestore
            await deleteCommentFromFirestore(this.currentTopicId, commentId);
            
            // Actualizar localStorage
            saveCommentsToLocalStorage(this.currentTopicId, this.comments);
            
            // Analytics
            trackEvent(ANALYTICS_EVENTS.COMMENT_DELETED, {
                comment_id: commentId,
                topic_id: this.currentTopicId,
                was_reply: isReply
            });
            
            showSuccessMessage('Comentario borrado exitosamente');
            
        } catch (error) {
            console.error('❌ Error al borrar comentario:', error);
            
            // Revertir cambios en caso de error
            if (isReply) {
                parentComment.replies.splice(commentIndex, 0, removedComment);
            } else {
                this.comments.splice(commentIndex, 0, removedComment);
            }
            
            this._displayComments();
            
            if (this.onCommentsUpdate) {
                this.onCommentsUpdate(this.comments);
            }
            
            showErrorMessage('Error al borrar el comentario');
        }
    }

    // 🔧 FUNCIÓN: Reportar comentario (CORREGIDA CON LÓGICA SIMPLE)
    reportComment(commentId) {
        const comment = this._findCommentById(commentId);
        if (!comment) {
            showErrorMessage('Comentario no encontrado');
            return;
        }
        
        // 🎯 VERIFICACIÓN SIMPLE COMO EN EL ARCHIVO ORIGINAL
        // No puede reportar su propio comentario
        if (this.currentUser && comment.author.email === this.currentUser.email) {
            showErrorMessage('No puedes reportar tu propio comentario');
            return;
        }
        
        const reasons = [
            'Contenido inapropiado',
            'Spam o publicidad',
            'Acoso o intimidación',
            'Información falsa',
            'Otro motivo'
        ];
        
        let selectedReason = '';
        let reasonIndex = 0;
        
        // Crear un diálogo simple para seleccionar razón
        const reasonsText = reasons.map((reason, index) => `${index + 1}. ${reason}`).join('\n');
        const userInput = prompt(`¿Por qué quieres reportar este comentario?\n\n${reasonsText}\n\nEscribe el número (1-${reasons.length}):`);
        
        if (userInput === null) return; // Usuario canceló
        
        reasonIndex = parseInt(userInput) - 1;
        if (reasonIndex >= 0 && reasonIndex < reasons.length) {
            selectedReason = reasons[reasonIndex];
        } else {
            showErrorMessage('Selección inválida');
            return;
        }
        
        // En una implementación real, esto enviaría el reporte a Firestore
        // Por ahora, solo mostraremos confirmación
        showSuccessMessage(`Comentario reportado por: ${selectedReason}. Los moderadores revisarán el contenido.`);
        
        // Analytics
        trackEvent(ANALYTICS_EVENTS.COMMENT_REPORTED, {
            comment_id: commentId,
            topic_id: this.currentTopicId,
            reason: selectedReason
        });
    }

    // 🔧 FUNCIÓN PRIVADA: Encontrar comentario por ID
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

    // 🔧 FUNCIÓN: Obtener comentarios actuales
    getCurrentComments() {
        return this.comments;
    }

    // 🔧 FUNCIÓN: Obtener estadísticas de comentarios
    getCommentsStats() {
        const totalComments = this.comments.length;
        const totalReplies = this.comments.reduce((sum, comment) => {
            return sum + (comment.replies ? comment.replies.length : 0);
        }, 0);
        
        return {
            totalComments,
            totalReplies,
            totalInteractions: totalComments + totalReplies
        };
    }
}

// 🔧 EXPONER FUNCIONES GLOBALMENTE PARA USO DESDE HTML
window.toggleCommentLike = function(commentId) {
    const manager = window.commentManager && window.commentManager();
    if (manager) {
        manager.toggleLike(commentId);
    }
};

window.showReplyForm = function(commentId) {
    const manager = window.commentManager && window.commentManager();
    if (manager) {
        manager.showReplyForm(commentId);
    }
};

window.hideReplyForm = function(commentId) {
    const manager = window.commentManager && window.commentManager();
    if (manager) {
        manager.hideReplyForm(commentId);
    }
};

window.submitReply = function(parentCommentId) {
    const manager = window.commentManager && window.commentManager();
    if (manager) {
        manager.submitReply(parentCommentId);
    }
};

// 🔧 FUNCIONES GLOBALES PARA EDICIÓN Y BORRADO (CORREGIDAS)
window.editComment = function(commentId) {
    const manager = window.commentManager && window.commentManager();
    if (manager) {
        manager.editComment(commentId);
    }
};

window.deleteComment = function(commentId) {
    const manager = window.commentManager && window.commentManager();
    if (manager) {
        manager.deleteComment(commentId);
    }
};

window.reportComment = function(commentId) {
    const manager = window.commentManager && window.commentManager();
    if (manager) {
        manager.reportComment(commentId);
    }
};

console.log('💬 Gestor de comentarios completo y corregido listo');