import { Dispatch } from "redux";

import { API } from "constants/index";
import { IPokemon } from "types/index";
import { createAction } from "utils/index";

import { SET_POKEMONS_DATA } from "store/reducers/pokemons";

const setData = (data: { count: number; pokemons: IPokemon[] }) =>
  createAction(SET_POKEMONS_DATA, data);

export const fetchPokemons =
  (offset: number, limit: number) => async (dispatch: Dispatch) => {
    try {
      const { data } = await API.get("pokemon", { params: { offset, limit } });

      dispatch(setData({ pokemons: data.results, count: data.count }));
    } catch {
      alert("Something went wrong.");
    }
  };
