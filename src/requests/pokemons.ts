import { API } from "utils/index";

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

export const getPokemonSpecies = async (id: number) => {
  const { data } = await API.get(`pokemon-species/${id}/`);

  return data;
};
