import { createSelector } from "reselect";

import { IState } from "types/index";
import { filterPokemons } from "utils/index";
import { IPokemonsState } from "reducers/pokemons";

export const selectPokemonsData = (state: IState) => state.pokemons;

export const selectVisiblePokemons = createSelector(
  selectPokemonsData,
  ({ pokemons, offset, limit, searchValue }: IPokemonsState) => {
    const filteredPokemons = searchValue
      ? filterPokemons(pokemons, searchValue)
      : pokemons;

    return filteredPokemons.slice(offset, offset + limit);
  }
);

export const selectCurrentPage = createSelector(
  selectPokemonsData,
  ({ offset, limit }: IPokemonsState) => offset / limit + 1
);
