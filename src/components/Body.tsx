// src/components/Body.tsx
"use client"

import React from "react"
import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material"
import { Pokemon } from "@/poke/getPokemons"

interface BodyProps {
  pokemons: Pokemon[]
}

export default function Body({ pokemons }: BodyProps) {
  return (
    <Grid container spacing={3} padding={3}>
      {pokemons.map((pokemon) => {
        const id = pokemon.url.split("/").filter(Boolean).pop()
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

        return (
          <Grid key={pokemon.name} item xs={6} sm={4} md={3} lg={2}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 6px 10px rgba(0,0,0,0.15)",
                border: "3px solid #FFCB05", // borde amarillo estilo Pokédex
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={imageUrl}
                alt={pokemon.name}
                sx={{ objectFit: "contain", padding: 2, backgroundColor: "#f2f2f2" }}
              />
              <CardContent>
                <Typography variant="h6" textAlign="center" textTransform="capitalize">
                  {pokemon.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}
