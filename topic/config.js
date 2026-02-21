// Comunidad/js/topic/config.js - CONFIGURACIÓN Y CONSTANTES

// 🔧 CONFIGURACIÓN GLOBAL
export const CONFIG = {
    // Límites de contenido
    COMMENT_MIN_LENGTH: 10,
    COMMENT_MAX_LENGTH: 1000,
    TOPIC_TITLE_MAX_LENGTH: 200,
    TOPIC_CONTENT_MAX_LENGTH: 5000,
    VERSE_MAX_LENGTH: 500,
    VERSE_REF_MAX_LENGTH: 50,
    REPLY_MIN_LENGTH: 5,
    REPLY_MAX_LENGTH: 500,
    
    // Timeouts y delays
    AUTH_TIMEOUT: 5000,
    FONT_AWESOME_TIMEOUT: 5000,
    MESSAGE_DISPLAY_TIME: 4000,
    REDIRECT_DELAY: 1500,
    ANIMATION_DELAY: 100,
    
    // URLs de recursos
    FONT_AWESOME_URL: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    FONT_AWESOME_INTEGRITY: 'sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==',
    
    // Colecciones de Firestore
    COLLECTIONS: {
        TOPICS: 'forumTopics',
        COMMENTS: 'comments'
    },
    
    // Claves de localStorage
    STORAGE_KEYS: {
        CURRENT_USER: 'currentUser',
        FORUM_TOPICS: 'forumTopics',
        LAST_VIEWED_TOPIC: 'lastViewedTopic',
        COMMENTS_PREFIX: 'comments_'
    }
};

// 📂 CATEGORÍAS DEL FORO
export const CATEGORIES = {
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

// 🎨 ÍCONOS SVG FALLBACK (para cuando Font Awesome no carga)
export const SVG_ICONS = {
    share: 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M384 336c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm-192-80c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm0-160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm96 218.5c0 4.6 4.1 8.1 8.5 7.6 29.8-3.6 56.1-17.8 74.5-39.2l108.2 47.4c3.4 1.5 7.4-.5 8.2-4.1 8.3-38.7-8.3-79.9-41.3-103.2L328.3 153.4c4.2-8.7 6.7-18.4 6.7-28.6 0-35.3-28.7-64-64-64s-64 28.7-64 64c0 10.2 2.5 19.9 6.7 28.6L105.1 222c-33 23.3-49.6 64.5-41.3 103.2.8 3.6 4.8 5.6 8.2 4.1l108.2-47.4c18.4 21.4 44.7 35.6 74.5 39.2 4.4.5 8.5-3 8.5-7.6z"/></svg>',
    whatsapp: 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56 81.2 56 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>',
    telegram: 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"/></svg>',
    envelope: 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"/></svg>',
    link: 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"/></svg>',
    spinner: 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z"/></svg>',
    chevronRight: 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>'
};

// 📊 ANALYTICS EVENTS
export const ANALYTICS_EVENTS = {
    TOPIC_PAGE_VISIT: 'topic_page_visit',
    TOPIC_LIKED: 'topic_liked',
    TOPIC_BOOKMARKED: 'topic_bookmarked',
    TOPIC_SHARED: 'topic_shared',
    TOPIC_EDITED: 'topic_edited',
    TOPIC_DELETED: 'topic_deleted',
    TOPIC_REPORTED: 'topic_reported',
    COMMENT_CREATED: 'comment_created',
    COMMENT_LIKED: 'comment_liked',
    COMMENT_EDITED: 'comment_edited',
    COMMENT_DELETED: 'comment_deleted',
    COMMENT_REPORTED: 'comment_reported',
    REPLY_CREATED: 'reply_created'
};

// 🔍 SELECTORES DOM
export const SELECTORS = {
    // Contenedores principales
    TOPIC_CONTAINER: '.topic-container',
    COMMENTS_LIST: '#comments-list',
    EMPTY_COMMENTS: '#empty-comments',
    
    // Formularios
    COMMENT_FORM: '#comment-form',
    COMMENT_TEXT: '#comment-text',
    SUBMIT_COMMENT: '#submit-comment',
    
    // Elementos del tema
    TOPIC_TITLE: '#topic-title',
    TOPIC_BODY: '#topic-body',
    TOPIC_CATEGORY: '#topic-category',
    TOPIC_VERSE: '#topic-verse',
    VERSE_TEXT: '#verse-text',
    VERSE_REF: '#verse-ref',
    
    // Información del autor
    AUTHOR_AVATAR: '#author-avatar',
    AUTHOR_NAME: '#author-name',
    AUTHOR_TIME: '#author-time',
    TOPIC_VIEWS: '#topic-views',
    
    // Navegación
    CURRENT_CATEGORY: '#current-category',
    
    // Botones de acción
    LIKE_BTN: '#like-btn',
    LIKE_COUNT: '#like-count',
    BOOKMARK_BTN: '#bookmark-btn',
    SHARE_TOPIC_BTN: '#share-topic-btn',
    REPORT_TOPIC_BTN: '#report-topic-btn',
    SCROLL_TO_COMMENT_BTN: '#scroll-to-comment-btn',
    
    // Estadísticas
    COMMENTS_COUNT: '#comments-count',
    VIEWS_COUNT: '#views-count',
    LAST_ACTIVITY: '#last-activity',
    TOTAL_COMMENTS: '#total-comments',
    
    // Ordenamiento
    SORT_COMMENTS: '#sort-comments',
    
    // Contador de caracteres
    CHAR_COUNT: '#char-count'
};

// 🎨 ESTILOS CSS COMPARTIDOS
export const SHARED_STYLES = {
    MODAL_BACKDROP: `
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
    `,
    
    MODAL_CONTENT: `
        background: white;
        border-radius: 16px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
        position: relative;
    `,
    
    CLOSE_BUTTON: `
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
    `,
    
    SUCCESS_MESSAGE: `
        background: linear-gradient(135deg, #10b981, #059669);
    `,
    
    ERROR_MESSAGE: `
        background: linear-gradient(135deg, #ef4444, #dc2626);
    `
};

console.log('⚙️ Configuración del sistema de temas cargada');