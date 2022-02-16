export interface INameURL {
  url: string;
  name: string;
}

export interface IPokemonData {
  id: number;
  name: string;
  types: IPokemonType[];
  species: {
    url: string;
    name: string;
  };
}

export interface IPokemonType {
  slot: number;
  type: INameURL;
}

interface IFlavorTextEntry {
  flavor_text: string;
  version: INameURL;
  language: INameURL;
}

export interface IPokemonSpecies {
  flavor_text_entries: IFlavorTextEntry[];
}
