import { usePathname } from 'next/navigation';
import styles from './modalProperties.module.css'

export default function ModalClientsUI({itemSelected, setItemSelected}){

  const pathname = usePathname();

  return(
    <>
      <div className={styles.showContainer}>
        {pathname === "/" && (
          <div style={{padding: "0 1rem", display:"flex", justifyContent:"flex-end", padding:"1rem 0"}}>
            <button onClick={() => setItemSelected(null)}>Volver al Home</button>
          </div>
        )}
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
                </div>
              </div>
            ))}
          </div>

          <div className={styles.detailsContainer}>
            <div className={styles.descriptionContainer}>
              <p>{itemSelected.comments}</p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}