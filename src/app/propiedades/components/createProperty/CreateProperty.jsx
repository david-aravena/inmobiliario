import { useState } from "react";
import Image from "next/image";
import CardPropertyUI from "app/components/cardUI/CardPropertyUI";
import ModalProperty from "app/components/modal/properties/ModalPropertyUI";
// import styles from "./createProperty.module.css";
import styles from 'app/components/list/css/list.module.css'

export default function CreateProperty({ submit, buttonBack }) {
  const [isMakePreview, setIsMakePreview] = useState(true);
  const [item, setItem] = useState({
    price: "",
    ubication: "",
    type: "",
    state: "",
    mts: "",
    bedRooms: "",
    bathrooms: "",
    parking: "",
    image: null,
    imagePreview: "",
    images: [],
    imageSelected: "",
    description: ""
  });

  const getInputValue = (e) => {
    const { name, value, files } = e.target;

    if (name === "images" && files.length > 0) {
      const newImages = Array.from(files).map((file) => file);
      setItem((prevItem) => ({
        ...prevItem,
        images: [...prevItem.images, ...newImages],
      }));
    } else if (name === "image" && files.length > 0) {
      setItem((prevItem) => ({
        ...prevItem,
        image: files[0],
        imagePreview: URL.createObjectURL(files[0]),
      }));
    } else {
      setItem((prevItem) => ({
        ...prevItem,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(item);
  };

  return (
    <>
    <div className={styles.createPropertyContainer}>
      <div>
        {buttonBack}
      </div>
      <div className={styles.formCreatePropertyContainer}>
        <form onSubmit={handleSubmit}>
          {isMakePreview ? (
            <>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <img src="/svg/formCreateProperty/money.svg" /> <label>Valor</label>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    name="price"
                    value={item.price}
                    placeholder="ingrese valor aqui"
                    onChange={(e) => getInputValue(e)}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <img src="/svg/formCreateProperty/ubication.svg" />  <label>Ubicacion</label>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    name="ubication"
                    value={item.ubication}
                    placeholder="ingrese ubicacion aqui"
                    onChange={(e) => getInputValue(e)}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <label htmlFor="propertyType">Tipo</label>
                </div>
                <div className={styles.inputContainer}>
                  <select
                    name="type"
                    id="propertyType"
                    value={item.type}
                    onChange={(e) => getInputValue(e)}
                  >
                    <option value="casa">Casa</option>
                    <option value="departamento">Departamento</option>
                    <option value="oficina">Oficina</option>
                    <option value="terreno">Terreno</option>
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <label htmlFor="state">Estado</label>
                </div>
                <div className={styles.inputContainer}>
                  <select name="state" value={item.state} onChange={(e) => getInputValue(e)}>
                    <option value="venta">Venta</option>
                    <option value="arriendo">Arriendo</option>
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <label>Metros cuadrados</label>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    name="mts"
                    value={item.mts}
                    placeholder="ingrese cantidad aqui"
                    onChange={(e) => getInputValue(e)}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <label>Habitaciones</label>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    name="bedRooms"
                    value={item.bedRooms}
                    placeholder="ingrese cantidad aqui"
                    onChange={(e) => getInputValue(e)}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <label>Baños</label>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    name="bathrooms"
                    value={item.bathrooms}
                    placeholder="ingrese cantidad aqui"
                    onChange={(e) => getInputValue(e)}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <label>Estacionamientos</label>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    name="parking"
                    value={item.parking}
                    placeholder="ingrese cantidad aqui"
                    onChange={(e) => getInputValue(e)}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <label>Vista previa</label>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => getInputValue(e)}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <label>Mas imagenes</label>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type="file"
                    name="images"
                    multiple
                    onChange={(e) => getInputValue(e)}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <label>Descripcion</label>
                </div>
                <div className={styles.inputContainer}>
                  <textarea
                    name="description"
                    rows="4"
                    cols="50"
                    onChange={(e) => getInputValue(e)}
                    value={item.description}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.inputContainer}>
                  <input type="submit" value="crear propiedad" />
                </div>
              </div>
            </>
          )}
          <div className={styles.field}>
            <div className={styles.inputContainer}>
              <button
                type="button"
                onClick={() => setIsMakePreview(!isMakePreview)}
              >
                Siguiente
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.previewNewProperty}>
        {isMakePreview ? (
          <CardPropertyUI styles={styles} item={item}>
            {item.imagePreview ? (
              <Image
                src={item.imagePreview}
                alt="Vista previa"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div>Selecciona una imagen para vista previa</div>
            )}
          </CardPropertyUI>
        ) : (
          <ModalProperty
            itemSelected={item}
            setItemSelected={(value) => setItem({...item, imageSelected: value.imageSelected})} // Pasamos la función de seteo de estado
          />
        )}
      </div>
    </div>
    </>
  );
}
