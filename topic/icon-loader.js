// Comunidad/js/topic/icon-loader.js - CARGA DE FONT AWESOME Y FALLBACKS

import { CONFIG, SVG_ICONS } from './config.js';

// 📦 FUNCIÓN PRINCIPAL: Cargar Font Awesome
export function loadFontAwesome() {
    return new Promise((resolve, reject) => {
        // Verificar si Font Awesome ya está cargado
        const existingLink = document.querySelector('link[href*="font-awesome"]');
        if (existingLink) {
            console.log('✅ Font Awesome ya está cargado');
            resolve(true);
            return;
        }
        
        console.log('📦 Cargando Font Awesome dinámicamente...');
        
        // Crear elemento link para Font Awesome
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = CONFIG.FONT_AWESOME_URL;
        link.integrity = CONFIG.FONT_AWESOME_INTEGRITY;
        link.crossOrigin = 'anonymous';
        link.referrerPolicy = 'no-referrer';
        
        // Event listeners para carga
        link.onload = () => {
            console.log('✅ Font Awesome cargado exitosamente');
            resolve(true);
        };
        
        link.onerror = () => {
            console.warn('❌ Error al cargar Font Awesome, usando fallback');
            // Cargar íconos SVG como fallback
            loadSVGIconsFallback();
            resolve(false);
        };
        
        // Agregar al head
        document.head.appendChild(link);
        
        // Timeout de seguridad
        setTimeout(() => {
            if (!link.sheet) {
                console.warn('⏰ Timeout cargando Font Awesome, usando fallback');
                loadSVGIconsFallback();
                resolve(false);
            }
        }, CONFIG.FONT_AWESOME_TIMEOUT);
    });
}

// 🎨 FUNCIÓN DE FALLBACK: Cargar íconos SVG si Font Awesome falla
export function loadSVGIconsFallback() {
    console.log('🎨 Cargando íconos SVG como fallback...');
    
    // Verificar si ya existe el estilo de fallback
    if (document.getElementById('svg-icons-fallback')) {
        console.log('✅ Íconos SVG fallback ya están cargados');
        return;
    }
    
    // CSS para íconos SVG
    const style = document.createElement('style');
    style.id = 'svg-icons-fallback';
    style.textContent = createSVGFallbackCSS();
    document.head.appendChild(style);
    
    console.log('✅ Íconos SVG cargados como fallback');
}

// 🎨 FUNCIÓN: Crear CSS para íconos SVG fallback
function createSVGFallbackCSS() {
    return `
        /* SVG Icons Fallback */
        .svg-icon {
            width: 1em;
            height: 1em;
            vertical-align: -0.125em;
            fill: currentColor;
            display: inline-block;
        }
        
        /* Reemplazar clases de Font Awesome con SVG cuando no está disponible */
        .fas.fa-share-alt::before,
        .fa-share-alt::before {
            content: '';
            width: 1em;
            height: 1em;
            display: inline-block;
            background-image: url('${SVG_ICONS.share}');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        
        .fab.fa-whatsapp::before,
        .fa-whatsapp::before {
            content: '';
            width: 1em;
            height: 1em;
            display: inline-block;
            background-image: url('${SVG_ICONS.whatsapp}');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        
        .fab.fa-telegram-plane::before,
        .fa-telegram-plane::before {
            content: '';
            width: 1em;
            height: 1em;
            display: inline-block;
            background-image: url('${SVG_ICONS.telegram}');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        
        .fas.fa-envelope::before,
        .fa-envelope::before {
            content: '';
            width: 1em;
            height: 1em;
            display: inline-block;
            background-image: url('${SVG_ICONS.envelope}');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        
        .fas.fa-link::before,
        .fa-link::before {
            content: '';
            width: 1em;
            height: 1em;
            display: inline-block;
            background-image: url('${SVG_ICONS.link}');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        
        .fas.fa-spinner::before,
        .fa-spinner::before {
            content: '';
            width: 1em;
            height: 1em;
            display: inline-block;
            background-image: url('${SVG_ICONS.spinner}');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        
        .fas.fa-chevron-right::before,
        .fa-chevron-right::before {
            content: '';
            width: 1em;
            height: 1em;
            display: inline-block;
            background-image: url('${SVG_ICONS.chevronRight}');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        
        /* Íconos adicionales que podrían necesitarse */
        .fas.fa-heart::before,
        .fa-heart::before {
            content: '♥';
            color: currentColor;
        }
        
        .fas.fa-bookmark::before,
        .fa-bookmark::before {
            content: '🔖';
        }
        
        .fas.fa-edit::before,
        .fa-edit::before {
            content: '✏️';
        }
        
        .fas.fa-trash::before,
        .fa-trash::before {
            content: '🗑️';
        }
        
        .fas.fa-flag::before,
        .fa-flag::before {
            content: '🚩';
        }
        
        .fas.fa-reply::before,
        .fa-reply::before {
            content: '↩️';
        }
        
        .fas.fa-save::before,
        .fa-save::before {
            content: '💾';
        }
        
        .fas.fa-times::before,
        .fa-times::before {
            content: '✕';
        }
        
        .fas.fa-check-circle::before,
        .fa-check-circle::before {
            content: '✅';
        }
        
        .fas.fa-exclamation-triangle::before,
        .fa-exclamation-triangle::before {
            content: '⚠️';
        }
        
        .fas.fa-lock::before,
        .fa-lock::before {
            content: '🔒';
        }
        
        .fas.fa-search::before,
        .fa-search::before {
            content: '🔍';
        }
        
        .fas.fa-arrow-left::before,
        .fa-arrow-left::before {
            content: '←';
        }
        
        .fas.fa-sign-in-alt::before,
        .fa-sign-in-alt::before {
            content: '🔑';
        }
        
        .fas.fa-refresh::before,
        .fa-refresh::before {
            content: '🔄';
        }
        
        .fas.fa-comments::before,
        .fa-comments::before {
            content: '💬';
        }
        
        .fas.fa-bible::before,
        .fa-bible::before {
            content: '📖';
        }
        
        .fas.fa-question-circle::before,
        .fa-question-circle::before {
            content: '❓';
        }
        
        .fas.fa-praying-hands::before,
        .fa-praying-hands::before {
            content: '🙏';
        }
        
        /* Animación para spinner */
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .fa-spin {
            animation: spin 1s linear infinite;
        }
        
        /* Mejoras para accesibilidad */
        .fas::before,
        .fab::before,
        .fa::before {
            speak: none;
            font-style: normal;
            font-weight: normal;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .svg-icon,
            .fas::before,
            .fab::before,
            .fa::before {
                font-size: 0.9em;
            }
        }
    `;
}

