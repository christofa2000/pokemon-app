export interface Pokemon {
  name: string
  url: string
}

export async function getPokemons(): Promise<Pokemon[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  if (!res.ok) throw new Error("Error al obtener los Pokémon")
  const data = await res.json()
  return data.results
}
