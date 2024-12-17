"use client"
import List from 'app/components/list/'
import {getProperties} from "app/serverless/utils/db/"
import FilterProperties from 'app/components/filters/filterProperties'
import CardPropertyUI from 'app/components/ui/cardProperty/CardPropertyUI'
import ShowDetailsProperties from 'app/components/showDetails/showDetailsProperties/'

export default function ListProperties(){

  return(
    <List 
      getItems={() => getProperties()}
      filter={(setResult) => <FilterProperties setResult={(result) => setResult(result) } />}
      CardUI={CardPropertyUI}
      ShowDetails={ShowDetailsProperties} 
    />
  )
}