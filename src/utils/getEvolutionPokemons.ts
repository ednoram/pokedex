import { compact } from "lodash";

import { getPokemonUrlFromName } from "utils/index";
import { IEvolutionChain, INameURL } from "types/index";

const getEvolutionPokemons = (chain: IEvolutionChain): INameURL[] => {
  const firstName = chain.species.name;
  const firstEvolvesTo = chain.evolves_to[0];
  const secondName = firstEvolvesTo ? firstEvolvesTo.species.name : "";
  const secondEvolvesTo = firstEvolvesTo?.evolves_to[0];
  const thirdName = secondEvolvesTo ? secondEvolvesTo.species.name : "";

  const names = compact([firstName, secondName, thirdName]);

  return names.map((name) => {
    const url = getPokemonUrlFromName(name);
    return { name, url };
  });
};

export default getEvolutionPokemons;
