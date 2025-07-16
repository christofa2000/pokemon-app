"use client"

import { useEffect, useState, useRef } from 'react'
import { getPokemons, Pokemon } from '@/poke/getPokemons'
import { List, ListItem, ListItemText, Avatar, TextField, Typography } from '@mui/material'

function getIdFromUrl(url: string) {
  const parts = url.split('/').filter(Boolean)
  return parts[parts.length - 1]
}

export default function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    getPokemons()
      .then(data => setPokemons(data))
      .finally(() => setLoading(false))
  }, [])

  // Debounce para actualizar búsqueda con delay
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
    }
  }, [search])

  if (loading) return <p>Loading pokemons...</p>

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  return (
    <>
      <TextField
        label="Buscar Pokémon"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filteredPokemons.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No se encontraron pokemons con ese nombre.
        </Typography>
      ) : (
        <List>
          {filteredPokemons.map(pokemon => {
            const id = getIdFromUrl(pokemon.url)
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            return (
              <ListItem key={pokemon.name}>
                <Avatar src={imageUrl} alt={pokemon.name} />
                <ListItemText primary={pokemon.name} />
              </ListItem>
            )
          })}
        </List>
      )}
    </>
  )
}
