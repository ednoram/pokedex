import { IPokemon } from "types/index";

export const SET_DATA = "SET_DATA";

interface IPokemonsAction {
  type: string;
  payload: {
    limit: number;
    offset: number;
    pokemons: IPokemon[];
  };
}

export interface IPokemonsState {
  count: number;
  limit: number;
  offset: number;
  pokemons: IPokemon[];
}

const INITIAL_STATE: IPokemonsState = {
  count: 0,
  limit: 0,
  offset: 0,
  pokemons: [],
};

const pokemonsReducer = (
  state = INITIAL_STATE,
  { type, payload }: IPokemonsAction
) => {
  switch (type) {
    case SET_DATA:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default pokemonsReducer;
