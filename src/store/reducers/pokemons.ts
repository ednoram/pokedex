import { IPokemon } from "types/index";

export const SET_POKEMONS_DATA = "SET_POKEMONS_DATA";

interface IPokemonsAction {
  type: string;
  payload: {
    count: number;
    pokemons: IPokemon[];
  };
}

export interface IPokemonsState {
  count: number;
  pokemons: IPokemon[];
}

const INITIAL_STATE: IPokemonsState = {
  count: 0,
  pokemons: [],
};

const pokemonsReducer = (
  state = INITIAL_STATE,
  { type, payload }: IPokemonsAction
) => {
  switch (type) {
    case SET_POKEMONS_DATA:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default pokemonsReducer;
