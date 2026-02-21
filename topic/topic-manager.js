// Comunidad/js/topic/topic-manager.js - GESTIÓN DE TEMAS PRINCIPALES

import { CONFIG, CATEGORIES, SELECTORS, ANALYTICS_EVENTS } from './config.js';
import { trackEvent, canEdit, canDelete, getCurrentUserData } from './auth-manager.js';
import { 
    formatTopicContent, 
    createUserAvatar, 
    getTimeAgo, 
    escapeHtml,
    showSuccessMessage,
    showErrorMessage 
} from './ui-helpers.js';
import { 
    toggleTopicLikeInFirestore,
    toggleTopicBookmarkInFirestore,
    saveTopicToLocalStorage,
    loadTopicFromLocalStorage
} from './firestore-sync.js';

export class TopicManager {
    constructor(user, categories) {
        this.currentUser = user;
        this.categories = categories;
        this.currentTopic = null;
    }

    // 🔧 FUNCIÓN PRINCIPAL: Actualizar UI del tema
    updateUI(topic) {
        if (!topic) return;
        
        this.currentTopic = topic;
        const category = this.categories[topic.category] || { 
            name: 'General', 
            icon: 'fas fa-comments', 
            color: '#666' 
        };
        
        this._updateBreadcrumb(category);
        this._updateAuthorInfo(topic);
        this._updateCategoryDisplay(topic, category);
        this._updateContent(topic);
        this._updateVerse(topic);
        this._updateActionButtons(topic);
        this._addAuthorActions(topic);
        
        console.log('✅ UI del tema actualizada:', topic.title);
    }

    // 🔧 FUNCIÓN: Actualizar breadcrumb
    _updateBreadcrumb(category) {
        const currentCategoryEl = document.getElementById('current-category');
        if (currentCategoryEl) {
            currentCategoryEl.textContent = category.name;
        }
    }

    // 🔧 FUNCIÓN: Actualizar información del autor
    _updateAuthorInfo(topic) {
        // Avatar del autor
        const authorAvatar = document.getElementById('author-avatar');
        if (authorAvatar) {
            authorAvatar.innerHTML = createUserAvatar(topic.author, 50);
        }
        
        // Información del autor
        const authorNameEl = document.getElementById('author-name');
        const authorTimeEl = document.getElementById('author-time');
        const topicViewsEl = document.getElementById('topic-views');
        
        if (authorNameEl) authorNameEl.textContent = topic.author.name;
        if (authorTimeEl) authorTimeEl.textContent = getTimeAgo(new Date(topic.createdAt));
        if (topicViewsEl) topicViewsEl.textContent = `${topic.views || 0} vistas`;
    }

    // 🔧 FUNCIÓN: Actualizar categoría
    _updateCategoryDisplay(topic, category) {
        const categoryElement = document.getElementById('topic-category');
        if (categoryElement) {
            categoryElement.innerHTML = `<i class="${category.icon}"></i> ${category.name}`;
            categoryElement.style.backgroundColor = `${category.color}15`;
            categoryElement.style.color = category.color;
        }
    }

    // 🔧 FUNCIÓN: Actualizar contenido
    _updateContent(topic) {
        const topicTitleEl = document.getElementById('topic-title');
        const topicBodyEl = document.getElementById('topic-body');
        
        if (topicTitleEl) topicTitleEl.textContent = topic.title;
        if (topicBodyEl) topicBodyEl.innerHTML = formatTopicContent(topic.content);
    }

    // 🔧 FUNCIÓN: Actualizar versículo
    _updateVerse(topic) {
        if (topic.verse) {
            const verseElement = document.getElementById('topic-verse');
            const verseTextEl = document.getElementById('verse-text');
            const verseRefEl = document.getElementById('verse-ref');
            
            if (verseTextEl) verseTextEl.textContent = `"${topic.verse}"`;
            if (verseRefEl) verseRefEl.textContent = topic.verseRef || 'Sagradas Escrituras';
            if (verseElement) verseElement.style.display = 'block';
        } else {
            const verseElement = document.getElementById('topic-verse');
            if (verseElement) verseElement.style.display = 'none';
        }
    }

