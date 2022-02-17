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

export interface IPokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  species: INameURL;
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

export enum PokemonGenderEnum {
  MALE = "male",
  FEMALE = "female",
}
