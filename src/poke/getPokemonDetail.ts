// src/poke/getPokemonDetail.ts
import axios from "axios"

export interface PokemonDetail {
  name: string
  height: number
  weight: number
  types: { type: { name: string } }[]
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string
      }
    }
  }
}

export async function getPokemonDetail(url: string): Promise<PokemonDetail> {
  const response = await axios.get(url)
  return response.data
}
