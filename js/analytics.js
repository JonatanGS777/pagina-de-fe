// js/analytics.js - VERIFICADO CON EXPORTACIONES CORRECTAS
import { analytics } from './firebase-config.js';
import { logEvent } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js';

// Tracking de páginas visitadas
function trackPageView(pageTitle) {
    try {
        logEvent(analytics, 'page_view', {
            page_title: pageTitle,
            page_location: window.location.href,
            page_referrer: document.referrer
        });
        
        console.log('📊 Page view tracked:', pageTitle);
    } catch (error) {
        console.error('❌ Error tracking page view:', error);
    }
}

// Tracking de clics en secciones
function trackSectionClick(sectionName) {
    try {
        logEvent(analytics, 'select_content', {
            content_type: 'bible_study',
            content_id: sectionName,
            custom_parameters: {
                section_category: getSectionCategory(sectionName)
            }
        });
        
        console.log('🎯 Section click tracked:', sectionName);
    } catch (error) {
        console.error('❌ Error tracking section click:', error);
    }
}

// Tracking de tiempo en página
let startTime = Date.now();
let maxScroll = 0;

// Inicializar tracking automático
function initializePageTracking() {
    // Tracking de scroll
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
        }
    });
    
    // Tracking al salir de la página
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        
        if (timeSpent > 5) { // Solo si estuvo más de 5 segundos
            try {
                logEvent(analytics, 'user_engagement', {
                    engagement_time_msec: timeSpent * 1000,
                    page_title: document.title,
                    max_scroll_percentage: maxScroll
                });
                
                console.log('⏱️ User engagement tracked:', {
                    timeSpent: timeSpent + 's',
                    maxScroll: maxScroll + '%'
                });
            } catch (error) {
                console.error('❌ Error tracking engagement:', error);
            }
        }
    });
    
    console.log('📈 Page tracking initialized');
}

// Tracking de eventos personalizados para el ministerio
function trackMinistryEvent(eventName, parameters = {}) {
    try {
        logEvent(analytics, eventName, {
            ...parameters,
            ministry: 'La Gloria es del Señor',
            timestamp: new Date().toISOString()
        });
        
        console.log('⛪ Ministry event tracked:', eventName, parameters);
    } catch (error) {
        console.error('❌ Error tracking ministry event:', error);
    }
}

// Tracking específico para estudios bíblicos
function trackBibleStudyAccess(studyType, studyName) {
    trackMinistryEvent('bible_study_access', {
        study_type: studyType,
        study_name: studyName,
        content_category: 'bible_study'
    });
}

// Tracking de favoritos (si implementas esa funcionalidad)
function trackFavoriteAction(action, contentType, contentName) {
    trackMinistryEvent('favorite_action', {
        action: action, // 'add' or 'remove'
        content_type: contentType,
        content_name: contentName
    });
}

// Tracking de búsquedas (si implementas búsqueda)
function trackSearch(searchTerm, resultsCount = 0) {
    try {
        logEvent(analytics, 'search', {
            search_term: searchTerm,
            results_count: resultsCount
        });
        
        console.log('🔍 Search tracked:', searchTerm);
    } catch (error) {
        console.error('❌ Error tracking search:', error);
    }
}

// Tracking de descargas (si ofreces PDFs, etc.)
function trackDownload(fileName, fileType) {
    trackMinistryEvent('file_download', {
        file_name: fileName,
        file_type: fileType,
        download_source: 'ministry_website'
    });
}

// Tracking de compartir contenido
function trackShare(contentType, contentName, sharePlatform) {
    try {
        logEvent(analytics, 'share', {
            content_type: contentType,
            content_id: contentName,
            method: sharePlatform
        });
        
        console.log('📤 Share tracked:', contentName, 'via', sharePlatform);
    } catch (error) {
        console.error('❌ Error tracking share:', error);
    }
}

// Función auxiliar para categorizar secciones
function getSectionCategory(sectionName) {
    const categories = {
        'Figuras Bíblicas': 'biblical_figures',
        'Falsas Doctrinas': 'false_doctrines',
        'Estudios Exegéticos': 'exegetical_studies',
        'Tiempo del Fin': 'end_times',
        'Época de Jesús': 'jesus_era',
        'Estudios Bíblicos': 'bible_studies'
    };
    
    for (const [key, value] of Object.entries(categories)) {
        if (sectionName.includes(key)) {
            return value;
        }
    }
    
    return 'other';
}

// Tracking de formularios (si agregas contacto, etc.)
function trackFormSubmission(formType, success = true) {
    trackMinistryEvent('form_submission', {
        form_type: formType,
        success: success
    });
}

// Tracking de errores
function trackError(errorType, errorMessage, location) {
    try {
        logEvent(analytics, 'exception', {
            description: errorMessage,
            fatal: false,
            error_type: errorType,
            error_location: location
        });
        
        console.log('🚨 Error tracked:', errorType, errorMessage);
    } catch (error) {
        console.error('❌ Error tracking error (!?):', error);
    }
}

// EXPORTACIONES - TODAS LAS FUNCIONES QUE SE USAN EN MAIN.JS
export {
    trackPageView,
    trackSectionClick,
    initializePageTracking,
    trackMinistryEvent,
    trackBibleStudyAccess,
    trackFavoriteAction,
    trackSearch,
    trackDownload,
    trackShare,
    trackFormSubmission,
    trackError
};