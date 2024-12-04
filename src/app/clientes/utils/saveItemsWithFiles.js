import {saveImage, getUrlImage} from 'app/serverless/utils/storage/'
import {createItem} from 'app/serverless/utils/db/'

export const saveItemsWithFiles = async(item) => {
  const saveFiles = async () => {
    const savedFilesUrls = await Promise.all(item.files.map(async (file) => {
      const result = await saveImage(file);
      return await getUrlImage(result);
    }));
    return savedFilesUrls;
  };
  const savedFilesUrls = await saveFiles();
  const { files, ...restOfItem } = item
  const obj = {
    ...restOfItem,
    files: savedFilesUrls
  };

  await createItem("clients", obj);
}