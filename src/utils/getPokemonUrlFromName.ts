import { API_URL } from "constants/index";

const getPokemonUrlFromName = (name: string) => `${API_URL}pokemon/${name}`;

export default getPokemonUrlFromName;
