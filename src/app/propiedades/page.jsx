"use client"
import { useEffect, useState } from 'react';
import CreateProperty from './components/createProperty/CreateProperty'
import List from 'app/components/list/'
import Filter from 'app/components/filters/filterProperties'
import CardPropertyUI from 'app/components/ui/cardProperty/CardPropertyUI'
import EditModalProperty from 'app/components/modal/properties/EditModalProperty'
import {getUserItems} from 'app/serverless/utils/db/'
import {saveProperty} from 'app/utils/saveItems/createProperty'
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
    <div style={{maxWidth:"1440px", height: "calc(100vh - 117px)", margin:"auto"}}>
      {session ?
        <>
          {isCreateProperty ?
            <>
              <CreateProperty submit={(data) => getNewProperty(data)} buttonBack={<button className="button" onClick={() => setIsCreateProperty(false)}>Lista de propiedades</button>} />
            </>
          :
            <>
              <List 
                getItems={() => getUserItems("properties", session.uid)}
                filter={(styles, setResult) => <Filter styles={styles} setResult={(result) => setResult(result) } obj={obj} />}
                CardUI={CardPropertyUI}
                ModalUI={EditModalProperty}
                createItem={<button className="button" onClick={() => setIsCreateProperty(true)}>Crear propiedad</button>} 
              />
            </>
          }
        </>
      :
        <p>No hay respuesta del servidor</p>
      }
    </div>
  )
}