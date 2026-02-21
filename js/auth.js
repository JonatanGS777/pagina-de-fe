// js/auth.js - VERSIÓN CORREGIDA CON MANEJO DE ERRORES MEJORADO

import { auth, googleProvider, db } from './firebase-config.js';
import { 
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { 
  doc, 
  getDoc, 
  setDoc,
  serverTimestamp,
  deleteDoc,
  collection,
  getDocs
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

let currentUser = null;

// =================================================================
// FUNCIÓN DE INICIO PRINCIPAL
// =================================================================
export function initializeAuth(callback) {
  console.log('🔐 Escuchando cambios de estado de autenticación...');
  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    console.log('✅ Estado de Auth recibido. Usuario:', user ? user.email : 'Ninguno');
    if (callback && typeof callback === 'function') {
        callback(user);
    }
  });
}

// =================================================================
// FLUJO DE LOGIN (POP-UP CON FALLBACK A REDIRECT)
// =================================================================
export async function loginWithGoogle() {
  console.log('🔄 Iniciando proceso de login...');
  try {
    console.log('📱 Intentando iniciar sesión con Popup...');
    const result = await signInWithPopup(auth, googleProvider);
    if (result && result.user) {
      await handleSuccessfulLogin(result.user, result);
    }
  } catch (error) {
    console.error('❌ Error en login con Popup:', error.code);
    if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
      console.log('⚠️ Popup bloqueado. Redirigiendo para iniciar sesión...');
      await signInWithRedirect(auth, googleProvider);
    } else {
      handleLoginError(error);
    }
  }
}

// =================================================================
// MANEJO DEL REGRESO DE LA REDIRECCIÓN
// =================================================================
export async function handleRedirectResult() {
  try {
    console.log('🔄 Verificando resultado de redirección...');
    const result = await getRedirectResult(auth);
    if (result && result.user) {
      console.log('✅ Login por redirección exitoso.');
      await handleSuccessfulLogin(result.user, result);
    } else {
      console.log('ℹ️ No hay resultado de redirección pendiente.');
    }
  } catch (error) {
    console.error("❌ Error procesando el resultado de la redirección:", error);
    handleLoginError(error);
  }
}

// =================================================================
// MANEJO DE LOGIN EXITOSO - CORREGIDO CON MANEJO DE ERRORES
// =================================================================
async function handleSuccessfulLogin(user, result) {
    console.log('✅ Login exitoso:', user.displayName);
    
    try {
        await saveUserData(user);
        console.log('✅ Datos del usuario guardados exitosamente');
    } catch (saveError) {
        console.error('❌ ERROR CRÍTICO guardando datos:', saveError);
        
        // ✅ MOSTRAR ERROR AL USUARIO
        alert(`Error al guardar tus datos: ${saveError.message}\n\nPor favor contacta al administrador si el problema persiste.`);
        
        // Opcional: Permitir continuar sin datos guardados o detener el proceso
        // Puedes decidir si quieres que continúe o que se detenga aquí
        // return; // Descomenta esta línea si quieres detener el proceso en caso de error
    }

    const authOverlay = document.getElementById('auth-required');
    if(authOverlay) authOverlay.style.display = 'none';
}

function handleLoginError(error) {
  let errorMessage = 'Error al iniciar sesión. Por favor, intenta de nuevo.';
  if (error.code === 'auth/popup-blocked') {
    errorMessage = 'Las ventanas emergentes están bloqueadas. Por favor, actívalas para este sitio.';
  }
  console.error('Detalle del error:', error.message);
}

