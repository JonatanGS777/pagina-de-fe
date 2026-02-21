// js/debug-helper.js - HERRAMIENTA DE DIAGNÓSTICO
// Este archivo te ayudará a identificar problemas específicos

// Función para verificar el estado completo del sistema
export function diagnosticarSistema() {
  console.log('🔍 INICIANDO DIAGNÓSTICO COMPLETO...');
  console.log('=====================================');
  
  const diagnostico = {
    timestamp: new Date().toISOString(),
    navegador: navigator.userAgent,
    url: window.location.href,
    protocolo: window.location.protocol,
    problemas: [],
    warnings: [],
    info: []
  };
  
  // 1. Verificar protocolo
  if (window.location.protocol === 'file:') {
    diagnostico.problemas.push('❌ PROBLEMA CRÍTICO: Estás accediendo via file:// - Los módulos ES6 no funcionan. Necesitas un servidor web.');
  } else {
    diagnostico.info.push('✅ Protocolo correcto: ' + window.location.protocol);
  }
  
  // 2. Verificar Firebase
  try {
    import('./firebase-config.js').then(firebase => {
      if (firebase.auth) {
        diagnostico.info.push('✅ Firebase Auth importado correctamente');
      } else {
        diagnostico.problemas.push('❌ Firebase Auth no disponible');
      }
      
      if (firebase.analytics) {
        diagnostico.info.push('✅ Firebase Analytics importado correctamente');
      } else {
        diagnostico.warnings.push('⚠️ Firebase Analytics no disponible');
      }
      
      if (firebase.googleProvider) {
        diagnostico.info.push('✅ Google Provider configurado correctamente');
      } else {
        diagnostico.problemas.push('❌ Google Provider no configurado');
      }
    }).catch(error => {
      diagnostico.problemas.push('❌ Error al importar firebase-config.js: ' + error.message);
    });
  } catch (error) {
    diagnostico.problemas.push('❌ Error crítico con imports: ' + error.message);
  }
  
  // 3. Verificar elementos DOM necesarios
  const elementosRequeridos = {
    'register-btn': 'Botón de registro en overlay',
    'google-login': 'Botón de Google en página de login',
    'auth-required': 'Overlay de autenticación requerida',
    'main-content': 'Contenido principal',
    'loading': 'Indicador de carga'
  };
  
  Object.keys(elementosRequeridos).forEach(id => {
    const elemento = document.getElementById(id);
    if (elemento) {
      diagnostico.info.push(`✅ Elemento encontrado: ${id} (${elementosRequeridos[id]})`);
    } else {
      diagnostico.warnings.push(`⚠️ Elemento no encontrado: ${id} (${elementosRequeridos[id]})`);
    }
  });
  
  // 4. Verificar localStorage
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    diagnostico.info.push('✅ localStorage disponible');
  } catch (error) {
    diagnostico.problemas.push('❌ localStorage no disponible: ' + error.message);
  }
  
  // 5. Verificar conectividad
  if (navigator.onLine) {
    diagnostico.info.push('✅ Conexión a internet disponible');
  } else {
    diagnostico.problemas.push('❌ Sin conexión a internet');
  }
  
  // 6. Verificar dominio autorizado
  const dominiosValidos = [
    'localhost',
    '127.0.0.1',
    'minist-la-gloria-es-del-senor.web.app',
    'minist-la-gloria-es-del-senor.firebaseapp.com'
  ];
  
  const dominioActual = window.location.hostname;
  if (dominiosValidos.some(dominio => dominioActual.includes(dominio))) {
    diagnostico.info.push(`✅ Dominio autorizado: ${dominioActual}`);
  } else {
    diagnostico.warnings.push(`⚠️ Dominio no autorizado: ${dominioActual} - Agrégalo en Firebase Console`);
  }
  
  // 7. Verificar popup blocker
  try {
    const popup = window.open('', '_blank', 'width=1,height=1');
    if (popup) {
      popup.close();
      diagnostico.info.push('✅ Popups permitidos');
    } else {
      diagnostico.warnings.push('⚠️ Popups bloqueados - Esto puede causar problemas de login');
    }
  } catch (error) {
    diagnostico.warnings.push('⚠️ No se puede verificar estado de popups: ' + error.message);
  }
  
  // 8. Verificar configuración específica de Firebase
  const configuracionFirebase = {
    apiKey: 'AIzaSyBoqydsh1TD4PmQQMFWJGfI5fANNCKwgek',
    authDomain: 'minist-la-gloria-es-del-senor.firebaseapp.com',
    projectId: 'minist-la-gloria-es-del-senor'
  };
  
  diagnostico.info.push('📋 Configuración Firebase verificada:');
  diagnostico.info.push(`   - Project ID: ${configuracionFirebase.projectId}`);
  diagnostico.info.push(`   - Auth Domain: ${configuracionFirebase.authDomain}`);
  diagnostico.info.push(`   - API Key: ${configuracionFirebase.apiKey.substring(0, 10)}...`);
  
  // Mostrar resultados
  console.log('📊 RESULTADOS DEL DIAGNÓSTICO:');
  console.log('===============================');
  
  if (diagnostico.problemas.length > 0) {
    console.log('🚨 PROBLEMAS CRÍTICOS:');
    diagnostico.problemas.forEach(p => console.log(p));
    console.log('');
  }
  
  if (diagnostico.warnings.length > 0) {
    console.log('⚠️ ADVERTENCIAS:');
    diagnostico.warnings.forEach(w => console.log(w));
    console.log('');
  }
  
  if (diagnostico.info.length > 0) {
    console.log('ℹ️ INFORMACIÓN:');
    diagnostico.info.forEach(i => console.log(i));
    console.log('');
  }
  
  // Resumen
  const total = diagnostico.problemas.length + diagnostico.warnings.length;
  if (total === 0) {
    console.log('🎉 ¡TODO PARECE ESTAR BIEN! Si sigues teniendo problemas, revisa la consola de red.');
  } else {
    console.log(`📝 RESUMEN: ${diagnostico.problemas.length} problemas críticos, ${diagnostico.warnings.length} advertencias`);
    
    if (diagnostico.problemas.length > 0) {
      console.log('🔧 ACCIONES RECOMENDADAS:');
      console.log('1. Resuelve primero los problemas críticos (❌)');
      console.log('2. Luego aborda las advertencias (⚠️)');
      console.log('3. Verifica que Firebase Console tenga la configuración correcta');
      console.log('4. Asegúrate de servir desde un servidor web (no file://)');
    }
  }
  
  console.log('=====================================');
  
  return diagnostico;
}

