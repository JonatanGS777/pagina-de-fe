// Comunidad/js/topic/firestore-sync.js - SINCRONIZACIÓN CON FIRESTORE (CORREGIDO)

import { CONFIG } from './config.js';
import { showErrorMessage } from './ui-helpers.js';

// Importar Firebase Firestore
import { db } from '../js/firebase-config.js';
import { 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    getDoc,
    updateDoc, 
    deleteDoc, 
    orderBy, 
    query, 
    where,
    onSnapshot,
    serverTimestamp,
    increment,
    limit
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// 🔧 REFERENCIAS A COLECCIONES
const topicsCollection = collection(db, CONFIG.COLLECTIONS.TOPICS);

// 🔧 FUNCIONES DE TEMA PRINCIPAL

// Cargar tema desde Firestore
export async function loadTopicFromFirestore(topicId) {
    try {
        console.log('📋 Cargando tema desde Firestore:', topicId);
        
        const topicRef = doc(db, CONFIG.COLLECTIONS.TOPICS, topicId);
        const topicSnap = await getDoc(topicRef);
        
        if (!topicSnap.exists()) {
            throw new Error('Tema no encontrado');
        }
        
        const topicData = topicSnap.data();
        const topic = {
            id: topicSnap.id,
            ...topicData,
            // Convertir timestamps de Firestore a strings
            createdAt: topicData.createdAt?.toDate?.()?.toISOString() || topicData.createdAt,
            lastReply: topicData.lastReply?.toDate?.()?.toISOString() || topicData.lastReply,
            editedAt: topicData.editedAt?.toDate?.()?.toISOString() || topicData.editedAt
        };
        
        console.log('✅ Tema cargado desde Firestore:', topic.title);
        return topic;
        
    } catch (error) {
        console.error('❌ Error al cargar tema desde Firestore:', error);
        throw error;
    }
}

// Incrementar vistas del tema
export async function incrementTopicViews(topicId) {
    try {
        const topicRef = doc(db, CONFIG.COLLECTIONS.TOPICS, topicId);
        await updateDoc(topicRef, {
            views: increment(1)
        });
        console.log('✅ Vistas del tema incrementadas');
    } catch (error) {
        console.error('❌ Error al incrementar vistas:', error);
        // No mostrar error al usuario, es una acción secundaria
    }
}

// Actualizar tema en Firestore
export async function updateTopicInFirestore(topicId, updates) {
    try {
        const topicRef = doc(db, CONFIG.COLLECTIONS.TOPICS, topicId);
        const firestoreUpdates = {
            ...updates,
            editedAt: serverTimestamp()
        };
        
        await updateDoc(topicRef, firestoreUpdates);
        console.log('✅ Tema actualizado en Firestore');
        return true;
        
    } catch (error) {
        console.error('❌ Error al actualizar tema:', error);
        throw error;
    }
}

// Borrar tema de Firestore
export async function deleteTopicFromFirestore(topicId) {
    try {
        const topicRef = doc(db, CONFIG.COLLECTIONS.TOPICS, topicId);
        await deleteDoc(topicRef);
        console.log('✅ Tema borrado de Firestore');
        return true;
        
    } catch (error) {
        console.error('❌ Error al borrar tema:', error);
        throw error;
    }
}

// Toggle like en tema
export async function toggleTopicLikeInFirestore(topicId, userId, isLiking, currentLikedBy = []) {
    try {
        const topicRef = doc(db, CONFIG.COLLECTIONS.TOPICS, topicId);
        
        if (isLiking) {
            await updateDoc(topicRef, {
                likes: increment(1),
                likedBy: [...currentLikedBy, userId]
            });
        } else {
            const newLikedBy = currentLikedBy.filter(uid => uid !== userId);
            await updateDoc(topicRef, {
                likes: increment(-1),
                likedBy: newLikedBy
            });
        }
        
        console.log('✅ Like del tema actualizado en Firestore');
        return true;
        
    } catch (error) {
        console.error('❌ Error al actualizar like del tema:', error);
        throw error;
    }
}

// Toggle bookmark en tema
export async function toggleTopicBookmarkInFirestore(topicId, userId, isBookmarking, currentBookmarkedBy = []) {
    try {
        const topicRef = doc(db, CONFIG.COLLECTIONS.TOPICS, topicId);
        
        if (isBookmarking) {
            await updateDoc(topicRef, {
                bookmarkedBy: [...currentBookmarkedBy, userId]
            });
        } else {
            const newBookmarkedBy = currentBookmarkedBy.filter(uid => uid !== userId);
            await updateDoc(topicRef, {
                bookmarkedBy: newBookmarkedBy
            });
        }
        
        console.log('✅ Bookmark del tema actualizado en Firestore');
        return true;
        
    } catch (error) {
        console.error('❌ Error al actualizar bookmark:', error);
        throw error;
    }
}

// Actualizar última actividad del tema
export async function updateTopicLastActivity(topicId) {
    try {
        const topicRef = doc(db, CONFIG.COLLECTIONS.TOPICS, topicId);
        await updateDoc(topicRef, {
            lastReply: serverTimestamp(),
            replies: increment(1)
        });
        console.log('✅ Última actividad del tema actualizada');
        return true;
        
    } catch (error) {
        console.error('❌ Error al actualizar última actividad:', error);
        throw error;
    }
}

// 🔧 FUNCIONES DE COMENTARIOS

// Cargar comentarios desde Firestore
export async function loadCommentsFromFirestore(topicId) {
    try {
        console.log('💬 Cargando comentarios desde Firestore...');
        
        const commentsCollection = collection(db, CONFIG.COLLECTIONS.TOPICS, topicId, CONFIG.COLLECTIONS.COMMENTS);
        const commentsQuery = query(commentsCollection, orderBy('createdAt', 'desc'));
        const commentsSnapshot = await getDocs(commentsQuery);
        
        const comments = [];
        commentsSnapshot.forEach((doc) => {
            const commentData = doc.data();
            comments.push({
                id: doc.id,
                ...commentData,
                // Convertir timestamps de Firestore a strings
                createdAt: commentData.createdAt?.toDate?.()?.toISOString() || commentData.createdAt,
                editedAt: commentData.editedAt?.toDate?.()?.toISOString() || commentData.editedAt
            });
        });
        
        console.log(`💬 ${comments.length} comentarios cargados desde Firestore`);
        return comments;
        
    } catch (error) {
        console.error('❌ Error al cargar comentarios desde Firestore:', error);
        throw error;
    }
}

// Crear comentario en Firestore
export async function createCommentInFirestore(topicId, commentData) {
    try {
        const commentsCollection = collection(db, CONFIG.COLLECTIONS.TOPICS, topicId, CONFIG.COLLECTIONS.COMMENTS);
        const docRef = await addDoc(commentsCollection, {
            ...commentData,
            createdAt: serverTimestamp()
        });
        
        console.log('💬 Comentario guardado en Firestore con ID:', docRef.id);
        return docRef.id;
        
    } catch (error) {
        console.error('❌ Error al crear comentario:', error);
        throw error;
    }
}

// Actualizar comentario en Firestore
export async function updateCommentInFirestore(topicId, commentId, updates) {
    try {
        const commentRef = doc(db, CONFIG.COLLECTIONS.TOPICS, topicId, CONFIG.COLLECTIONS.COMMENTS, commentId);
        await updateDoc(commentRef, {
            ...updates,
            editedAt: serverTimestamp()
        });
        
        console.log('✅ Comentario actualizado en Firestore');
        return true;
        
    } catch (error) {
        console.error('❌ Error al actualizar comentario:', error);
        throw error;
    }
}

// Borrar comentario de Firestore
export async function deleteCommentFromFirestore(topicId, commentId) {
    try {
        const commentRef = doc(db, CONFIG.COLLECTIONS.TOPICS, topicId, CONFIG.COLLECTIONS.COMMENTS, commentId);
        await deleteDoc(commentRef);
        
        console.log('✅ Comentario borrado de Firestore');
        return true;
        
    } catch (error) {
        console.error('❌ Error al borrar comentario:', error);
        throw error;
    }
}

// Toggle like en comentario
export async function toggleCommentLikeInFirestore(topicId, commentId, userId, isLiking, currentLikedBy = []) {
    try {
        const commentRef = doc(db, CONFIG.COLLECTIONS.TOPICS, topicId, CONFIG.COLLECTIONS.COMMENTS, commentId);
        
        if (isLiking) {
            await updateDoc(commentRef, {
                likes: increment(1),
                likedBy: [...currentLikedBy, userId]
            });
        } else {
            const newLikedBy = currentLikedBy.filter(uid => uid !== userId);
            await updateDoc(commentRef, {
                likes: increment(-1),
                likedBy: newLikedBy
            });
        }
        
        console.log('✅ Like del comentario actualizado en Firestore');
        return true;
        
    } catch (error) {
        console.error('❌ Error al actualizar like del comentario:', error);
        throw error;
    }
}

// 🔧 LISTENERS EN TIEMPO REAL

// Configurar listener de comentarios en tiempo real
export function setupCommentsListener(topicId, onCommentsUpdate) {
    try {
        const commentsCollection = collection(db, CONFIG.COLLECTIONS.TOPICS, topicId, CONFIG.COLLECTIONS.COMMENTS);
        const commentsQuery = query(commentsCollection, orderBy('createdAt', 'desc'));
        
        const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
            console.log('🔄 Actualizando comentarios desde Firestore...');
            
            const comments = [];
            snapshot.forEach((doc) => {
                const commentData = doc.data();
                comments.push({
                    id: doc.id,
                    ...commentData,
                    // Convertir timestamps de Firestore a strings
                    createdAt: commentData.createdAt?.toDate?.()?.toISOString() || commentData.createdAt,
                    editedAt: commentData.editedAt?.toDate?.()?.toISOString() || commentData.editedAt
                });
            });
            
            if (typeof onCommentsUpdate === 'function') {
                onCommentsUpdate(comments);
            }
            
            console.log(`🔄 Comentarios actualizados: ${comments.length}`);
        }, (error) => {
            console.error('❌ Error en listener de comentarios:', error);
            showErrorMessage('Error al sincronizar comentarios');
        });
        
        console.log('✅ Listener de comentarios configurado');
        return unsubscribe;
        
    } catch (error) {
        console.error('❌ Error al configurar listener de comentarios:', error);
        return null;
    }
}

