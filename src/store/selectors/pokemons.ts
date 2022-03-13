import { createSelector } from "reselect";

import { IState } from "types/index";
import { IPokemonsState } from "reducers/pokemons";
import { filterPokemons, getPokemonSortFunction } from "utils/index";

export const selectPokemonsData = (state: IState) => state.pokemons;

export const selectVisiblePokemons = createSelector(
  selectPokemonsData,
  ({
    limit,
    offset,
    pokemons,
    sortOption,
    searchValue,
    typeFilteredPokemons,
  }: IPokemonsState) => {
    const typePokemons = typeFilteredPokemons || pokemons;

    const filteredPokemons = searchValue
      ? filterPokemons(typePokemons, searchValue)
      : Array.from(typePokemons);

    const sortFunc = getPokemonSortFunction(sortOption);
    const sortedPokemons = filteredPokemons.sort(sortFunc);

    return sortedPokemons.slice(offset, offset + limit);
  }
);

export const selectCurrentPage = createSelector(
  selectPokemonsData,
  ({ offset, limit }: IPokemonsState) => offset / limit + 1
);

export const selectPaginationParams = createSelector(
  selectPokemonsData,
  ({ limit, offset, count }: IPokemonsState) => {
    return { count, limit, offset };
  }
);

export const selectSortOption = createSelector(
  selectPokemonsData,
  (pokemonsData) => {
    return pokemonsData.sortOption;
  }
);
