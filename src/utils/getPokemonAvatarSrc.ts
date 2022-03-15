import { ASSETS_URL } from "constants/index";
import { getPokemonIdString } from "utils/index";
import { PokemonAvatarQuality } from "types/index";

const getPokemonAvatarSrc = (
  id: number,
  options?: { full: boolean }
): string => {
  const idString = getPokemonIdString(id);
  const quality = options?.full
    ? PokemonAvatarQuality.FULL
    : PokemonAvatarQuality.DETAIL;

  return `${ASSETS_URL}/${quality}/${idString}.png`;
};

export default getPokemonAvatarSrc;
