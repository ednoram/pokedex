import { INameURL } from "types/index";

const filterPokemons = (pokemons: INameURL[], searchValue: string) => {
  return pokemons.filter(({ name }) => name.includes(searchValue));
};

export default filterPokemons;
