import { Dispatch } from "redux";

import { IPokemon } from "types/index";
import { createAction } from "utils/index";

import {
  SET_PAGE,
  FETCH_POKEMONS_START,
  FETCH_POKEMONS_ERROR,
  FETCH_POKEMONS_SUCCESS,
} from "store/reducers/pokemons";
import { getAllPokemons } from "~/src/requests";

const fetchPokemonsStarted = () => createAction(FETCH_POKEMONS_START, {});

const fetchPokemonsError = () => createAction(FETCH_POKEMONS_ERROR, {});

const fetchPokemonsSuccess = (data: IPokemon[]) =>
  createAction(FETCH_POKEMONS_SUCCESS, { pokemons: data });

export const setPage = (page: number) => createAction(SET_PAGE, { page });

export const fetchPokemons = () => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchPokemonsStarted());

    const allPokemonsData = await getAllPokemons();

    dispatch(fetchPokemonsSuccess(allPokemonsData));
  } catch {
    dispatch(fetchPokemonsError());
    alert("Something went wrong.");
  }
};
