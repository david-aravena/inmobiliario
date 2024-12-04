import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './css/list.module.css'


export default function List({ getItems, filter, CardUI , ModalUI}) {
  const [items, setItems] = useState(null);
  const [itemSelected, setItemSelected] = useState(null);
 
  const handleSelectItem = (item) => {
    setItemSelected(item)
  }

  useEffect(() => {
    getItems()
      .then((result) => {
        setItems(result);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (items && items.length === 0) {
      alert("No hay resultados encontrados");
      getItems()
        .then((result) => {
          setItems(result);
        })
        .catch((error) => console.log(error));
    }
  }, [items]);

  return (
    <>
      <div className={styles.filterContainer}>
        {filter(styles, setItems)}
      </div>
      {items ? (
        <>
          <div className={styles.listContainer}>
            {items.map((item, index) => (
              <CardUI
                key={index}  // No olvides la key cuando usas .map()
                item={item}
                index={index}
                styles={styles}
                setItemSelected={handleSelectItem} // Usamos la función manejadora
              >
                <Image
                  src={item.image}
                  alt="error"
                  layout="fill"
                  objectFit="cover"
                />
              </CardUI>
            ))}
          </div>

          {itemSelected && (
            <ModalUI
              itemSelected={itemSelected}
              setItemSelected={setItemSelected} // Pasamos la función de seteo de estado
            />
          )}
          
        </>
      ) : (
        <h2>No se encontraron propiedades.</h2>
      )}
    </>
  );
}
