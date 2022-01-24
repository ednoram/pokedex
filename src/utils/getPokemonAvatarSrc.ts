import { assetsUrl } from "constants/index";

const getPokemonAvatarSrc = (id: number): string =>
  `${assetsUrl}/${("00" + id).slice(-3)}.png`;

export default getPokemonAvatarSrc;
