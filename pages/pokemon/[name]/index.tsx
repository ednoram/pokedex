import type { NextPage, GetStaticProps } from "next";

import {
  API,
  processPokemonName,
  getEvolutionPokemons,
  getPokemonFlavorText,
} from "utils/index";
import {
  getPokemonData,
  getAllPokemons,
  getPokemonGenders,
} from "requests/index";
import { HelmetLayout } from "layouts/index";
import { PokemonPageContainer } from "containers/index";
import { INameURL, IPokemonData, IPokemonSpecies } from "types/index";

interface IProps {
  genders: string[];
  pokemonData: IPokemonData;
  evolutionPokemons: INameURL[];
  pokemonSpecies: IPokemonSpecies;
}

const PokemonPage: NextPage<IProps> = ({
  genders,
  pokemonData,
  pokemonSpecies,
  evolutionPokemons,
}) => {
  const processedName = processPokemonName(pokemonData.name);

  return (
    <HelmetLayout
      metaDescription="Pokémon Page"
      title={`${processedName} | Pokédex`}
    >
      <PokemonPageContainer
        genders={genders}
        pokemonData={pokemonData}
        pokemonSpecies={pokemonSpecies}
        evolutionPokemons={evolutionPokemons}
      />
    </HelmetLayout>
  );
};

export const getStaticPaths = async () => {
  const allPokemons = await getAllPokemons();

  const paths = allPokemons.map((pokemon: INameURL) => ({
    params: {
      name: pokemon.name,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const pokemonData = await getPokemonData(String(params?.name));
    const { data: pokemonSpecies } = await API.get(pokemonData.species.url);
    const genders = await getPokemonGenders(pokemonData.name);

    const { data: evolutionChain } = await API.get(
      pokemonSpecies.evolution_chain.url
    );

    const evolutionPokemons = await getEvolutionPokemons(evolutionChain.chain);

    const flavorText = getPokemonFlavorText(pokemonSpecies.flavor_text_entries);

    return {
      props: {
        genders,
        pokemonData,
        evolutionPokemons,
        pokemonSpecies: {
          flavorText,
          genera: pokemonSpecies.genera,
        },
      },
    };
  } catch {
    return { notFound: true };
  }
};

export default PokemonPage;
