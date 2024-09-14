export type PokemonType =
  | "grass"
  | "fire"
  | "water"
  | "electric"
  | "psychic"
  | "ice"
  | "rock"
  | "ground"
  | "poison"
  | "ghost"
  | "bug"
  | "dragon"
  | "steel"
  | "fighting"
  | "fairy"
  | "dark"
  | "flying";

export const typeColorMap: Record<PokemonType, string> = {
  grass: "#67f257",
  fire: "#f9ab5a",
  water: "#56d4ff",
  electric: "#fbee53",
  psychic: "#fdb9fc",
  ice: "#d0f1ff",
  rock: "#d1c0a5",
  ground: "#eab16b",
  poison: "#dc8add",
  ghost: "#c58fd8",
  bug: "#c279db",
  dragon: "#fbba62",
  steel: "#bebee1",
  fighting: "#e8a37b",
  fairy: "#f4acd5",
  dark: "#a099a5",
  flying: "#87b8fb",
};
