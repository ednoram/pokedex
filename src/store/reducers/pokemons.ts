import { IPokemon } from "types/index";
import { AnyAction } from "redux";

import { HYDRATE } from "constants/index";

export const SET_PAGE = "SET_PAGE";
export const SET_POKEMONS = "SET_POKEMONS";

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
    case HYDRATE: {
      return payload.pokemons;
    }

    case SET_POKEMONS: {
      return { ...state, pokemons: payload.pokemons };
    }

    case SET_PAGE: {
      return { ...state, offset: (payload.page - 1) * state.limit };
    }

    default: {
      return state;
    }
  }
};

export default pokemonsReducer;
