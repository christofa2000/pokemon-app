// src/poke/getPokemons.ts
import axios from "axios"

export interface Pokemon {
  name: string
  url: string
}

export async function getPokemons(): Promise<Pokemon[]> {
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")
  return response.data.results
}
