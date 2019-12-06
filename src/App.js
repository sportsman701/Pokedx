import React from 'react'
import DisplayPokemon from './components/DisplayPokemon'
import { observer } from 'mobx-react'
import Search from './components/Search'
import ModalPokemon from './components/ModalSearchPokemon'

const App = observer(props => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Search props={props.store} />
      <DisplayPokemon props={props.store} />
      <ModalPokemon props={props.store} />
    </div>
  )
})

export default App
