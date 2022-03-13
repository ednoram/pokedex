import { AnyAction } from "redux";

import { filterPokemons } from "utils/index";
import { INameURL, SortOptionsEnum } from "types/index";
import { HYDRATE, LIMIT_OPTIONS } from "constants/index";

export const SET_PAGE = "SET_PAGE";
export const SET_LIMIT = "SET_LIMIT";
export const SET_POKEMONS = "SET_POKEMONS";
export const SET_SORT_OPTION = "SET_SORT_OPTION";
export const SET_SEARCH_VALUE = "SET_SEARCH_VALUE";
export const SET_TYPE_FILTERED_POKEMONS = "SET_TYPE_FILTERED_POKEMONS";

export interface IPokemonsState {
  count: number;
  limit: number;
  offset: number;
  searchValue: string;
  pokemons: INameURL[];
  sortOption: SortOptionsEnum;
  typeFilteredPokemons: INameURL[] | null;
}

const INITIAL_STATE: IPokemonsState = {
  count: 0,
  offset: 0,
  pokemons: [],
  searchValue: "",
  limit: LIMIT_OPTIONS[1],
  typeFilteredPokemons: null,
  sortOption: SortOptionsEnum.LOWEST_TO_HIGHEST_SORT,
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

    case SET_SORT_OPTION: {
      return { ...state, sortOption: payload.sortOption, offset: 0 };
    }

    case SET_TYPE_FILTERED_POKEMONS: {
      const count = payload.pokemons?.length ?? state.pokemons.length;

      return {
        ...state,
        count,
        offset: 0,
        typeFilteredPokemons: payload.pokemons,
      };
    }

    default: {
      return state;
    }
  }
};

export default pokemonsReducer;
