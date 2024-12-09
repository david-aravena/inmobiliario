import {saveImage, getUrlImage} from 'app/serverless/utils/storage/'
import {createItem} from 'app/serverless/utils/db/'

export const saveProperty = async(property, images) => {
  const saveImages = async () => {
    const savedImageUrls = await Promise.all(images.map(async (image) => {
      const result = await saveImage(image);
      return await getUrlImage(result);
    }));
    return savedImageUrls;
  };

  await saveImage(property.image)
    .then(async (result) => {
      const propertyImageUrl = await getUrlImage(result);
      const savedImagesUrls = await saveImages();
      
      const obj = {
        ...property,
        image: propertyImageUrl,
        images: savedImagesUrls // Asegúrate de que la propiedad se llame 'images'
      };

      await createItem("properties", obj);
    })
    .catch(error => {
      console.error('Error saving property:', error);
      // Manejo de errores
    });
}