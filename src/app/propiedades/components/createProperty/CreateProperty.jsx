import { useState } from "react";
import Image from "next/image";
import CardPropertyUI from "app/components/ui/cardProperty/CardPropertyUI";
import ModalProperty from "app/components/modal/properties/ModalPropertyUI";
// import styles from "./createProperty.module.css";
import styles from 'app/components/list/css/list.module.css';

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
    <div style={{ padding: "0 1rem" }}>
      <div style={{ padding: "1rem 0" }}>
        {buttonBack}
      </div>
      <div className={isMakePreview ? styles.createPropertyContainerPreview : styles.createPropertyContainerDetails}>
        <div className={styles.formCreatePropertyContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.stepNavigation}>
              <div className={styles.stepText}>
                Paso {isMakePreview ? "01" : "02"} de 02
              </div>
              <div className={styles.stepButtonContainer}>
                <button
                  type="button"
                  onClick={() => setIsMakePreview(!isMakePreview)}
                  className={styles.stepButton}
                >
                  <span className="stepButtonText">
                    {isMakePreview ? ">" : "<"}
                  </span>
                </button>
              </div>
            </div>





            {isMakePreview ? (
              <>
                <div className={styles.field}>
                  <div className="containerLabel">
                    <label>Valor</label>
                  </div>
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      name="price"
                      value={item.price}
                      onChange={(e) => getInputValue(e)}
                      className="input"
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <div className="containerLabel">
                    <label>Ubicacion</label>
                  </div>
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      name="ubication"
                      value={item.ubication}
                      onChange={(e) => getInputValue(e)}
                      className="input"
                    />
                  </div>
                </div>

                {/* Tipo (reemplazado por radio buttons) */}
                <div className={styles.field}>
                  <div className="containerLabel">
                    <label>Tipo</label>
                  </div>
                  <div className={styles.inputContainer}>
                    <div className="radio-group">
                      <label className={styles.containerLabelRadioButton}>
                        <input
                          type="radio"
                          name="type"
                          value="casa"
                          checked={item.type === "casa"}
                          onChange={(e) => getInputValue(e)}
                        />
                        Casa
                      </label>
                      <label className={styles.containerLabelRadioButton}>
                        <input
                          type="radio"
                          name="type"
                          value="departamento"
                          checked={item.type === "departamento"}
                          onChange={(e) => getInputValue(e)}
                        />
                        Departamento
                      </label>
                      <label className={styles.containerLabelRadioButton}>
                        <input
                          type="radio"
                          name="type"
                          value="oficina"
                          checked={item.type === "oficina"}
                          onChange={(e) => getInputValue(e)}
                        />
                        Oficina
                      </label>
                      <label className={styles.containerLabelRadioButton}>
                        <input
                          type="radio"
                          name="type"
                          value="terreno"
                          checked={item.type === "terreno"}
                          onChange={(e) => getInputValue(e)}
                        />
                        Terreno
                      </label>
                    </div>
                  </div>
                </div>

                {/* Estado (reemplazado por radio buttons) */}
                <div className={styles.field}>
                  <div className="containerLabel">
                    <label>Estado</label>
                  </div>
                  <div className={styles.inputContainer}>
                    <div className="radio-group">
                      <label className={styles.containerLabelRadioButton}>
                        <input
                          type="radio"
                          name="state"
                          value="venta"
                          checked={item.state === "venta"}
                          onChange={(e) => getInputValue(e)}
                        />
                        Venta
                      </label>
                      <label className={styles.containerLabelRadioButton}>
                        <input
                          type="radio"
                          name="state"
                          value="arriendo"
                          checked={item.state === "arriendo"}
                          onChange={(e) => getInputValue(e)}
                        />
                        Arriendo
                      </label>
                    </div>
                  </div>
                </div>

                <div className={styles.field}>
                  <div className="containerLabel">
                    <label>Metros cuadrados</label>
                  </div>
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      name="mts"
                      value={item.mts}
                      onChange={(e) => getInputValue(e)}
                      className="input"
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <div className="containerLabel">
                    <label>Habitaciones</label>
                  </div>
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      name="bedRooms"
                      value={item.bedRooms}
                      onChange={(e) => getInputValue(e)}
                      className="input"
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <div className="containerLabel">
                    <label>Baños</label>
                  </div>
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      name="bathrooms"
                      value={item.bathrooms}
                      onChange={(e) => getInputValue(e)}
                      className="input"
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <div className="containerLabel">
                    <label>Estacionamientos</label>
                  </div>
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      name="parking"
                      value={item.parking}
                      onChange={(e) => getInputValue(e)}
                      className="input"
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <div className="containerLabel">
                    <label>Vista previa</label>
                  </div>
                  <div className={styles.inputContainer}>
                    <input
                      type="file"
                      name="image"
                      onChange={(e) => getInputValue(e)}
                      className="input"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.field}>
                  <div className="containerLabel">
                    <label>Más imágenes</label>
                  </div>
                  <div className={styles.inputContainer}>
                    <input
                      type="file"
                      name="images"
                      multiple
                      onChange={(e) => getInputValue(e)}
                      style={{borderBottom: "none"}}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <div className="containerLabel">
                    <label>Descripción</label>
                  </div>
                  <div className={styles.inputContainer}>
                    <textarea
                      name="description"
                      rows="4"
                      cols="50"
                      onChange={(e) => getInputValue(e)}
                      value={item.description}
                      className="input"
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <div className={styles.inputContainer}>
                    <input type="submit" value="Crear propiedad" style={{borderBottom: "none"}} />
                  </div>
                </div>
              </>
            )}
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
              setItemSelected={(value) => setItem({ ...item, imageSelected: value.imageSelected })}
            />
          )}
        </div>
      </div>
    </div>
  );
}
