// src/components/Header.tsx
"use client"

import React from "react"
import { TextField, InputAdornment, AppBar, Toolbar, Typography } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

interface HeaderProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export default function Header({ searchTerm, onSearchChange }: HeaderProps) {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#FFCB05", color: "#2A75BB" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" fontWeight="bold">
          Pokédex
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Buscar Pokémon"
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          size="small"
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            width: { xs: "60%", sm: "40%", md: "30%" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Toolbar>
    </AppBar>
  )
}
