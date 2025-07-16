import { PokemonDetail } from "./PokemonDetail"

export async function getPokemonDetail(url: string): Promise<PokemonDetail> {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Error al obtener detalles del Pokémon")
  return res.json()
}
