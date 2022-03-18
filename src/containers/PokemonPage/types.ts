import { INameURL, IPokemonData, IPokemonSpecies } from "types/index";

export type PokemonPageProps = {
  genders: string[];
  pokemonData: IPokemonData;
  evolutionPokemons: INameURL[];
  pokemonSpecies: IPokemonSpecies;
};
