import { IState } from "types/index";
import { createSelector } from "reselect";
import { IPokemonsState } from "reducers/pokemons";

export const selectPokemonsData = (state: IState) => state.pokemons;

export const selectVisiblePokemons = createSelector(
  selectPokemonsData,
  ({ pokemons, offset, limit }: IPokemonsState) =>
    pokemons.slice(offset, offset + limit)
);

export const selectCurrentPage = createSelector(
  selectPokemonsData,
  ({ offset, limit }: IPokemonsState) => offset / limit + 1
);
