// routes/pokemon.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
// const limit = req.query.limit || 10; // Obtener el límite de la consulta

// Ruta para obtener la lista de Pokémon y enriquecerla con los tipos y la imagen
router.get("/", async (req, res) => {
  const limit = req.query.limit || 10; // Obtener el límite de la consulta

  try {
    // Llamada inicial a la API para obtener la lista de Pokémon
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`
    );
    const pokemonList = response.data.results;

    // Hacer una llamada a la API de cada Pokémon para obtener más detalles, como el tipo y la imagen
    const pokemonDetailsPromises = pokemonList.map(async (pokemon) => {
      const pokemonDetailResponse = await axios.get(pokemon.url); // Llamada a la URL del Pokémon individual
      const types = pokemonDetailResponse.data.types.map(
        (typeInfo) => typeInfo.type.name
      ); // Extraer los tipos
      const image = pokemonDetailResponse.data.sprites.front_default; // Obtener la imagen (sprite)

      return {
        name: pokemon.name,
        url: pokemon.url,
        types: types, // Añadir los tipos al resultado
        image: image, // Añadir la imagen al resultado
      };
    });

    // Esperar a que todas las promesas se resuelvan
    const enrichedPokemonList = await Promise.all(pokemonDetailsPromises);

    // Enviar la lista de Pokémon enriquecida con los tipos y la imagen
    res.json(enrichedPokemonList);
  } catch (error) {
    console.error("Error fetching Pokémon:", error.message);
    res.status(500).json({ error: "Error fetching Pokémon data" });
  }
});

// Ruta para obtener los tipos de un Pokémon dado su nombre
router.get("/:name", async (req, res) => {
  const pokemonName = req.params.name.toLowerCase(); // Obtener el nombre del Pokémon de los parámetros de la URL

  try {
    // Llamada a la API de PokéAPI usando Axios
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const pokemonData = response.data;

    // Extraer el/los tipos del Pokémon
    const types = pokemonData.types.map((typeInfo) => typeInfo.type.name);

    // Enviar los tipos de vuelta al cliente
    res.json({ types });
  } catch (error) {
    console.error("Error fetching Pokémon:", error.message);
    res.status(404).json({ error: "No se encontró el Pokémon" });
  }
});

module.exports = router;
