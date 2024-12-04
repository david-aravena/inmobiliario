import { getFirestore, collection, getDocs, query, limit, where } from "firebase/firestore";
import app from 'app/serverless/config'

const db = getFirestore(app);

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


export const createItem = async(nameCollection, obj) => {
  console.log("obj2: ", obj)
  try {
    const docRef = await addDoc(collection(db, nameCollection), obj);
    console.log("create item: ", docRef)
    return docRef
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}