"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function ButtonsNavbar({styles}){

  const router = useRouter();

  const authRedirect = () => {
    router.push('/autenticacion');
  }
 
  return(
    <>
      <div className={styles.authContainer}>
        <Link href="/autenticacion">
          <p>Iniciar Sesion</p>
        </Link>
      </div>
      <div className={styles.publishPropertyContainer}>
        <Link href="/autenticacion">
          <p>Publicar Propiedad</p>
        </Link>
      </div>

      <div className={styles.smallScreenNavbar} onClick={() => authRedirect()}>
        <img className={styles.icons} src="/svg/menu.svg" alt="logo menu" width={35} height={35} />
        <div style={{background:"#ffd35a", borderRadius:"100px", fontSize:"20rem"}}>
          <img className={styles.icons} src="/svg/login.svg" alt="logo menu" width={30} height={45} />
        </div>
      </div>
    </>
  )
}