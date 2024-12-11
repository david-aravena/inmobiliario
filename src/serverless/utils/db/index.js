import { getFirestore, collection, getDocs, getDoc, query, limit, where, addDoc, doc, updateDoc, arrayRemove } from "firebase/firestore";
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

export const deleteFileClient = async (id, fileUrl) => {
  try {
    // Obtener la referencia al documento en la colección `clients`
    const propertyRef = doc(db, "clients", id);

    // Obtener el documento actual para poder trabajar con el array `files`
    const docSnapshot = await getDoc(propertyRef);

    // Verificar si el documento existe
    if (docSnapshot.exists()) {
      // Obtener el array `files` del documento
      const filesArray = docSnapshot.data().files;

      // Buscar el objeto que contiene la URL que coincide con `fileUrl`
      const fileToRemove = filesArray.find(file => file.url === fileUrl);

      if (fileToRemove) {
        // Eliminar el objeto que contiene la URL
        await updateDoc(propertyRef, {
          files: arrayRemove(fileToRemove)  // Elimina el objeto completo que contiene la URL
        });

        console.log("Archivo eliminado de Firestore.");
      } else {
        console.log("No se encontró el archivo con la URL proporcionada.");
      }
    } else {
      console.log("El documento no existe.");
    }
  } catch (error) {
    console.error("Error al eliminar el archivo de Firestore:", error.message);
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
