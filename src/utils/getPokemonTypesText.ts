import { IPokemonType } from "types/index";

const getPokemonTypesText = (types: IPokemonType[] | undefined): string =>
  types ? types.map(({ type }) => type.name).join(", ") : "";

export default getPokemonTypesText;
