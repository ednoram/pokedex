import { IPokemonsState } from "reducers/pokemons";
import { IPokemonTypesState } from "reducers/pokemonTypes";

interface IState {
  pokemons: IPokemonsState;
  pokemonTypes: IPokemonTypesState;
}

export default IState;