// 🔧 FUNCIÓN: Verificar si Font Awesome está disponible
export function isFontAwesomeLoaded() {
    // Verificar si existe el link de Font Awesome
    const link = document.querySelector('link[href*="font-awesome"]');
    if (!link) return false;
    
    // Verificar si la hoja de estilos está cargada
    try {
        return link.sheet && link.sheet.cssRules.length > 0;
    } catch (e) {
        // Error de CORS o similar, asumir que está cargado si el link existe
        return true;
    }
}

// 🔧 FUNCIÓN: Forzar recarga de íconos
export async function reloadIcons() {
    console.log('🔄 Recargando sistema de íconos...');
    
    // Remover Font Awesome existente
    const existingLink = document.querySelector('link[href*="font-awesome"]');
    if (existingLink) {
        existingLink.remove();
    }
    
    // Remover fallback SVG existente
    const existingFallback = document.getElementById('svg-icons-fallback');
    if (existingFallback) {
        existingFallback.remove();
    }
    
    // Recargar Font Awesome
    return await loadFontAwesome();
}

// 🔧 FUNCIÓN: Obtener información del sistema de íconos
export function getIconSystemInfo() {
    return {
        fontAwesomeLoaded: isFontAwesomeLoaded(),
        svgFallbackLoaded: !!document.getElementById('svg-icons-fallback'),
        fontAwesomeLink: !!document.querySelector('link[href*="font-awesome"]'),
        timestamp: new Date().toISOString()
    };
}

// 🔧 FUNCIÓN: Crear ícono SVG personalizado
export function createSVGIcon(iconKey, className = '') {
    if (!SVG_ICONS[iconKey]) {
        console.warn(`⚠️ Ícono SVG '${iconKey}' no encontrado`);
        return null;
    }
    
    const svg = document.createElement('div');
    svg.className = `svg-icon ${className}`;
    svg.style.cssText = `
        width: 1em;
        height: 1em;
        display: inline-block;
        background-image: url('${SVG_ICONS[iconKey]}');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    `;
    
    return svg;
}

// 🔧 FUNCIÓN: Diagnosticar sistema de íconos
export function diagnoseIconSystem() {
    const info = getIconSystemInfo();
    
    console.log('🔍 Diagnóstico del sistema de íconos:');
    console.log('Font Awesome cargado:', info.fontAwesomeLoaded);
    console.log('SVG Fallback activo:', info.svgFallbackLoaded);
    console.log('Link de Font Awesome presente:', info.fontAwesomeLink);
    
    if (!info.fontAwesomeLoaded && !info.svgFallbackLoaded) {
        console.warn('⚠️ No hay sistema de íconos activo');
        return false;
    }
    
    return true;
}

console.log('🎨 Cargador de íconos listo');