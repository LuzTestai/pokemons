const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const pokemonId = req.params.id;

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    const pokemonData = response.data;

    const pokemonDetails = {
      id: pokemonData.id,
      name: pokemonData.name,
      type: pokemonData.types.map((type) => type.type.name),
      moves: pokemonData.moves.slice(0, 2).map((move) => move.move.name),
      height: `${pokemonData.height / 10} m`,
      weight: `${pokemonData.weight / 10} kg`,
      description: "",
      image: pokemonData.sprites.front_default,
    };

    const speciesResponse = await axios.get(pokemonData.species.url);
    const speciesData = speciesResponse.data;

    const descriptionObj = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    if (descriptionObj) {
      pokemonDetails.description = descriptionObj.flavor_text.replace(
        /[\n\f]/g,
        " "
      );
    }

    res.json(pokemonDetails);
  } catch (error) {
    console.error("Error fetching Pokémon details:", error.message);
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: "Pokémon not found" });
    } else {
      res.status(500).json({ error: "Error fetching Pokémon data" });
    }
  }
});

module.exports = router;