// Configurar listener de tema en tiempo real
export function setupTopicListener(topicId, onTopicUpdate) {
    try {
        const topicRef = doc(db, CONFIG.COLLECTIONS.TOPICS, topicId);
        
        const unsubscribe = onSnapshot(topicRef, (doc) => {
            if (doc.exists()) {
                console.log('🔄 Actualizando tema desde Firestore...');
                
                const topicData = doc.data();
                const topic = {
                    id: doc.id,
                    ...topicData,
                    // Convertir timestamps de Firestore a strings
                    createdAt: topicData.createdAt?.toDate?.()?.toISOString() || topicData.createdAt,
                    lastReply: topicData.lastReply?.toDate?.()?.toISOString() || topicData.lastReply,
                    editedAt: topicData.editedAt?.toDate?.()?.toISOString() || topicData.editedAt
                };
                
                if (typeof onTopicUpdate === 'function') {
                    onTopicUpdate(topic);
                }
                
                console.log('🔄 Tema actualizado en tiempo real');
            } else {
                console.log('❌ El tema ya no existe');
                if (typeof onTopicUpdate === 'function') {
                    onTopicUpdate(null);
                }
            }
        }, (error) => {
            console.error('❌ Error en listener de tema:', error);
            showErrorMessage('Error al sincronizar tema');
        });
        
        console.log('✅ Listener de tema configurado');
        return unsubscribe;
        
    } catch (error) {
        console.error('❌ Error al configurar listener de tema:', error);
        return null;
    }
}

