import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup, 
} from "firebase/auth";
import app from 'app/serverless/config'

const auth = getAuth(app);

export const createUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error("Error code:", error.code, "Error message:", error.message);
    return error.message;
  }
}

export const googleAuth = async() => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider); // Espera el resultado
    return result;
  } catch (error) {
    console.error('Error durante la autenticación:', error.message);
    throw error; // Lanza el error para que sea capturado en la función que llama
  }
};

export const loginUser = async(email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential;
  } catch (error) {
    console.error("Error code:", error.code, "Error message:", error.message);
    return error.message;
  }
}

export const logoutUser = async() => {
  signOut(auth).then((result) => {
    return result
  }).catch((error) => {
    console.log("logout error: ", error)
  });
}