// =================================================================
// GUARDADO DE DATOS - VERSIÓN CORREGIDA CON MANEJO DE ERRORES MEJORADO
// =================================================================
async function saveUserData(user) {
    try {
        console.log('💾 Iniciando guardado de datos para:', user.email);
        
        // ✅ USAR UID COMO ID DEL DOCUMENTO
        const userDocRef = doc(db, 'userProfiles', user.uid);
        const docSnap = await getDoc(userDocRef);

        const userData = {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            lastLogin: serverTimestamp(),
        };

        if (!docSnap.exists()) {
            // USUARIO NUEVO
            console.log('🆕 Creando nuevo documento para UID:', user.uid);
            
            userData.joinDate = new Date(user.metadata.creationTime);
            userData.visitCount = 1;
            userData.lastVisitDate = new Date().toDateString();
            userData.daysSinceJoining = 0;
            userData.isValidData = true;
            
            // ✅ AGREGAR TRY/CATCH ESPECÍFICO PARA FIRESTORE
            try {
                await setDoc(userDocRef, userData);
                console.log('✅ DOCUMENTO CREADO EXITOSAMENTE en Firestore');
                console.log('📄 Datos guardados:', {
                    uid: userData.uid,
                    email: userData.email,
                    joinDate: userData.joinDate.toLocaleDateString('es-ES'),
                    visitCount: userData.visitCount
                });
            } catch (firestoreError) {
                console.error('❌ ERROR ESPECÍFICO DE FIRESTORE:', firestoreError);
                console.error('🔍 Código de error:', firestoreError.code);
                console.error('🔍 Mensaje de error:', firestoreError.message);
                
                // Mostrar error específico de permisos
                if (firestoreError.code === 'permission-denied') {
                    console.error('🚫 ERROR DE PERMISOS - Verificar reglas de Firestore');
                    console.error('🚫 UID del usuario:', user.uid);
                    console.error('🚫 Email del usuario:', user.email);
                }
                
                throw firestoreError; // Re-lanzar para que se maneje arriba
            }
            
            // Guardar en localStorage SOLO si Firestore fue exitoso
            localStorage.setItem('joinDate', userData.joinDate.toISOString());
            localStorage.setItem('visitCount', '1');
            localStorage.setItem('lastLogin', new Date().toISOString());
            localStorage.setItem('lastVisitDate', userData.lastVisitDate);
            localStorage.setItem('uid', user.uid);
            localStorage.setItem('name', user.displayName);
            localStorage.setItem('email', user.email);
            localStorage.setItem('photo', user.photoURL);
            localStorage.setItem('provider', 'Google');
            
            console.log('✅ USUARIO NUEVO REGISTRADO COMPLETAMENTE');
            
        } else {
            // USUARIO EXISTENTE
            console.log('🔄 Actualizando usuario existente para UID:', user.uid);
            
            const existingData = docSnap.data();
            
            // Restaurar joinDate desde Firestore al localStorage
            if (existingData.joinDate) {
                let joinDateISO;
                if (existingData.joinDate.toDate) {
                    // Es un timestamp de Firestore
                    joinDateISO = existingData.joinDate.toDate().toISOString();
                } else if (typeof existingData.joinDate === 'string') {
                    // Es un string ISO
                    joinDateISO = existingData.joinDate;
                } else {
                    // Es un objeto Date
                    joinDateISO = new Date(existingData.joinDate).toISOString();
                }
                
                localStorage.setItem('joinDate', joinDateISO);
                console.log('📅 JoinDate restaurado para', user.email);
                console.log('📅 Fecha:', new Date(joinDateISO).toLocaleDateString('es-ES'));
            }
            
            // Incrementar contador de visitas solo si es un día diferente
            const today = new Date().toDateString();
            
            if (existingData.lastVisitDate !== today) {
                userData.visitCount = (existingData.visitCount || 0) + 1;
                userData.lastVisitDate = today;
                
                // Recalcular días desde el registro
                if (existingData.joinDate) {
                    const joinDate = existingData.joinDate.toDate ? 
                        existingData.joinDate.toDate() : new Date(existingData.joinDate);
                    const now = new Date();
                    
                    // Cálculo corregido de días
                    const joinDateMidnight = new Date(joinDate);
                    joinDateMidnight.setHours(0, 0, 0, 0);
                    const nowMidnight = new Date(now);
                    nowMidnight.setHours(0, 0, 0, 0);
                    
                    userData.daysSinceJoining = Math.floor((nowMidnight - joinDateMidnight) / (1000 * 60 * 60 * 24));
                    userData.isValidData = true;
                }
                
                localStorage.setItem('visitCount', userData.visitCount.toString());
                localStorage.setItem('lastVisitDate', today);
            }
            
            // Actualizar otros datos básicos en localStorage
            localStorage.setItem('lastLogin', new Date().toISOString());
            localStorage.setItem('uid', user.uid);
            localStorage.setItem('name', user.displayName);
            localStorage.setItem('email', user.email);
            localStorage.setItem('photo', user.photoURL);
            localStorage.setItem('provider', 'Google');
            
            // ✅ TRY/CATCH PARA ACTUALIZACIÓN
            try {
                await setDoc(userDocRef, userData, { merge: true });
                console.log('✅ USUARIO EXISTENTE ACTUALIZADO');
            } catch (updateError) {
                console.error('❌ ERROR ACTUALIZANDO USUARIO EXISTENTE:', updateError);
                throw updateError;
            }
        }
        
    } catch (error) {
        console.error('❌ ERROR GENERAL EN saveUserData:', error);
        console.error('🔍 Stack trace:', error.stack);
        
        // ✅ PROPAGAR EL ERROR PARA QUE SE MUESTRE AL USUARIO
        throw new Error(`Error guardando datos del usuario: ${error.message}`);
    }
}

