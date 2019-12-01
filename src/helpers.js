export const getColor = type => {
  const color = {
    normal: '#A8A878',
    poison: '#A040A0',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    fighting: '#C03028',
    ground: '#E0C068',
    psychic: '#F85888',
    dark: '#6E5647',
    rock: 'rgb(184,160,56)',
    steel: 'rgb(184,184,208)',
    grass: 'rgb(120,200,80)',
    ice: 'rgb(152,216,216)',
    flying: 'rgb(168,144,240)',
    bug: 'rgb(168,184,32)',
    ghost: 'rgb(112,88,152)',
    dragon: 'rgb(112,56,248)',
    fairy: 'rgb(240, 182, 188)'
  }
  return color[type] || '#C03028'
}
