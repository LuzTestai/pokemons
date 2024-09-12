// index.js
const express = require("express");
const pokemonRoutes = require("./routes/pokemon"); // Importar las rutas de Pokémon
const app = express();

// Usar las rutas de Pokémon en /api/pokemon
app.use("/api/pokemon", pokemonRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API backend running on port ${PORT}`);
});