    // 🔧 FUNCIÓN: Actualizar botones de acción
    _updateActionButtons(topic) {
        if (!this.currentUser) return;
        
        // Botón de like
        const likeBtn = document.getElementById('like-btn');
        const likeCountEl = document.getElementById('like-count');
        
        if (likeBtn && likeCountEl) {
            const isLiked = topic.likedBy && topic.likedBy.includes(this.currentUser.uid);
            likeBtn.classList.toggle('liked', isLiked);
            likeCountEl.textContent = topic.likes || 0;
        }
        
        // Botón de bookmark
        const bookmarkBtn = document.getElementById('bookmark-btn');
        if (bookmarkBtn) {
            const isBookmarked = topic.bookmarkedBy && topic.bookmarkedBy.includes(this.currentUser.uid);
            bookmarkBtn.classList.toggle('bookmarked', isBookmarked);
            bookmarkBtn.innerHTML = isBookmarked ? 
                '<i class="fas fa-bookmark"></i> Guardado' : 
                '<i class="far fa-bookmark"></i> Guardar';
        }
    }

    // 🔧 FUNCIÓN: Agregar botones de autor
    _addAuthorActions(topic) {
        if (!canEdit(topic)) return;
        
        const topicActions = document.querySelector('.topic-actions');
        if (!topicActions) return;
        
        // Verificar si ya existen los botones
        if (document.getElementById('edit-topic-btn')) return;
        
        const authorActionsHTML = `
            <button class="action-btn" id="edit-topic-btn" onclick="window.editTopic && window.editTopic()">
                <i class="fas fa-edit"></i>
                Editar
            </button>
            <button class="action-btn" id="delete-topic-btn" onclick="window.deleteTopic && window.deleteTopic()" style="
                border-color: #e74c3c;
                color: #e74c3c;
            ">
                <i class="fas fa-trash"></i>
                Borrar
            </button>
        `;
        
        topicActions.insertAdjacentHTML('beforeend', authorActionsHTML);
        console.log('✅ Botones de autor agregados');
    }

    // 🔧 FUNCIÓN: Actualizar estadísticas
    updateStats(topic, comments) {
        if (!topic) return;
        
        const commentsCountEl = document.getElementById('comments-count');
        const viewsCountEl = document.getElementById('views-count');
        const lastActivityEl = document.getElementById('last-activity');
        const totalCommentsEl = document.getElementById('total-comments');
        
        const commentsLength = comments ? comments.length : 0;
        
        if (commentsCountEl) commentsCountEl.textContent = `${commentsLength} comentarios`;
        if (totalCommentsEl) totalCommentsEl.textContent = commentsLength;
        if (viewsCountEl) viewsCountEl.textContent = `${topic.views || 0} vistas`;
        
        if (lastActivityEl) {
            const lastActivity = topic.lastReply ? 
                getTimeAgo(new Date(topic.lastReply)) : 
                getTimeAgo(new Date(topic.createdAt));
            lastActivityEl.textContent = lastActivity;
        }
    }

    // 🔧 FUNCIÓN: Configurar event listeners
    setupEventListeners(topic) {
        if (!topic || !this.currentUser) return;
        
        this._setupLikeButton(topic);
        this._setupBookmarkButton(topic);
        this._setupScrollButton();
        this._setupReportButton(topic);
    }

    // 🔧 FUNCIÓN PRIVADA: Configurar botón de like
    _setupLikeButton(topic) {
        const likeBtn = document.getElementById('like-btn');
        if (!likeBtn) return;
        
        likeBtn.addEventListener('click', async () => {
            await this.toggleLike(topic);
        });
    }

    // 🔧 FUNCIÓN PRIVADA: Configurar botón de bookmark
    _setupBookmarkButton(topic) {
        const bookmarkBtn = document.getElementById('bookmark-btn');
        if (!bookmarkBtn) return;
        
        bookmarkBtn.addEventListener('click', async () => {
            await this.toggleBookmark(topic);
        });
    }

