// src/poke/PokemonDetail.ts
export interface PokemonDetail {
  id: number
  name: string
  height: number
  weight: number
  types: {
    slot: number
    type: {
      name: string
    }
  }[]
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string
      }
    }
  }
}


