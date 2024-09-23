export const fetchPokemons = async (page: number, limit: number) => {
  const response = await fetch(
    `http://localhost:3001/api/pokemons?limit=${limit}&page=${page}`
  );
  if (!response.ok) {
    throw new Error("Error fetching Pokémon");
  }
  return response.json();
};
