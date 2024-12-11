import {deleteFile} from 'app/serverless/utils/storage/'
import {deleteFileClient} from 'app/serverless/utils/db/'
import styles from './modalClients.module.css'

export default function EditClient({itemSelected, setItemSelected}){

  const deleteFileHandler = async (urlFile, id) => {
    const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este elemento?");
    if (isConfirmed) {
      await deleteFile(urlFile)
      await deleteFileClient(id, urlFile)
      const newItemSelected = itemSelected.files.filter(file => file.url !== urlFile);
      setItemSelected({...itemSelected, files: newItemSelected})
      alert("Archivo eliminado")
    } else {
      alert("Eliminación cancelada");
    }
  }

  return(
    <>
      <div className={styles.showContainer}>
        <div style={{padding: "0 1rem", display:"flex", justifyContent:"flex-end", padding:"1rem 0"}}>
          <button onClick={() => setItemSelected(null)}>Volver al Home</button>
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.imagesContainer}>
            {itemSelected.files.map((item, index) => (
              <div style={{padding:"1rem 0"}}>
                <div>
                  <p>nombre: {item.name}</p>
                </div>
                <div>
                  <p>tipo: {item.type}</p>
                </div>
                <div>
                  <p>tamaño: {item.size}</p>
                </div>
                <div>
                  <a href={item.url} download={item.name}>
                    <button>Descargar</button>
                  </a>
                  <button onClick={() => deleteFileHandler(item.url, itemSelected.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.detailsContainer}>
            <div className={styles.descriptionContainer}>
              <p>Nombre: {itemSelected.name}</p>
            </div>
            <div className={styles.descriptionContainer}>
              <p>Tipo: {itemSelected.type}</p>
            </div>
            <div className={styles.descriptionContainer}>
              <p>Email: {itemSelected.email}</p>
            </div>
            <div className={styles.descriptionContainer}>
              <p>Fono: {itemSelected.phone}</p>
            </div>
            <div className={styles.descriptionContainer}>
              <p>Ubicacion: {itemSelected.ubication}</p>
            </div>
            <div className={styles.descriptionContainer}>
              <p>{itemSelected.comments}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}