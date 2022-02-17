import { compact } from "lodash";

import { API } from "utils/index";
import { INameURL, PokemonGenderEnum } from "types/index";

export const getAllPokemons = async () => {
  const { data } = await API.get("pokemon", {
    params: { offset: 0, limit: 898 },
  });

  return data.results;
};

export const getPokemonData = async (name: string) => {
  const { data } = await API.get(`pokemon/${name}/`);

  return data;
};

export const getPokemonGenders = async (
  name: string
): Promise<(PokemonGenderEnum.MALE | PokemonGenderEnum.FEMALE)[]> => {
  const { data: femaleData } = await API.get(`gender/1`);
  const { data: maleData } = await API.get(`gender/2`);

  const getItemName = (item: { pokemon_species: INameURL }) =>
    item.pokemon_species.name;

  const malePokemonNames = maleData.pokemon_species_details.map(getItemName);
  const femalePokemonNames =
    femaleData.pokemon_species_details.map(getItemName);

  return compact([
    malePokemonNames.includes(name) ? PokemonGenderEnum.MALE : null,
    femalePokemonNames.includes(name) ? PokemonGenderEnum.FEMALE : null,
  ]);
};
