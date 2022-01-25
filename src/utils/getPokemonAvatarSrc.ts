import { ASSETS_URL } from "constants/index";
import { getPokemonIdString } from "utils/index";

const getPokemonAvatarSrc = (id: number): string => {
  const idString = getPokemonIdString(id);
  return `${ASSETS_URL}/${idString}.png`;
};

export default getPokemonAvatarSrc;
