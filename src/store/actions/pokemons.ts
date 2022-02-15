import { Dispatch } from "redux";

import { API } from "constants/index";
import { IPokemon } from "types/index";
import { createAction } from "utils/index";

import {
  SET_PAGE,
  FETCH_POKEMONS_START,
  FETCH_POKEMONS_ERROR,
  FETCH_POKEMONS_SUCCESS,
} from "store/reducers/pokemons";

const fetchPokemonsStarted = () => createAction(FETCH_POKEMONS_START, {});

const fetchPokemonsError = () => createAction(FETCH_POKEMONS_ERROR, {});

const fetchPokemonsSuccess = (data: IPokemon[]) =>
  createAction(FETCH_POKEMONS_SUCCESS, { pokemons: data });

export const setPage = (page: number) => createAction(SET_PAGE, { page });

export const fetchPokemons = () => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchPokemonsStarted());

    const { data } = await API.get("pokemon", {
      params: { offset: 0, limit: 898 },
    });

    dispatch(fetchPokemonsSuccess(data.results));
  } catch {
    dispatch(fetchPokemonsError());
    alert("Something went wrong.");
  }
};
