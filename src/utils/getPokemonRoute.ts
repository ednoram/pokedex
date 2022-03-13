import { PATHS } from "constants/index";

const getPokemonRoute = (name: string) => {
  return `${PATHS.pokemon}/${name}`;
};

export default getPokemonRoute;
