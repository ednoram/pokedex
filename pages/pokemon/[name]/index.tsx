import type { NextPage, GetStaticProps } from "next";

import {
  getPokemonData,
  getAllPokemons,
  getPokemonGenders,
} from "requests/index";
import { HelmetLayout } from "layouts/index";
import { processPokemonName, API } from "utils/index";
import { PokemonPageContainer } from "containers/index";
import { INameURL, IPokemonData, IPokemonSpecies } from "types/index";

interface IProps {
  genders: string[];
  pokemonData: IPokemonData;
  pokemonSpecies: IPokemonSpecies;
}

const PokemonPage: NextPage<IProps> = ({
  genders,
  pokemonData,
  pokemonSpecies,
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
    const genders = await getPokemonGenders(pokemonData.name);

    const { flavor_text_entries, genera } = pokemonSpecies;

    return {
      props: {
        genders,
        pokemonData,
        pokemonSpecies: { flavor_text_entries, genera },
      },
    };
  } catch {
    return { notFound: true };
  }
};

export default PokemonPage;
