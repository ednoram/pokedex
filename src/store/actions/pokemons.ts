import { Dispatch } from "redux";

import { API } from "constants/index";
import { IPokemon } from "types/index";
import { createAction } from "utils/index";

import {
  FETCH_POKEMONS_STARTED,
  FETCH_POKEMONS_FINISHED,
} from "store/reducers/pokemons";

const fetchPokemonsStarted = () => createAction(FETCH_POKEMONS_STARTED, {});

const fetchPokemonsFinished = (data: IPokemon[]) =>
  createAction(FETCH_POKEMONS_FINISHED, { pokemons: data });

export const fetchPokemons =
  (offset: number, limit: number) => async (dispatch: Dispatch) => {
    try {
      dispatch(fetchPokemonsStarted());

      const { data } = await API.get("pokemon", { params: { offset, limit } });

      // There are Pokémon in the api with ids > 10000 that we don't need
      const filteredResults: IPokemon[] = data?.results
        ? data.results.filter(({ url }: IPokemon) => {
            const splitUrl = url.split("/");
            const pokemonId = splitUrl[splitUrl.length - 2];
            return pokemonId.length < 4;
          })
        : [];

      dispatch(fetchPokemonsFinished(filteredResults));
    } catch {
      alert("Something went wrong.");
    }
  };
