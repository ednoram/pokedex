import { IPokemon } from "types/index";
import { AnyAction } from "redux";

export const SET_PAGINATION = "SET_PAGINATION";
export const FETCH_POKEMONS_START = "FETCH_POKEMONS_START";
export const FETCH_POKEMONS_ERROR = "FETCH_POKEMONS_ERROR";
export const FETCH_POKEMONS_SUCCESS = "FETCH_POKEMONS_SUCCESS";

export interface IPokemonsState {
  count: number;
  limit: number;
  offset: number;
  pokemons: IPokemon[];
}

const INITIAL_STATE: IPokemonsState = {
  limit: 20,
  offset: 0,
  count: 898,
  pokemons: [],
};

const pokemonsReducer = (
  state = INITIAL_STATE,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case FETCH_POKEMONS_START:
      return { ...state, pokemons: [] };

    case FETCH_POKEMONS_SUCCESS:
      return { ...state, pokemons: payload.pokemons };

    case SET_PAGINATION:
      return { ...state, limit: payload.limit, offset: payload.offset };

    default:
      return state;
  }
};

export default pokemonsReducer;
