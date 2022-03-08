import { AnyAction } from "redux";

import { INameURL } from "types/index";
import { filterPokemons } from "utils/index";
import { HYDRATE, LIMIT_OPTIONS } from "constants/index";

export const SET_PAGE = "SET_PAGE";
export const SET_LIMIT = "SET_LIMIT";
export const SET_POKEMONS = "SET_POKEMONS";
export const SET_SEARCH_VALUE = "SET_SEARCH_VALUE";

export interface IPokemonsState {
  count: number;
  limit: number;
  offset: number;
  searchValue: string;
  pokemons: INameURL[];
}

const INITIAL_STATE: IPokemonsState = {
  count: 0,
  offset: 0,
  pokemons: [],
  searchValue: "",
  limit: LIMIT_OPTIONS[1],
};

const pokemonsReducer = (
  state = INITIAL_STATE,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case HYDRATE: {
      return payload.pokemons;
    }

    case SET_POKEMONS: {
      return {
        ...state,
        pokemons: payload.pokemons,
        count: payload.pokemons.length,
      };
    }

    case SET_PAGE: {
      return { ...state, offset: (payload.page - 1) * state.limit };
    }

    case SET_LIMIT: {
      const newOffset =
        Math.floor(state.offset / payload.limit) * payload.limit;

      return { ...state, offset: newOffset, limit: payload.limit };
    }

    case SET_SEARCH_VALUE: {
      const filteredPokemons = filterPokemons(state.pokemons, payload.value);

      return {
        ...state,
        offset: 0,
        searchValue: payload.value,
        count: filteredPokemons.length,
      };
    }

    default: {
      return state;
    }
  }
};

export default pokemonsReducer;
