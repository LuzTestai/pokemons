const express = require("express");
const axios = require("axios");
const router = express.Router();

// Ruta para obtener la lista de Pokémon con paginación
router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) || 12; // Número de Pokémon por página
  const page = parseInt(req.query.page) || 1; // Número de página actual
  const offset = (page - 1) * limit; // Calcular el desplazamiento

  try {
    // Llamada inicial a la API para obtener la lista de Pokémon
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const pokemonList = response.data.results;
    const totalPokemons = response.data.count; // Total de Pokémon disponibles en la API

    // Hacer una llamada a la API de cada Pokémon para obtener más detalles
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

    // Devolver la lista enriquecida de Pokémon y la información de paginación
    res.json({
      pokemons: enrichedPokemonList,
      currentPage: page,
      totalPages: Math.ceil(totalPokemons / limit), // Calcula el número total de páginas
      totalPokemons: totalPokemons, // Devolver el total de Pokémon disponibles
    });
  } catch (error) {
    console.error("Error fetching Pokémon:", error.message);
    res.status(500).json({ error: "Error fetching Pokémon data" });
  }
});

// Ruta para obtener los tipos de un Pokémon dado su nombre
router.get("/pokemons/:name", async (req, res) => {
  const pokemonName = req.params.name.toLowerCase(); // Obtener el nombre del Pokémon

  try {
    // Llamada a la API de PokéAPI
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const pokemonData = response.data;

    // Extraer los tipos del Pokémon
    const types = pokemonData.types.map((typeInfo) => typeInfo.type.name);

    // Devolver los tipos
    res.json({ types });
  } catch (error) {
    console.error("Error fetching Pokémon:", error.message);
    res.status(404).json({ error: "No se encontró el Pokémon" });
  }
});

module.exports = router;
