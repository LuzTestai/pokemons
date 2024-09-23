// index.js
const express = require("express");
const pokemonRoutes = require("./routes/pokemons"); // Importar las rutas de Pokémon
const authRoutes = require("./routes/auth");
const detailPokemon = require("./routes/detail");
const app = express();
const cors = require("cors");

app.use(cors()); // Habilitar CORS para todas las rutas
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Permitir solo este dominio
//   })
// );

// Middleware
app.use(cors()); // Permitir solicitudes de frontend
app.use(express.json()); // Para manejar JSON en el body

// Rutas
app.use("/api/auth", authRoutes);
// Usar las rutas de Pokémon en /api/pokemons
app.use("/api/pokemons", pokemonRoutes);
app.use("/api/pokemon", detailPokemon);

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API backend running on port ${PORT}`);
});
