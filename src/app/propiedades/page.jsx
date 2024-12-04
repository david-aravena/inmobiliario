"use client"
import { useEffect, useState } from 'react';
import CreateProperty from './components/createProperty/CreateProperty'
import List from 'app/components/list/'
import Filter from 'app/components/filter/'
import CardPropertyUI from 'app/components/cardUI/CardPropertyUI'
import ModalProperty from 'app/components/modal/properties/ModalPropertyUI'
import {getUserItems} from 'app/serverless/utils/db/'
import {saveProperty} from './utils/createProperty'
import useAuth from 'app/utils/user/useAuth';

export default function Properties(){

  const [session, setSession] = useState(null)
  const [isCreateProperty, setIsCreateProperty] = useState(false)
  const user = useAuth();

  const getNewProperty = (item) => {
    saveProperty({...item, user: user.uid}, item.images)
  }

  const obj = {
    ubication: '',
    type: '',
    state: '',
    condition: '',
    user: session?.uid
  }

  useEffect(() => {
    if(user){
      setSession({uid: user.uid})
    }
  }, [user])

  return(
    <>
      {session ?
        <>
          {isCreateProperty ?
            <>
              <button onClick={() => setIsCreateProperty(false)}>Lista de propiedades</button>
              <CreateProperty submit={(data) => getNewProperty(data)} />
            </>
          :
            <>
              <div>
                <button onClick={() => setIsCreateProperty(true)}>Crear propiedad</button>
              </div>
              <List 
                getItems={() => getUserItems("properties", session.uid)}
                filter={(styles, setResult) => <Filter styles={styles} setResult={(result) => setResult(result) } obj={obj} />}
                CardUI={CardPropertyUI}
                ModalUI={ModalProperty} 
              />
            </>
          }
        </>
      :
        <p>No hay respuesta del servidor</p>
      }
    </>
  )
}