import type { NextPage, GetStaticProps } from "next";

import { HelmetLayout } from "layouts/index";
import { IPokemon, IPokemonData } from "types/index";
import { PokemonPageContainer } from "containers/index";
import { getPokemonData, getAllPokemons } from "requests/index";

interface IProps {
  pokemonData: IPokemonData;
}

const PokemonPage: NextPage<IProps> = ({ pokemonData }) => {
  return (
    <HelmetLayout title={pokemonData.name} metaDescription="Pokémon Page">
      <PokemonPageContainer pokemonData={pokemonData} />
    </HelmetLayout>
  );
};

export const getStaticPaths = async () => {
  const allPokemons = await getAllPokemons();

  const paths = allPokemons.map((pokemon: IPokemon) => ({
    params: { name: pokemon.name },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const pokemonData = await getPokemonData(String(params?.name));

    return {
      props: {
        pokemonData,
      },
    };
  } catch {
    return { notFound: true };
  }
};

export default PokemonPage;
