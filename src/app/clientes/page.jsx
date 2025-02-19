"use client"
import { useEffect, useState } from 'react'
import CreateClient from './components/createClient/CreateClient'
import List from 'app/components/list/'
import useAuth from 'app/utils/user/useAuth'
import {getUserItems} from 'app/serverless/utils/db/'
import CardClientUI from 'app/components/cardUI/CardClientUI'
import FilterClient from 'app/components/filters/FilterClient'
import EditClient from 'app/app/clientes/components/editClient/EditClient'
import {saveItemsWithFiles} from './utils/saveItemsWithFiles'

export default function Clients(){
  const [session, setSession] = useState(null)
  const [isCreateClient, setIsCreateClient] = useState(false)
  const user = useAuth();

  const getNewClient = (item) => {
    saveItemsWithFiles({...item, user: user.uid})
  }

  const obj = {
    type: "", 
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
          {isCreateClient ?
            <>
              <button onClick={() => setIsCreateClient(false)}>Lista de clientes</button>
              <CreateClient submit={(data) => getNewClient(data)} />
            </>
          :
            <>
              <div>
                <button onClick={() => setIsCreateClient(true)}>Crear cliente</button>
              </div>
              <List 
                getItems={() => getUserItems("clients", session.uid)}
                filter={(styles, setResult) => <FilterClient styles={styles} setResult={(result) => setResult(result) } obj={obj} />}
                CardUI={CardClientUI}
                ModalUI={EditClient} 
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