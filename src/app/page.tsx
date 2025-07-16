"use client"

import './globals.css'
import React, { useEffect, useState } from "react"
import { getPokemons, Pokemon } from "@/poke/getPokemons"
import { getPokemonDetail } from "@/poke/getPokemonDetail"
import { PokemonDetail } from "@/poke/PokemonDetail"

import {
  Box,
  Container,
  Grid,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import Header from "@/components/Header"  // <-- Importá el header

export default function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [search, setSearch] = useState("")
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([])
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [loadingDetail, setLoadingDetail] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const allPokemons = await getPokemons()
      setPokemons(allPokemons)
      setFilteredPokemons(allPokemons)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const filtered = pokemons.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredPokemons(filtered)
  }, [search, pokemons])

  const handleCardClick = async (url: string) => {
    setLoadingDetail(true)
    const detail = await getPokemonDetail(url)
    setSelectedPokemon(detail)
    setOpenModal(true)
    setLoadingDetail(false)
  }

  const handleClose = () => {
    setOpenModal(false)
    setSelectedPokemon(null)
  }

  return (
    <Box>
      {/* Usamos el header importado y pasamos el estado de búsqueda */}
      <Header searchTerm={search} onSearchChange={setSearch} />

      {/* Grid de cartas */}
      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {filteredPokemons.map(pokemon => (
            <Grid item xs={12} sm={6} md={3} key={pokemon.name}>
              <Card
                onClick={() => handleCardClick(pokemon.url)}
                sx={{
                  cursor: "pointer",
                  border: "4px solid #FFCC00",
                  transition: "transform 0.2s",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(8px)",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" textAlign="center" textTransform="capitalize">
                    {pokemon.name}
                  </Typography>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                      pokemon.url.split("/")[6]
                    }.png`}
                    alt={pokemon.name}
                    sx={{ objectFit: "contain", padding: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Modal de detalle */}
      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            border: "4px solid #FFCC00",
            borderRadius: 4,
            boxShadow: 24,
            p: 4,
            width: 300,
            textAlign: "center",
          }}
        >
          {loadingDetail || !selectedPokemon ? (
            <Typography>Cargando...</Typography>
          ) : (
            <>
              <Typography variant="h5" textTransform="capitalize">
                {selectedPokemon.name}
              </Typography>
              <img
                src={selectedPokemon.sprites.other["official-artwork"].front_default}
                alt={selectedPokemon.name}
                style={{ width: "100%", marginTop: 10 }}
              />
              <Typography mt={2}>Altura: {selectedPokemon.height}</Typography>
              <Typography>Peso: {selectedPokemon.weight}</Typography>
              <Typography>
                Tipo:{" "}
                {selectedPokemon.types.map(t => t.type.name).join(", ")}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  )
}
