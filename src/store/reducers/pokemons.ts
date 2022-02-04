import { IPokemon } from "types/index";

export const FETCH_POKEMONS_STARTED = "FETCH_POKEMONS_STARTED";
export const FETCH_POKEMONS_FINISHED = "FETCH_POKEMONS_FINISHED";

interface IPokemonsAction {
  type: string;
  payload: {
    pokemons: IPokemon[];
  };
}

export interface IPokemonsState {
  count: number;
  loading: boolean;
  pokemons: IPokemon[];
}

const INITIAL_STATE: IPokemonsState = {
  count: 898,
  pokemons: [],
  loading: false,
};

const pokemonsReducer = (
  state = INITIAL_STATE,
  { type, payload }: IPokemonsAction
) => {
  switch (type) {
    case FETCH_POKEMONS_STARTED:
      return { ...state, loading: true, pokemons: [] };

    case FETCH_POKEMONS_FINISHED:
      return { ...state, loading: false, pokemons: payload.pokemons };

    default:
      return state;
  }
};

export default pokemonsReducer;
