import React, { useEffect, useState } from 'react'
import PokemonThumb from './components/PokemonThumbnail'
//import TextField from "@mui/material/TextField";

const App = () => {

   const[allPokemons, setAllPokemons] = useState([])
   const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=150')
   const [Searchterm, setSearchterm]=useState('')

  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)

    function createPokemonObject(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()
        setAllPokemons( currentList => [...currentList, data])
        await allPokemons.sort((a, b) => a.id - b.id)
      })
    }
    createPokemonObject(data.results)
  }

 useEffect(() => {
  getAllPokemons()
 }, [])

  return (
    <div className="app-container">
      <h1>Pokemon Evolution</h1>
    <input type="text" placeholder="Search.."  onChange={event => {setSearchterm(event.target.value)}}></input>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.filter((pokemonStats)=>{
            if (Searchterm ===''){
              return pokemonStats
            }
            else if(pokemonStats.name[0].toLowerCase().includes(Searchterm.toLowerCase())){
              return pokemonStats
            }
          }).map( (pokemonStats, index) => 
            <PokemonThumb
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />)}
          
        </div>
      </div>
    </div>
  )
}

export default App;