import React from 'react'
import DisplayPokemon from './components/DisplayPokemon'
import { observer } from 'mobx-react'
import Search from './components/Search'

const App = observer(props => {
  const {
    getPokemons,
    pokemons,
    types,
    changeTypes,
    changeSearch,
    loadingPokemons
  } = props.store
  return (
    <div style={{ textAlign: 'center' }}>
      <Search
        types={types}
        changeTypes={changeTypes}
        changeSearch={changeSearch}
      />
      <DisplayPokemon
        pokemons={pokemons}
        getPokemons={getPokemons}
        loadingPokemons={loadingPokemons}
      />
    </div>
  )
})

export default App
