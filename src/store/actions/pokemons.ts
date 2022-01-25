import { Dispatch } from "redux";

import { API } from "constants/index";
import { IPokemon } from "types/index";
import { createAction } from "utils/index";

import { SET_POKEMONS_DATA } from "store/reducers/pokemons";

const setPokemonsData = (data: IPokemon[]) =>
  createAction(SET_POKEMONS_DATA, { pokemons: data });

export const fetchPokemons =
  (offset: number, limit: number) => async (dispatch: Dispatch) => {
    try {
      const { data } = await API.get("pokemon", { params: { offset, limit } });

      // There are Pokémon in the api with ids > 10000 that we don't need
      const filteredResults: IPokemon[] = data?.results
        ? data.results.filter(({ url }: IPokemon) => {
            const splitUrl = url.split("/");
            const pokemonId = splitUrl[splitUrl.length - 2];
            return pokemonId.length < 4;
          })
        : [];

      dispatch(setPokemonsData(filteredResults));
    } catch {
      alert("Something went wrong.");
    }
  };
