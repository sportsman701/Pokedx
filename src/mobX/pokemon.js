import { action, computed, decorate, observable, runInAction } from 'mobx'
import axios from 'axios'

class Pokemon {
  limit = 100
  searchValue = ''
  data = []
  get pokemons() {
    return this.data.filter(pok => {
      const filter = this.filterTypes
      const search = this.searchValue.toLowerCase()
      if (filter.length && search !== '') {
        return filter.includes(pok.type) && pok.name.indexOf(search) !== -1
      } else if (filter.length) {
        return filter.includes(pok.type)
      } else if (search !== '') {
        return pok.name.indexOf(search) !== -1
      } else {
        return true
      }
    })
  }
  types = [
    'normal',
    'poison',
    'fire',
    'water',
    'electric',
    'fighting',
    'ground',
    'psychic',
    'dark',
    'rock',
    'steel',
    'grass',
    'ice',
    'flying',
    'bug',
    'ghost',
    'dragon',
    'fairy'
  ]
  loadingPokemons = false
  filterTypes = []
  changeTypes = (types = this.types) => {
    this.filterTypes = types
  }
  changeSearch = (value = '') => {
    this.searchValue = value
  }
  getPokemons = async () => {
    this.loadingPokemons = true
    const pokemons = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=${this.limit}`
    )
    const data = await Promise.all(
      pokemons.data.results.map(async pokemon => {
        const id = pokemon.url.match(/pokemon\/(\d+)/)[1]
        const info = await axios
          .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
          .then(res => res.data)
        const sprite = info.sprites.front_default || ''
        const type = info.types[0].type.name || 'fire'
        const stats = info.stats.map(stat => {
          const baseStat = stat.base_stat
          const name = stat.stat.name
          return [baseStat, name]
        })
        return { ...pokemon, id, sprite, type, info, stats }
      })
    )
    runInAction(() => {
      this.data = data
      this.loadingPokemons = false
    })
  }
}

decorate(Pokemon, {
  searchValue: observable,
  limit: observable,
  data: observable,
  filterTypes: observable,
  changeTypes: action,
  changeSearch: action,
  loadingPokemons: observable,
  pokemons: computed,
  getPokemons: action.bound
})

export default new Pokemon()
