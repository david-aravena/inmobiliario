import { useState, useEffect } from 'react'
import Navbar from 'app/components/navbar/'
import Image from 'next/image'
import styles from './css/list.module.css'


export default function List({ getItems, filter, CardUI , ModalUI}) {
  const [items, setItems] = useState(null);
  const [itemSelected, setItemSelected] = useState(null);
 
  const handleSelectItem = (item) => {
    setItemSelected(item)
  }

  const handleFilter = (styles) => {
    const filteredItems = filter(styles, setItems);
    if (filteredItems && filteredItems.length === 0) {
      alert("No se encontraron resultados con el filtro");
    }
    return filteredItems
  };

  useEffect(() => {
    getItems()
      .then((result) => {
        console.log(result)
        setItems(result);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (items?.length === 0) {
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
        {handleFilter(styles)}
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
            <div>
              <ModalUI
                itemSelected={itemSelected}
                setItemSelected={setItemSelected} // Pasamos la función de seteo de estado
              >
                <Navbar />
              </ModalUI>
            </div>
          )}
          
        </>
      ) : (
        <h2>No se encontraron propiedades.</h2>
      )}
    </>
  );
}
