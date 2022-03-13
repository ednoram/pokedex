import { createSelector } from "reselect";

import { IState } from "types/index";
import { IPokemonsState } from "reducers/pokemons";
import { filterPokemons, getPokemonSortFunction } from "utils/index";

export const selectPokemonsData = (state: IState) => state.pokemons;

export const selectVisiblePokemons = createSelector(
  selectPokemonsData,
  ({ pokemons, offset, limit, searchValue, sortOption }: IPokemonsState) => {
    const filteredPokemons = searchValue
      ? filterPokemons(pokemons, searchValue)
      : Array.from(pokemons);

    const sortFunc = getPokemonSortFunction(sortOption);
    const sortedPokemons = filteredPokemons.sort(sortFunc);

    return sortedPokemons.slice(offset, offset + limit);
  }
);

export const selectCurrentPage = createSelector(
  selectPokemonsData,
  ({ offset, limit }: IPokemonsState) => offset / limit + 1
);
