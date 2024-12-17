import { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from 'app/components/navbar/'
import Loading from 'app/components/loading/'
import styles from './css/list.module.css'


export default function List({ getItems, filter, CardUI , ShowDetails }) {
  const [items, setItems] = useState(null);
  const [itemSelected, setItemSelected] = useState(null);
 
  const handleSelectItem = (item) => {
    setItemSelected(item)
  }

  const handleFilter = () => {
    const filteredItems = filter(setItems);
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
                key={index}
                item={item}
                index={index}
                setItemSelected={handleSelectItem}
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
              <ShowDetails
                itemSelected={itemSelected}
                setItemSelected={setItemSelected}
              >
                <Navbar />
              </ShowDetails>
            </div>
          )}
          
        </>
      ) : (
        <div style={{position:"absolute", top:0, left:0, width:"100vw", height:"100vh", backdropFilter: "blur(10px)"}}>
          <Loading />
        </div>
      )}
    </>
  );
}
