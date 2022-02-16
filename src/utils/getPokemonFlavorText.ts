import { IPokemonSpecies } from "types/index";

const getPokemonFlavorText = (pokemonSpecies: IPokemonSpecies): string => {
  const englishText = pokemonSpecies.flavor_text_entries.find(
    (item) => item.language.name === "en"
  );

  return englishText
    ? englishText.flavor_text
        .replace("\f", " ")
        .split("POKéMON")
        .join("Pokémon")
    : "Flavor Text Not Found";
};

export default getPokemonFlavorText;