// =================================================================
// LOGOUT CORREGIDO - PRESERVAR JOINDATE Y DATOS IMPORTANTES
// =================================================================
export async function logout() {
  try {
    await signOut(auth);
    currentUser = null;
    
    // PRESERVAR joinDate y otros datos importantes durante logout
    const joinDate = localStorage.getItem('joinDate');
    const uid = localStorage.getItem('uid');
    const email = localStorage.getItem('email');
    
    console.log('🚪 Cerrando sesión - preservando datos importantes...');
    console.log('📅 JoinDate a preservar:', joinDate);
    console.log('👤 Email a preservar:', email);
    
    // Borrar todo localStorage
    localStorage.clear();
    
    // Restaurar datos importantes que no queremos perder
    if (joinDate) {
      localStorage.setItem('joinDate', joinDate);
      console.log('✅ JoinDate preservado durante logout');
    }
    if (uid) {
      localStorage.setItem('uid', uid);
      console.log('✅ UID preservado durante logout');
    }
    if (email) {
      localStorage.setItem('email', email);
      console.log('✅ Email preservado durante logout');
    }
    
    console.log('✅ Sesión cerrada exitosamente - datos importantes preservados');
    window.location.reload();
  } catch (error) {
    console.error('❌ Error al cerrar sesión:', error);
  }
}

// =================================================================
// FUNCIONES DE DATOS DE USUARIO MEJORADAS
// =================================================================
export function getCurrentUser() {
  return currentUser;
}

export function checkAuthState() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      currentUser = user;
      resolve(user);
    });
  });
}

export function getUserStats() {
  try {
    const joinDate = localStorage.getItem('joinDate');
    const visitCount = localStorage.getItem('visitCount');
    const lastLogin = localStorage.getItem('lastLogin');
    const lastVisitDate = localStorage.getItem('lastVisitDate');
    
    if (!joinDate) {
      console.log('⚠️ No hay joinDate en localStorage');
      return null;
    }
    
    const joinDateObj = new Date(joinDate);
    const now = new Date();
    
    // Cálculo corregido de días
    const joinDateMidnight = new Date(joinDateObj);
    joinDateMidnight.setHours(0, 0, 0, 0);
    const nowMidnight = new Date(now);
    nowMidnight.setHours(0, 0, 0, 0);
    
    const daysSinceJoining = Math.floor((nowMidnight - joinDateMidnight) / (1000 * 60 * 60 * 24));
    
    return {
      joinDate: joinDate,
      visitCount: parseInt(visitCount) || 1,
      lastLogin: lastLogin || new Date().toISOString(),
      lastVisitDate: lastVisitDate || new Date().toDateString(),
      daysSinceJoining: daysSinceJoining,
      isValidData: true
    };
  } catch (error) {
    console.error('❌ Error obteniendo estadísticas de usuario:', error);
    return null;
  }
}

export async function loadUserDataFromFirestore(uid) {
  try {
    if (!uid) {
      console.log('⚠️ No hay UID para cargar datos de Firestore');
      return null;
    }
    
    // ✅ USAR UID COMO ID DEL DOCUMENTO
    const userDocRef = doc(db, 'userProfiles', uid);
    const docSnap = await getDoc(userDocRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('✅ Datos cargados desde Firestore para UID:', uid);
      
      // ✅ VERIFICAR QUE EL UID DEL CAMPO COINCIDA CON EL ID DEL DOCUMENTO
      if (data.uid && data.uid !== uid) {
        console.warn('⚠️ UID del campo no coincide con ID del documento');
        console.warn('⚠️ ID documento:', uid);
        console.warn('⚠️ UID campo:', data.uid);
      }
      
      return data;
    } else {
      console.log('⚠️ No existe documento en Firestore para UID:', uid);
      return null;
    }
  } catch (error) {
    console.error('❌ Error cargando datos de Firestore:', error);
    return null;
  }
}

