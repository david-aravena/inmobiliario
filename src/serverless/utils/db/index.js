import { getFirestore, collection, getDocs, query, limit, where, addDoc, doc, updateDoc, arrayRemove } from "firebase/firestore";
import app from 'app/serverless/config'

const db = getFirestore(app);

const requestDocs = async(request) => {
  const querySnapshot = await getDocs(request);
  const documents = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  if(documents.length === 0){
    return null
  } else {
    return documents    
  }
}

export const getCollection = async (nameCollection, results) => {
  try{
    const reference = query(collection(db, nameCollection), limit(results));
    return await requestDocs(reference)
  } catch(error){
    console.log("getCollection: ", error)
  }
}

export const findItemId = async (nameCollection, id) => {
  try {
    const q = query(collection(db, nameCollection), where("uid", "==", id), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
    return null;
  } catch (error) {
    console.error("Error al buscar el usuario: ", error);
    return false;
  }
};

export const filterItems = async (filters) => {
  console.log("filters: ", filters)
  try{
    let q = query(collection(db, 'properties'));

    if (filters.user) {
        q = query(q, where('user', '==', filters.user));
    }
    if (filters.ubicacion) {
        q = query(q, where('ubication', '==', filters.ubication));
    }
    if (filters.type) {
        q = query(q, where('type', '==', filters.type));
    }
    if (filters.state) {
        q = query(q, where('state', '==', filters.state));
    }
    if (filters.condition) {
        q = query(q, where('condition', '==', filters.condition));
    }
    return await requestDocs(q)
  }catch(error){
    console.log("filterItems: ", error)
  }
};

export const getUserItems = async(nameCollection, id) => {
  try{
    let q = query(collection(db, nameCollection), where('user', '==', id));
    return await requestDocs(q)
  } catch(error){
    console.log("getUserItems: ", error)
  }
}


export const createItem = async(nameCollection, obj) => {
  console.log("obj2: ", obj)
  try {
    const docRef = await addDoc(collection(db, nameCollection), obj);
    console.log("create item: ", docRef)
    return docRef
  } catch (e) {
    console.error("Error adding document: ", e.message);
  }
}

export const deleteFileUrl = async (propertyId, fileUrl) => {
  try {
    // Obtener la referencia al documento en la colección `properties`
    const propertyRef = doc(db, "properties", propertyId);

    // Actualizar el campo `images` eliminando la URL del archivo
    await updateDoc(propertyRef, {
      images: arrayRemove(fileUrl)  // Elimina la URL específica del array
    });

    console.log("URL eliminada de Firestore.");
  } catch (error) {
    console.error("Error al eliminar la URL de Firestore:", error.message);
  }
};

export const updateImages = async (newImages, id) => {
  try {
    const docRef = doc(db, "properties", id);
    await updateDoc(docRef, {
      images: newImages, // Reemplaza el array actual por el nuevo array
    });

    alert("Imágenes actualizadas correctamente!");
  } catch (error) {
    console.error("Error al actualizar las imágenes:", error.message);
    alert("Hubo un error al actualizar las imágenes.");
  }
};
