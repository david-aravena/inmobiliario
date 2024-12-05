import styles from "./page.module.css"
import Banner from 'app/components/banner/'
import ListProperties from './components/listProperties/'

export default function Home() {
  return (
    <div style={{position:"relative"}}>
      <div className={styles.homeContainer}>
        <div className={styles.bannerContainer}>
          <Banner notices={[
            "https://firebasestorage.googleapis.com/v0/b/inmobiliario-e6a3e.appspot.com/o/banners%2Fabstract-blue-banner-with-transparent-lines-effect_1017-28378.avif?alt=media&token=cb5bbcc6-39ef-4a17-b1a4-165832611b65",
            "https://firebasestorage.googleapis.com/v0/b/inmobiliario-e6a3e.appspot.com/o/banners%2Ffondo-banner-ola-negocio-creativo-azul-abstracto_1035-18955.avif?alt=media&token=a5be21c6-54d9-4444-a48a-2340bad44c1e,",
            "https://firebasestorage.googleapis.com/v0/b/inmobiliario-e6a3e.appspot.com/o/banners%2Ffondo-diseno-banner-ancho-azul-redes-digitales-diseno-banner-3d-abstracto-fondo-geometrico-tecnologia-azul-oscuro-ilustracion-vectorial_181182-27921.avif?alt=media&token=61f07218-2b36-49ed-a324-36771c7bd43b",
            "https://firebasestorage.googleapis.com/v0/b/inmobiliario-e6a3e.appspot.com/o/banners%2Ffondo-vector-banner-onda-azul-fluido-abstracto_561505-3.avif?alt=media&token=02ba6ea3-c10e-4e0d-b185-f93fc15c5fb6"
          ]} />
        </div>

        <ListProperties />
      </div>
    </div>
  );
}