"use client"
import List from 'app/components/list/'
import {getCollection} from "app/serverless/utils/db/"
import Filter from 'app/components/filter/'
import CardPropertyUI from 'app/components/cardUI/CardPropertyUI'
import ModalProperty from './ModalHomeUI'

export default function ListProperties(){

  const obj = {
    ubication: '',
    type: '',
    state: '',
    condition: ''
  }

  return(
    <List 
      getItems={() => getCollection("properties", 10)}
      filter={(styles, setResult) => <Filter styles={styles} setResult={(result) => setResult(result) } obj={obj} />}
      CardUI={CardPropertyUI}
      ModalUI={ModalProperty} 
    />
  )
}