// Función para probar login manualmente
export async function probarLogin() {
  console.log('🧪 PROBANDO LOGIN MANUALMENTE...');
  
  try {
    const { loginWithGoogle } = await import('./auth.js');
    console.log('✅ Módulo auth.js importado correctamente');
    
    console.log('🔄 Ejecutando loginWithGoogle...');
    await loginWithGoogle();
    
  } catch (error) {
    console.error('❌ Error en prueba de login:', error);
    console.log('🔍 Detalles del error:');
    console.log('   - Código:', error.code);
    console.log('   - Mensaje:', error.message);
    console.log('   - Stack:', error.stack);
  }
}

// Función para limpiar todo y empezar de nuevo
export function limpiarTodo() {
  console.log('🧹 LIMPIANDO TODO...');
  
  // Limpiar localStorage
  localStorage.clear();
  console.log('✅ localStorage limpiado');
  
  // Limpiar cualquier estado de autenticación
  try {
    import('./firebase-config.js').then(firebase => {
      if (firebase.auth && firebase.auth.currentUser) {
        return firebase.auth.signOut();
      }
    }).then(() => {
      console.log('✅ Sesión cerrada');
      window.location.reload();
    });
  } catch (error) {
    console.log('⚠️ No se pudo cerrar sesión automáticamente');
    window.location.reload();
  }
}

// Función para verificar red y Firebase
export async function verificarConectividad() {
  console.log('🌐 VERIFICANDO CONECTIVIDAD...');
  
  // Test básico de conectividad
  try {
    const response = await fetch('https://www.google.com/favicon.ico', { 
      mode: 'no-cors',
      cache: 'no-cache'
    });
    console.log('✅ Conectividad general: OK');
  } catch (error) {
    console.log('❌ Sin conectividad general');
    return false;
  }
  
  // Test de Firebase
  try {
    const response = await fetch('https://minist-la-gloria-es-del-senor.firebaseapp.com', {
      mode: 'no-cors',
      cache: 'no-cache'
    });
    console.log('✅ Conectividad a Firebase: OK');
  } catch (error) {
    console.log('❌ Sin conectividad a Firebase:', error.message);
    return false;
  }
  
  // Test de Google APIs
  try {
    const response = await fetch('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js', {
      cache: 'no-cache'
    });
    if (response.ok) {
      console.log('✅ Conectividad a Google APIs: OK');
    } else {
      console.log('⚠️ Respuesta inesperada de Google APIs:', response.status);
    }
  } catch (error) {
    console.log('❌ Sin conectividad a Google APIs:', error.message);
    return false;
  }
  
  return true;
}

// Exportar todas las funciones para uso en consola
if (typeof window !== 'undefined') {
  window.debugMinisterio = {
    diagnosticar: diagnosticarSistema,
    probarLogin: probarLogin,
    limpiarTodo: limpiarTodo,
    verificarConectividad: verificarConectividad
  };
  
  console.log('🛠️ Herramientas de debug disponibles en window.debugMinisterio');
  console.log('   - debugMinisterio.diagnosticar()');
  console.log('   - debugMinisterio.probarLogin()');
  console.log('   - debugMinisterio.limpiarTodo()');
  console.log('   - debugMinisterio.verificarConectividad()');
}