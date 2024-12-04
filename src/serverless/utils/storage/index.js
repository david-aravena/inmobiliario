import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "app/serverless/config"

const storage = getStorage(app);

export const saveImage = async(image) => {
  const storageRef = ref(storage, `images/${image.name}`);
  const imageResult = await uploadBytes(storageRef, image);
  return storageRef
}

export const saveFiles = async(files) => {
  try {
    const uploadPromises = files.map((file) => {
      const storageRef = ref(storage, `files/${file.name}`);
      return uploadBytes(storageRef, file);
    });

    const readyFiles = await Promise.all(uploadPromises);
    return readyFiles
  } catch (error) {
    console.error('Error al subir archivos:', error);
    alert('Error al subir archivos. Intenta de nuevo.');
  }
}

export const getUrlImage = async(image) => {
  const url = await getDownloadURL(image) 
  return url;
}
