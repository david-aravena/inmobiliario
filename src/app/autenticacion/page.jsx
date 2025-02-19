"use client"
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; 
import { getGoogleUser } from './utils/getGoogleUser';
import {createUser} from "app/serverless/utils/auth/"
import {loginUser} from 'app/serverless/utils/auth/'
import SpinnerButton from 'app/components/buttonSpinner/'
import styles from './auth.module.css'

export default function Auth(){
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Función para obtener los valores de los inputs sin re-renderizar
  const getInputsForm = () => {
    if (isLogin) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      loginUser(email, password)
        .then((result) => {
          router.push('/propiedades')
          
        })
    } else {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      createUser(email, password)
        .then((result) => {
          router.push('/propiedades')
        })
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => { 
    getInputsForm();
    //Aquí puedes manejar el proceso de login o signup
  };

  const getGoogleForm = async () => {
    try{
      const user = await getGoogleUser();
      router.push('/propiedades')
    } catch(error){
      console.log("getGoogleForm: ", error)
    } 
  };

  return(
    <div className={styles.container}>
      <div className={styles.authContainer}>
      <div className={styles.auth}>
        {isLogin ? (
          <form>
            <div className={styles.field}>
              <div className={styles.containerLabel}>
                <label className={styles.label}>Email</label>
              </div>
              <div>
                <input
                  type="text"
                  className={styles.input}
                  ref={emailRef}
                />
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.containerLabel}>
                <label className={styles.label}>Contraseña</label>
              </div>
              <div>
                <input
                  type="password"
                  className={styles.input}
                  ref={passwordRef}
                />
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.submitContainer}>
                <SpinnerButton onClick={() => handleSubmit()} styles={styles.submit}>
                  <p>Entrar</p>
                </SpinnerButton>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <div className={styles.containerLabel}>
                <label className={styles.label}>Email</label>
              </div>
              <div>
                <input
                  type="text"
                  className={styles.input}
                  ref={emailRef}
                />
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.containerLabel}>
                <label className={styles.label}>Contraseña</label>
              </div>
              <div>
                <input
                  type="password"
                  className={styles.input}
                  ref={passwordRef}
                />
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.submitContainer}>
                <SpinnerButton onClick={() => handleSubmit()} styles={styles.submit}>
                  <p>Crear cuenta</p>
                </SpinnerButton>
              </div>
            </div>
          </form>
        )}

        <div className={styles.socialNetworkButtonsContainer}>
          <SpinnerButton onClick={() => getGoogleForm()} styles={styles.buttonGoogle}>
            <img src="/svg/google-icon.svg" alt="Icono" width={25} height={25} /> 
            <p>Entrar con Google</p>
          </SpinnerButton>
        </div>
        <div className={styles.createAccountContainer}>
          <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}