// ✅ FUNCIÓN CORREGIDA PARA GUARDAR DATOS
export async function saveUserDataToFirestore(uid, data, preserveJoinDate = true) {
  try {
    if (!uid) {
      console.log('⚠️ No hay UID para guardar en Firestore');
      return false;
    }
    
    // ✅ USAR UID COMO ID DEL DOCUMENTO
    const userDocRef = doc(db, 'userProfiles', uid);
    
    // ✅ SIEMPRE INCLUIR UID COMO CAMPO
    const dataWithUID = {
      ...data,
      uid: uid, // ✅ ASEGURAR QUE UID ESTÉ COMO CAMPO
      lastUpdated: serverTimestamp()
    };
    
    if (preserveJoinDate) {
      // No incluir joinDate en la actualización para preservarlo
      const { joinDate, ...dataWithoutJoinDate } = dataWithUID;
      await setDoc(userDocRef, dataWithoutJoinDate, { merge: true });
      console.log('✅ Datos guardados en Firestore preservando joinDate para UID:', uid);
    } else {
      await setDoc(userDocRef, dataWithUID, { merge: true });
      console.log('✅ Datos guardados en Firestore incluyendo joinDate para UID:', uid);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error guardando en Firestore:', error);
    return false;
  }
}

export async function getReliableJoinDate(uid) {
  try {
    // 1. Intentar desde localStorage primero
    const localJoinDate = localStorage.getItem('joinDate');
    if (localJoinDate) {
      console.log('📅 JoinDate confiable desde localStorage:', localJoinDate);
      return localJoinDate;
    }
    
    // 2. Si no hay en localStorage, obtener desde Firestore
    if (uid) {
      const firestoreData = await loadUserDataFromFirestore(uid);
      if (firestoreData && firestoreData.joinDate) {
        let joinDateISO;
        if (firestoreData.joinDate.toDate) {
          joinDateISO = firestoreData.joinDate.toDate().toISOString();
        } else if (typeof firestoreData.joinDate === 'string') {
          joinDateISO = firestoreData.joinDate;
        } else {
          joinDateISO = new Date(firestoreData.joinDate).toISOString();
        }
        
        // Guardar en localStorage para próximas veces
        localStorage.setItem('joinDate', joinDateISO);
        console.log('📅 JoinDate confiable desde Firestore:', joinDateISO);
        return joinDateISO;
      }
    }
    
    // 3. Si no hay en ningún lado, usar fecha actual como fallback
    const fallbackDate = new Date().toISOString();
    localStorage.setItem('joinDate', fallbackDate);
    console.log('📅 JoinDate fallback (fecha actual):', fallbackDate);
    return fallbackDate;
    
  } catch (error) {
    console.error('❌ Error obteniendo joinDate confiable:', error);
    const fallbackDate = new Date().toISOString();
    localStorage.setItem('joinDate', fallbackDate);
    return fallbackDate;
  }
}

// =================================================================
// FUNCIONES DE LIMPIEZA Y MIGRACIÓN
// =================================================================

// ✅ FUNCIÓN PARA LIMPIAR DOCUMENTOS DUPLICADOS
export async function cleanupDuplicateDocuments() {
  try {
    console.log('🧹 Iniciando limpieza de documentos duplicados...');
    
    const querySnapshot = await getDocs(collection(db, 'userProfiles'));
    
    const docsToDelete = [];
    const validDocs = [];
    
    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      
      // Si el ID del documento NO coincide con el UID del campo
      if (docSnapshot.id !== data.uid && data.uid) {
        docsToDelete.push(docSnapshot.id);
        console.log('📄 Documento a eliminar (ID incorrecto):', docSnapshot.id, 'UID campo:', data.uid);
      }
      // Si no tiene campo UID, es definitivamente inválido
      else if (!data.uid) {
        docsToDelete.push(docSnapshot.id);
        console.log('📄 Documento a eliminar (sin UID):', docSnapshot.id);
      }
      // Es válido
      else {
        validDocs.push({id: docSnapshot.id, data});
        console.log('✅ Documento válido:', docSnapshot.id);
      }
    });
    
    // Eliminar documentos duplicados/inválidos
    const deletePromises = docsToDelete.map(async (docId) => {
      const docRef = doc(db, 'userProfiles', docId);
      await deleteDoc(docRef);
      console.log('🗑️ Eliminado documento:', docId);
    });
    
    await Promise.all(deletePromises);
    
    console.log(`✅ Limpieza completada:`);
    console.log(`   📊 Documentos válidos: ${validDocs.length}`);
    console.log(`   🗑️ Documentos eliminados: ${docsToDelete.length}`);
    
    return {
      valid: validDocs.length,
      deleted: docsToDelete.length
    };
    
  } catch (error) {
    console.error('❌ Error en limpieza:', error);
    throw error;
  }
}

export function debugUserData() {
  console.log('🔍 === DEBUG DE DATOS DE USUARIO ===');
  console.log('👤 Usuario actual:', currentUser ? currentUser.email : 'Ninguno');
  console.log('💾 localStorage joinDate:', localStorage.getItem('joinDate'));
  console.log('💾 localStorage visitCount:', localStorage.getItem('visitCount'));
  console.log('💾 localStorage lastLogin:', localStorage.getItem('lastLogin'));
  console.log('💾 localStorage email:', localStorage.getItem('email'));
  console.log('💾 localStorage uid:', localStorage.getItem('uid'));
  
  const stats = getUserStats();
  if (stats) {
    console.log('📊 Estadísticas calculadas:', stats);
  } else {
    console.log('❌ No se pudieron calcular estadísticas');
  }
  console.log('🔍 === FIN DEBUG ===');
}

// Función para compatibilidad
export function initializeAuthEvents() { 
  console.log('📋 initializeAuthEvents llamada - función placeholder');
}