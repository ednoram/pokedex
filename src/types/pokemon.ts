export enum PokemonGenderEnum {
  MALE = "male",
  FEMALE = "female",
}

export type PokemonStatName =
  | "hp"
  | "speed"
  | "attack"
  | "defense"
  | "special-attack"
  | "special-defense";

export interface INameURL {
  url: string;
  name: string;
}

interface IAbilityItem {
  slot: number;
  ability: INameURL;
  is_hidden: boolean;
}

export interface IPokemonTypeItem {
  slot: number;
  type: INameURL;
}

export interface IPokemonStat {
  base_stat: number;
  effort: 1;
  stat: {
    url: string;
    name: PokemonStatName;
  };
}

export interface IPokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  species: INameURL;
  stats: IPokemonStat[];
  types: IPokemonTypeItem[];
  abilities: IAbilityItem[];
}

export interface IFlavorTextEntry {
  flavor_text: string;
  version: INameURL;
  language: INameURL;
}

interface IGeneraItem {
  genus: string;
  language: INameURL;
}

export interface IPokemonSpecies {
  flavorText: string;
  genera: IGeneraItem[];
  evolution_chain: { url: string };
}

export interface IEvolutionChain {
  species: INameURL;
  evolves_to: IEvolutionChain[];
}

export enum SortOptionsEnum {
  A_Z_SORT = "A-Z",
  Z_A_SORT = "Z-A",
  LOWEST_TO_HIGHEST_SORT = "Lowest to highest number",
  HIGHEST_TO_LOWEST_SORT = "Highest to lowest number",
}
