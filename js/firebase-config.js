// js/firebase-config.js - VERSIÓN CON FIRESTORE AGREGADO
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// Tu configuración real de Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBoqydshlTD4PmQQMFWJGfI5fANNCKwgek",
  authDomain: "minist-la-gloria-es-del-senor.firebaseapp.com",
  projectId: "minist-la-gloria-es-del-senor",
  storageBucket: "minist-la-gloria-es-del-senor.firebasestorage.app",
  messagingSenderId: "208885356100",
  appId: "1:208885356100:web:c5afddb6e579ba0b1c8e11",
  measurementId: "G-4MQY23PC82"
};

console.log('🔧 Inicializando Firebase...');

// Inicializar Firebase
let app, auth, analytics, googleProvider, db;

try {
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase App inicializada');
  
  auth = getAuth(app);
  console.log('✅ Firebase Auth inicializada');
  
  // NUEVO: Inicializar Firestore
  db = getFirestore(app);
  console.log('✅ Firebase Firestore inicializada');
  
  try {
    analytics = getAnalytics(app);
    console.log('✅ Firebase Analytics inicializada');
  } catch (analyticsError) {
    console.warn('⚠️ Analytics no disponible:', analyticsError.message);
    analytics = null;
  }
  
  googleProvider = new GoogleAuthProvider();
  googleProvider.addScope('email');
  googleProvider.addScope('profile');
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
  
  console.log('✅ Google Provider configurado');
  console.log('🎉 Firebase completamente inicializado');
  
} catch (error) {
  console.error('❌ Error al inicializar Firebase:', error);
}

// Exportaciones - AGREGADO: db (Firestore)
export { app, auth, analytics, googleProvider, db };
