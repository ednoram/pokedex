export interface IPokemon {
  url: string;
  name: string;
}

export interface IPokemonData {
  name: string;
  types: IPokemonType[];
}

export interface IPokemonType {
  slot: number;
  type: {
    url: string;
    name: string;
  };
}
