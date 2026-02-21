// js/main.js - VERSIÓN FINAL Y ROBUSTA

import { initializeAuth, handleRedirectResult, initializeAuthEvents } from './auth.js'; 
import { trackPageView, initializePageTracking } from './analytics.js';

// Función principal que organiza la página según el estado de autenticación.
function setupApplication(user) {
  const authOverlay = document.getElementById('auth-required');
  const mainContent = document.getElementById('main-content');

  if (user) {
    console.log(`✅ Sesión activa para ${user.email}. Mostrando contenido.`);
    if (mainContent) mainContent.style.display = 'block';
    if (authOverlay) {
      authOverlay.style.display = 'none';
    } else {
      console.log('⚠️ authOverlay no existe en esta página.');
    }

    if (typeof window.updateUserWidget === 'function') {
      window.updateUserWidget(user);
    }

  } else {
    console.log('⛔ No hay sesión activa. Mostrando pantalla de login.');
    if (mainContent) mainContent.style.display = 'none';
    if (authOverlay) {
      authOverlay.style.display = 'flex';
    } else {
      console.log('⚠️ authOverlay no existe en esta página.');
    }
  }
}


// El punto de entrada de toda la aplicación.
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 DOM cargado. Iniciando aplicación...');

  // 1. Primero, revisamos si venimos de una redirección de login.
  await handleRedirectResult();
  
  // 2. Luego, le pedimos a Firebase que nos avise cuando sepa el estado del usuario.
  initializeAuth(setupApplication);

  // 3. Inicializamos los botones de login y logout.
  initializeAuthEvents();

  // 4. Inicializamos otros módulos que no dependen directamente del usuario.
  if (typeof window.IndexPageModule !== 'undefined' && window.IndexPageModule.init) {
      window.IndexPageModule.init();
  }
  trackPageView(document.title);
  initializePageTracking();
});