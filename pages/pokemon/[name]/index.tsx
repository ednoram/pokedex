import type { NextPage, GetStaticProps } from "next";

import { HelmetLayout } from "layouts/index";
import { processPokemonName, API } from "utils/index";
import { PokemonPageContainer } from "containers/index";
import { getPokemonData, getAllPokemons } from "requests/index";
import { INameURL, IPokemonData, IPokemonSpecies } from "types/index";

interface IProps {
  pokemonData: IPokemonData;
  pokemonSpecies: IPokemonSpecies;
}

const PokemonPage: NextPage<IProps> = ({ pokemonData, pokemonSpecies }) => {
  const processedName = processPokemonName(pokemonData.name);

  return (
    <HelmetLayout
      metaDescription="Pokémon Page"
      title={`${processedName} | Pokédex`}
    >
      <PokemonPageContainer
        pokemonData={pokemonData}
        pokemonSpecies={pokemonSpecies}
      />
    </HelmetLayout>
  );
};

export const getStaticPaths = async () => {
  const allPokemons = await getAllPokemons();

  const paths = allPokemons.map((pokemon: INameURL) => ({
    params: { name: pokemon.name },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const pokemonData = await getPokemonData(String(params?.name));
    const { data: pokemonSpecies } = await API.get(pokemonData.species.url);

    return {
      props: {
        pokemonData,
        pokemonSpecies,
      },
    };
  } catch {
    return { notFound: true };
  }
};

export default PokemonPage;
