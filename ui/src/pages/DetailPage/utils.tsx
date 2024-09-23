import { useQuery } from "@tanstack/react-query";

const fetchPokemonDetails = async (id: string) => {
  const response = await fetch(`http://localhost:3001/api/pokemon/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const usePokemonDetails = (id: string) => {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => fetchPokemonDetails(id),
  });
};
