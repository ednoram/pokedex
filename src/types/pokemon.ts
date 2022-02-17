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

interface IFlavorTextEntry {
  flavor_text: string;
  version: INameURL;
  language: INameURL;
}

interface IGeneraItem {
  genus: string;
  language: INameURL;
}

export interface IPokemonSpecies {
  flavor_text_entries: IFlavorTextEntry[];
  genera: IGeneraItem[];
}
