import { ASSETS_URL } from "constants/index";
import { getPokemonIdString } from "utils/index";

const getPokemonAvatarSrc = (
  id: number,
  options?: { full: boolean }
): string => {
  const idString = getPokemonIdString(id);
  const quality = options?.full ? "full" : "detail";

  return `${ASSETS_URL}/${quality}/${idString}.png`;
};

export default getPokemonAvatarSrc;
