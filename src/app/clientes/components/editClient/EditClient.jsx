import {deleteFile} from 'app/serverless/utils/storage/'
import {deleteFileClient, updateClientData} from 'app/serverless/utils/db/'
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

  const getNewClientData = () => {
    const {files, ...newDataWithoutFiles} = itemSelected 
    updateClientData(newDataWithoutFiles, itemSelected.id)
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
              <p>Nombre: <input type="text" name="name" value={itemSelected.name} onChange={(e) => setItemSelected({...itemSelected, [e.target.name]: e.target.value})} /></p>
            </div>
            <div className={styles.descriptionContainer}>
              <p>Tipo: <input type="text" name="type" value={itemSelected.type} onChange={(e) => setItemSelected({...itemSelected, [e.target.name]: e.target.value})} /></p>
            </div>
            <div className={styles.descriptionContainer}>
              <p>Email: <input type="text" name="email" value={itemSelected.email} onChange={(e) => setItemSelected({...itemSelected, [e.target.name]: e.target.value})} /></p>
            </div>
            <div className={styles.descriptionContainer}>
              <p>Fono: <input type="text" name="phone" value={itemSelected.phone} onChange={(e) => setItemSelected({...itemSelected, [e.target.name]: e.target.value})} /></p>
            </div>
            <div className={styles.descriptionContainer}>
              <p>Ubicacion: <input type="text" name="ubication" value={itemSelected.ubication} onChange={(e) => setItemSelected({...itemSelected, [e.target.name]: e.target.value})} /></p>
            </div>
            <div className={styles.descriptionContainer}>
              <p>Descripción</p>
              <textarea cols="40" rows="10" name="comments" value={itemSelected.comments} onChange={(e) => setItemSelected({...itemSelected, [e.target.name]: e.target.value})} />
            </div>
            <div>
              <button onClick={() => getNewClientData()}>Actualizar Datos</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}