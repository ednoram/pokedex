import { SortOptionsEnum } from "types/index";

export const API_URL = "https://pokeapi.co/api/v2/";
export const ASSETS_URL = "https://assets.pokemon.com/assets/cms2/img/pokedex";

export const HYDRATE = "__NEXT_REDUX_WRAPPER_HYDRATE__";

export const MAX_POKEMON_COUNT = 898;
export const LIMIT_OPTIONS = [10, 20, 50];

export const SORT_OPTIONS: SortOptionsEnum[] = [
  SortOptionsEnum.LOWEST_TO_HIGHEST_SORT,
  SortOptionsEnum.HIGHEST_TO_LOWEST_SORT,
  SortOptionsEnum.A_Z_SORT,
  SortOptionsEnum.Z_A_SORT,
];

export const ALL_TYPES_NAME = "all types";
export const UNKNOWN_TYPE_NAME = "unknown";
