import { action, computed, decorate, observable, runInAction } from 'mobx'
import axios from 'axios'
import notFound from '../images/220px-No_image_available.svg.png'

class Pokemon {
  total = 964
  customPagination = ['10', '20', '50']
  get limit() {
    return (this.currentPage - 1) * this.pageSize
  }
  loadingPokemons = false
  loadingInfoPok = false
  showModal = false
  pokemonExist = true
  modalData = []
  data = []
  currentPage = 1
  pageSize = 10
  setPagination = (current, size) => {
    this.currentPage = current
    this.pageSize = size
    return this.getPokemons()
  }
  type = 'any'
  get pokemonUrl() {
    if (this.type !== 'any') {
      // currently pokeapi.co does not support pagination for type
      return `https://pokeapi.co/api/v2/type/${this.type}/?${'offset=' +
        this.limit +
        '&' +
        'limit=' +
        this.pageSize}`
    } else {
      return `https://pokeapi.co/api/v2/pokemon/?${'offset=' +
        this.limit +
        '&' +
        'limit=' +
        this.pageSize}`
    }
  }
  changeType = type => {
    this.type = type
    return this.getPokemons()
  }
  searchPokemon = async searchValue => {
    try {
      const pokemon = await axios
        .get(
          `https://pokeapi.co/api/v2/pokemon/${searchValue
            .toLowerCase()
            .trim()}/`
        )
        .then(res => res.data)
      runInAction(() => {
        this.modalData = {
          ...pokemon,
          sprite: pokemon.sprites.front_default || notFound,
          type: pokemon.types.map((type, i) => {
            type = type.type.name
            let name = ''
            if (i === 0) {
              name = 'Main type'
            } else {
              name = 'Additional type'
            }
            return [type, name]
          }),
          stats: pokemon.stats.map(stat => {
            const baseStat = stat.base_stat
            const name = stat.stat.name
            return [baseStat, name]
          })
        }
        if (this.modalData.type.length === 1) {
          this.modalData.type[1] = ['none', 'Additional type']
        }
        this.pokemonExist = true
        this.showModal = true
      })
    } catch (e) {
      this.pokemonExist = false
    }
  }
  handleModalOk = () => {
    this.showModal = false
  }
  get pokemons() {
    return this.data
  }
  getPokemons = async (url = this.pokemonUrl) => {
    // with searchValue
    this.loadingPokemons = true
    let pokemons = await axios.get(url)

    this.total = pokemons.data.count || pokemons.data.pokemon.length
    if (pokemons.data.results) {
      pokemons = pokemons.data.results
    } else {
      pokemons = pokemons.data.pokemon
    }
    runInAction(async () => {
      this.data = pokemons.map(pok => {
        const id = (pok.url || pok.pokemon.url).match(/pokemon\/(\d+)\//)[1]
        const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        const name = pok.name || pok.pokemon.name
        return { ...pok, name, id, sprite }
      })
      this.loadingPokemons = false
      if (this.data.length) {
        this.loadingInfoPok = true
        this.data = await Promise.all(
          this.data.map(async pok => {
            const info = await axios
              .get(`https://pokeapi.co/api/v2/pokemon/${pok.id}/`)
              .then(res => res.data)
            let sprite = pok.sprite
            try {
              await axios.get(sprite)
              sprite = info.sprites.front_default
            } catch (e) {
              sprite = notFound
            }
            const type = info.types.map((type, i) => {
              let name = ''
              if (i === 0) {
                name = 'Main type'
              } else {
                name = 'Additional type'
              }
              return [type.type.name, name]
            })
            if (type.length === 1) {
              type[1] = ['none', 'Additional type']
            }
            const stats = info.stats.map(stat => {
              const baseStat = stat.base_stat
              const name = stat.stat.name
              return [baseStat, name]
            })
            return { ...pok, sprite, type, info, stats }
          })
        )
        this.loadingInfoPok = false
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
    'fairy',
    'any'
  ]
}

decorate(Pokemon, {
  total: observable,
  loadingPokemons: observable,
  loadingInfoPok: observable,
  types: observable,
  customPagination: observable,
  limit: computed,
  currentPage: observable,
  searchPokemon: action,
  pageSize: observable,
  getPokemons: action.bound,
  pokemonUrl: computed,
  nextPage: action,
  data: observable,
  changeType: action,
  pokemons: computed,
  showModal: observable,
  handleModalOk: action,
  modalData: observable,
  pokemonExist: observable
})

export default new Pokemon()
