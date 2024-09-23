const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) || 12;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const pokemonList = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.trim().replace(/\/$/, "").split("/");
      const id = urlParts[urlParts.length - 1];
      return {
        id: id,
        name: pokemon.name,
        url: pokemon.url,
      };
    });
    const totalPokemons = response.data.count;

    const pokemonDetailsPromises = pokemonList.map(async (pokemon) => {
      const pokemonDetailResponse = await axios.get(pokemon.url);
      const types = pokemonDetailResponse.data.types.map(
        (typeInfo) => typeInfo.type.name
      );
      const image = pokemonDetailResponse.data.sprites.front_default;

      return {
        id: pokemon.id,
        name: pokemon.name,
        url: pokemon.url,
        types: types,
        image: image,
      };
    });
    const enrichedPokemonList = await Promise.all(pokemonDetailsPromises);

    res.json({
      pokemons: enrichedPokemonList,
      currentPage: page,
      totalPages: Math.ceil(totalPokemons / limit),
      totalPokemons: totalPokemons,
    });
  } catch (error) {
    console.error("Error fetching Pokémon:", error.message);
    res.status(500).json({ error: "Error fetching Pokémon data" });
  }
});

router.get("/pokemons/:name", async (req, res) => {
  const pokemonName = req.params.name.toLowerCase();

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const pokemonData = response.data;
    const types = pokemonData.types.map((typeInfo) => typeInfo.type.name);

    res.json({ types });
  } catch (error) {
    console.error("Error fetching Pokémon:", error.message);
    res.status(404).json({ error: "No se encontró el Pokémon" });
  }
});

module.exports = router;
