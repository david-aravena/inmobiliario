import { useState } from "react"
import Image from "next/image"
import CardClientUI from "app/components/cardUI/CardClientUI"
import ModalClient from "app/modal/ModalClientsUI"
// import styles from "./createProperty.module.css";
import styles from 'app/components/list/css/list.module.css'

export default function CreateClient({ submit }) {
  const [isMakePreview, setIsMakePreview] = useState(true);
  const [item, setItem] = useState({
    email: "",
    name: "",
    phone: "",
    type:"",
    ubication: "",
    imagePreview: "",
    files: [],
    imageSelected: "",
    comments: ""
  });

  const getInputValue = (e) => {
    const { name, value, files } = e.target;

    if (name === "files" && files.length > 0) {
      const newFiles = Array.from(files).map((file) => file);
      setItem((prevItem) => ({
        ...prevItem,
        files: [...prevItem.files, ...newFiles],
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
    <div className={styles.createPropertyContainer}>
      <div className={styles.formCreatePropertyContainer}>
        <form onSubmit={handleSubmit}>
          {isMakePreview ? (
            <>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <label>email</label>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    name="email"
                    value={item.email}
                    onChange={(e) => getInputValue(e)}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <label>Nombre</label>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={(e) => getInputValue(e)}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <label>Fono</label>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    name="phone"
                    value={item.phone}
                    onChange={(e) => getInputValue(e)}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <label>Tipo</label>
                </div>
                <div className={styles.inputContainer}>
                  <select
                    name="type"
                    value={item.type}
                    onChange={(e) => getInputValue(e)}
                  >
                    <option value="">Tipo</option>
                    <option value="comprador">Comprador</option>
                    <option value="vendedor">Vendedor</option>
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <label>Ubicacion</label>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    name="ubication"
                    value={item.ubication}
                    onChange={(e) => getInputValue(e)}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <label>Archivos</label>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type="file"
                    name="files"
                    multiple
                    onChange={(e) => getInputValue(e)}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <label>Comentarios</label>
                </div>
                <div className={styles.inputContainer}>
                  <textarea
                    name="comments"
                    rows="4"
                    cols="50"
                    onChange={(e) => getInputValue(e)}
                    value={item.comments}
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
          <CardClientUI styles={styles} item={item}>
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
          </CardClientUI>
        ) : (
          <ModalClient
            itemSelected={item}
            setItemSelected={(value) => setItem({...item, imageSelected: value.imageSelected})}
          />
        )}
      </div>
    </div>
  );
}