    // 🔧 FUNCIÓN PRIVADA: Configurar botón de scroll
    _setupScrollButton() {
        const scrollBtn = document.getElementById('scroll-to-comment-btn');
        if (!scrollBtn) return;
        
        scrollBtn.addEventListener('click', () => {
            this.scrollToCommentForm();
        });
    }

    // 🔧 FUNCIÓN PRIVADA: Configurar botón de reporte
    _setupReportButton(topic) {
        const reportBtn = document.getElementById('report-topic-btn');
        if (!reportBtn) return;
        
        reportBtn.addEventListener('click', () => {
            this.reportTopic(topic);
        });
    }

    // 🔧 FUNCIÓN: Toggle like del tema
    async toggleLike(topic) {
        if (!topic || !this.currentUser) return;
        
        if (!topic.likedBy) topic.likedBy = [];
        
        const userIndex = topic.likedBy.indexOf(this.currentUser.uid);
        const isLiking = userIndex === -1;
        
        // Actualizar UI optimísticamente
        const likeBtn = document.getElementById('like-btn');
        const likeCountEl = document.getElementById('like-count');
        
        if (likeBtn) likeBtn.classList.toggle('liked', isLiking);
        if (likeCountEl) {
            const currentLikes = parseInt(likeCountEl.textContent) || 0;
            likeCountEl.textContent = isLiking ? currentLikes + 1 : currentLikes - 1;
        }
        
        try {
            // Actualizar en Firestore
            await toggleTopicLikeInFirestore(topic.id, this.currentUser.uid, isLiking, topic.likedBy);
            
            // Actualizar objeto local
            if (isLiking) {
                topic.likedBy.push(this.currentUser.uid);
                topic.likes = (topic.likes || 0) + 1;
            } else {
                topic.likedBy = topic.likedBy.filter(uid => uid !== this.currentUser.uid);
                topic.likes = Math.max((topic.likes || 0) - 1, 0);
            }
            
            // Guardar en localStorage como respaldo
            saveTopicToLocalStorage(topic);
            
            // Analytics
            trackEvent(ANALYTICS_EVENTS.TOPIC_LIKED, {
                topic_id: topic.id,
                action: isLiking ? 'like' : 'unlike'
            });
            
        } catch (error) {
            console.error('❌ Error al actualizar like:', error);
            
            // Revertir UI en caso de error
            if (likeBtn) likeBtn.classList.toggle('liked', !isLiking);
            if (likeCountEl) {
                const currentLikes = parseInt(likeCountEl.textContent) || 0;
                likeCountEl.textContent = isLiking ? currentLikes - 1 : currentLikes + 1;
            }
            
            showErrorMessage('Error al actualizar el me gusta');
        }
    }

