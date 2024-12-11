import { saveImage, getUrlImage } from 'app/serverless/utils/storage/';
import { createItem } from 'app/serverless/utils/db/';

export const saveItemsWithFiles = async (item) => {
  const saveFiles = async () => {
    const savedFiles = await Promise.all(item.files.map(async (file) => {
      // Subir el archivo y obtener la URL
      const result = await saveImage(file);
      const fileUrl = await getUrlImage(result);
      return {
        name: file.name,
        type: file.type,
        size: file.size,
        url: fileUrl
      };
    }));
    return savedFiles;
  };

  // Obtener las URLs de los archivos guardados
  const savedFiles = await saveFiles();

  // Desestructurar el item, excluyendo el atributo 'files'
  const { files, ...restOfItem } = item;

  // Crear el objeto final con los archivos y la información adicional
  const obj = {
    ...restOfItem,
    files: savedFiles  // Asignar los archivos con la URL y atributos
  };

  // Guardar el objeto final en la base de datos
  await createItem("clients", obj);
};
