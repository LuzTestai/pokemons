import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],
  theme: {
    extend: {
      tokens: {
        colors: {
          grass: {
            100: { value: "#a8e6a1" },
            500: { value: "#78c850" },
            700: { value: "#4f772d" },
          },
          fire: {
            100: { value: "#ffd1a1" },
            500: { value: "#ff8000" },
            700: { value: "#cc6700" },
          },
          water: {
            100: { value: "#a0e7ff" },
            500: { value: "#6890f0" },
            700: { value: "#497bb1" },
          },
          electric: {
            100: { value: "#fff9b0" },
            500: { value: "#f8d030" },
            700: { value: "#c4a826" },
          },
          psychic: {
            100: { value: "#fdb9fc" },
            500: { value: "#f85888" },
            700: { value: "#c14666" },
          },
          ice: {
            100: { value: "#d0f1ff" },
            500: { value: "#98d8d8" },
            700: { value: "#6fa4a4" },
          },
          rock: {
            100: { value: "#d1c0a5" },
            500: { value: "#b8a038" },
            700: { value: "#7f5f2c" },
          },
          ground: {
            100: { value: "#e7c091" },
            500: { value: "#e0c068" },
            700: { value: "#9b6e2f" },
          },
          poison: {
            100: { value: "#d5a6d6" },
            500: { value: "#a040a0" },
            700: { value: "#6d2f6d" },
          },
          ghost: {
            100: { value: "#c5a3d1" },
            500: { value: "#705898" },
            700: { value: "#4a3d6b" },
          },
          bug: {
            100: { value: "#c6dba8" },
            500: { value: "#a8b820" },
            700: { value: "#6d7d15" },
          },
          dragon: {
            100: { value: "#f5c17b" },
            500: { value: "#7038f8" },
            700: { value: "#5028b0" },
          },
          steel: {
            100: { value: "#d1d1e0" },
            500: { value: "#b8b8d0" },
            700: { value: "#868686" },
          },
          fighting: {
            100: { value: "#e9b79a" },
            500: { value: "#c03028" },
            700: { value: "#8f241e" },
          },
          fairy: {
            100: { value: "#f4c7e1" },
            500: { value: "#ee99ac" },
            700: { value: "#b6687a" },
          },
          dark: {
            100: { value: "#a099a5" },
            500: { value: "#705848" },
            700: { value: "#4d3c33" },
          },
          flying: {
            100: { value: "#b3d0f7" },
            500: { value: "#a890f0" },
            700: { value: "#7762b2" },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
