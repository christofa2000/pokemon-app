"use client"

import React, { useEffect, useState } from "react"
import { getPokemons, Pokemon } from "@/poke/getPokemons"
import Header from "@/components/Header"
import Body from "@/components/Body"

export default function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    getPokemons().then(setPokemons)
  }, [])

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Body pokemons={filteredPokemons} />
    </>
  )
}
