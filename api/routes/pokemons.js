// routes/pokemon.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

// Ruta para obtener datos de un Pokémon desde la PokéAPI
router.get("/", async (req, res) => {
  const numberPokemons = req.query.limit || 10;

  try {
    // Hacer la solicitud a la PokéAPI usando axios
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${numberPokemons}&offset=0`
    );

    // Enviar la respuesta JSON de la PokéAPI al cliente
    res.json(response.data);
  } catch (error) {
    // Manejar errores en caso de que la API falle
    res.status(500).json({ error: "Error fetching data from PokéAPI" });
  }
});

module.exports = router;