    // 🔧 FUNCIÓN: Toggle bookmark del tema
    async toggleBookmark(topic) {
        if (!topic || !this.currentUser) return;
        
        if (!topic.bookmarkedBy) topic.bookmarkedBy = [];
        
        const userIndex = topic.bookmarkedBy.indexOf(this.currentUser.uid);
        const isBookmarking = userIndex === -1;
        
        // Actualizar UI optimísticamente
        const bookmarkBtn = document.getElementById('bookmark-btn');
        if (bookmarkBtn) {
            bookmarkBtn.classList.toggle('bookmarked', isBookmarking);
            bookmarkBtn.innerHTML = isBookmarking ? 
                '<i class="fas fa-bookmark"></i> Guardado' : 
                '<i class="far fa-bookmark"></i> Guardar';
        }
        
        try {
            // Actualizar en Firestore
            await toggleTopicBookmarkInFirestore(topic.id, this.currentUser.uid, isBookmarking, topic.bookmarkedBy);
            
            // Actualizar objeto local
            if (isBookmarking) {
                topic.bookmarkedBy.push(this.currentUser.uid);
            } else {
                topic.bookmarkedBy = topic.bookmarkedBy.filter(uid => uid !== this.currentUser.uid);
            }
            
            // Guardar en localStorage como respaldo
            saveTopicToLocalStorage(topic);
            
            showSuccessMessage(isBookmarking ? 'Tema agregado a favoritos' : 'Tema removido de favoritos');
            
            // Analytics
            trackEvent(ANALYTICS_EVENTS.TOPIC_BOOKMARKED, {
                topic_id: topic.id,
                action: isBookmarking ? 'bookmark' : 'unbookmark'
            });
            
        } catch (error) {
            console.error('❌ Error al actualizar bookmark:', error);
            
            // Revertir UI en caso de error
            if (bookmarkBtn) {
                bookmarkBtn.classList.toggle('bookmarked', !isBookmarking);
                bookmarkBtn.innerHTML = !isBookmarking ? 
                    '<i class="fas fa-bookmark"></i> Guardado' : 
                    '<i class="far fa-bookmark"></i> Guardar';
            }
            
            showErrorMessage('Error al actualizar favorito');
        }
    }

    // 🔧 FUNCIÓN: Scroll al formulario de comentarios
    scrollToCommentForm() {
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

    // 🔧 FUNCIÓN: Reportar tema
    reportTopic(topic) {
        if (!topic) return;
        
        const confirmMessage = `¿Estás seguro de que quieres reportar este tema?\n\nEsto notificará a los moderadores sobre contenido potencialmente inapropiado.`;
        
        if (confirm(confirmMessage)) {
            // En una implementación real, esto enviaría un reporte al sistema de moderación
            showSuccessMessage('Tema reportado. Los moderadores revisarán el contenido.');
            
            // Analytics
            trackEvent(ANALYTICS_EVENTS.TOPIC_REPORTED, {
                topic_id: topic.id,
                reason: 'user_report'
            });
        }
    }

    // 🔧 FUNCIÓN: Obtener datos del tema actual
    getCurrentTopic() {
        return this.currentTopic;
    }

    // 🔧 FUNCIÓN: Validar datos del tema
    validateTopicData(topicData) {
        const errors = [];
        
        if (!topicData.title || topicData.title.trim().length < 5) {
            errors.push('El título debe tener al menos 5 caracteres');
        }
        
        if (topicData.title && topicData.title.length > CONFIG.TOPIC_TITLE_MAX_LENGTH) {
            errors.push(`El título no puede exceder ${CONFIG.TOPIC_TITLE_MAX_LENGTH} caracteres`);
        }
        
        if (!topicData.content || topicData.content.trim().length < 20) {
            errors.push('El contenido debe tener al menos 20 caracteres');
        }
        
        if (topicData.content && topicData.content.length > CONFIG.TOPIC_CONTENT_MAX_LENGTH) {
            errors.push(`El contenido no puede exceder ${CONFIG.TOPIC_CONTENT_MAX_LENGTH} caracteres`);
        }
        
        if (!topicData.category || !this.categories[topicData.category]) {
            errors.push('Debe seleccionar una categoría válida');
        }
        
        if (topicData.verse && topicData.verse.length > CONFIG.VERSE_MAX_LENGTH) {
            errors.push(`El versículo no puede exceder ${CONFIG.VERSE_MAX_LENGTH} caracteres`);
        }
        
        if (topicData.verseRef && topicData.verseRef.length > CONFIG.VERSE_REF_MAX_LENGTH) {
            errors.push(`La referencia del versículo no puede exceder ${CONFIG.VERSE_REF_MAX_LENGTH} caracteres`);
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // 🔧 FUNCIÓN: Obtener resumen del tema para compartir
    getShareSummary(topic) {
        if (!topic) return null;
        
        return {
            title: `${topic.title} - Comunidad Ministerio`,
            text: `${topic.content.substring(0, 150)}...`,
            url: window.location.href
        };
    }
}

console.log('📋 Gestor de temas principales listo');