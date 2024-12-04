import Link from 'next/link'
import ButtonsNavbar from './components/buttons/ButtonsNavbar'
import styles from './navbar.module.css'

export default function Navbar(){
  
  return(
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <img src="/images/inmobiliarioLogo.png" alt="Descripción de la imagen" width={117} height={117} style={{objectFit: "cover"}} />
        </Link>
      </div>
      <div className={styles.buttonsContainer}>
        <ButtonsNavbar styles={styles}/>
      </div>
    </nav>
  )
}