// 🔧 FUNCIONES DE RESPALDO (localStorage)

// Guardar tema en localStorage
export function saveTopicToLocalStorage(topic) {
    try {
        const topics = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.FORUM_TOPICS) || '[]');
        const updatedTopics = topics.map(t => t.id === topic.id ? topic : t);
        
        // Si no existe, agregarlo
        if (!updatedTopics.find(t => t.id === topic.id)) {
            updatedTopics.push(topic);
        }
        
        localStorage.setItem(CONFIG.STORAGE_KEYS.FORUM_TOPICS, JSON.stringify(updatedTopics));
        console.log('💾 Tema guardado en localStorage como respaldo');
        
    } catch (error) {
        console.error('❌ Error al guardar tema en localStorage:', error);
    }
}

// Cargar tema desde localStorage
export function loadTopicFromLocalStorage(topicId) {
    try {
        const topics = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.FORUM_TOPICS) || '[]');
        const topic = topics.find(t => t.id === topicId);
        
        if (topic) {
            console.log('📱 Tema cargado desde localStorage:', topic.title);
        }
        
        return topic || null;
        
    } catch (error) {
        console.error('❌ Error al cargar tema desde localStorage:', error);
        return null;
    }
}

// Guardar comentarios en localStorage
export function saveCommentsToLocalStorage(topicId, comments) {
    try {
        const key = CONFIG.STORAGE_KEYS.COMMENTS_PREFIX + topicId;
        localStorage.setItem(key, JSON.stringify(comments));
        console.log('💾 Comentarios guardados en localStorage como respaldo');
        
    } catch (error) {
        console.error('❌ Error al guardar comentarios en localStorage:', error);
    }
}

// Cargar comentarios desde localStorage
export function loadCommentsFromLocalStorage(topicId) {
    try {
        const key = CONFIG.STORAGE_KEYS.COMMENTS_PREFIX + topicId;
        const comments = JSON.parse(localStorage.getItem(key) || '[]');
        
        console.log(`📱 ${comments.length} comentarios cargados desde localStorage`);
        return comments;
        
    } catch (error) {
        console.error('❌ Error al cargar comentarios desde localStorage:', error);
        return [];
    }
}

// 🔧 FUNCIÓN DE DIAGNÓSTICO
export function diagnoseFirestoreConnection() {
    return {
        firestoreAvailable: !!db,
        collectionsConfigured: !!(CONFIG.COLLECTIONS.TOPICS && CONFIG.COLLECTIONS.COMMENTS),
        timestamp: new Date().toISOString()
    };
}

// 🔧 FUNCIÓN: Probar conexión con Firestore
export async function testFirestoreConnection() {
    try {
        console.log('🔍 Probando conexión con Firestore...');
        
        // Intentar hacer una consulta simple
        const testQuery = query(topicsCollection, orderBy('createdAt', 'desc'), limit(1));
        await getDocs(testQuery);
        
        console.log('✅ Conexión con Firestore exitosa');
        return true;
        
    } catch (error) {
        console.error('❌ Error de conexión con Firestore:', error);
        return false;
    }
}

console.log('🔥 Sincronización con Firestore lista');