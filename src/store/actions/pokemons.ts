import { INameURL } from "types/index";
import { createAction } from "utils/index";

import { SET_PAGE, SET_POKEMONS } from "store/reducers/pokemons";

export const setPokemons = (pokemons: INameURL[]) =>
  createAction(SET_POKEMONS, { pokemons });

export const setPage = (page: number) => createAction(SET_PAGE, { page });
