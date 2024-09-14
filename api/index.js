// index.js
const express = require("express");
const pokemonRoutes = require("./routes/pokemons"); // Importar las rutas de Pokémon
const app = express();
const cors = require("cors");

app.use(cors()); // Habilitar CORS para todas las rutas
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Permitir solo este dominio
//   })
// );

// Usar las rutas de Pokémon en /api/pokemons
app.use("/api/pokemons", pokemonRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API backend running on port ${PORT}`);
});
