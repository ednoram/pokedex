import type { NextPage, GetStaticProps } from "next";

import { wrapper } from "store/index";
import { HelmetLayout } from "layouts/index";
import { HomeContainer } from "containers/index";
import { getAllPokemons, getPokemonTypes } from "requests/index";
import { pokemonActions, pokemonTypesActions } from "actions/index";

const Home: NextPage = () => {
  return (
    <HelmetLayout
      title="Pokédex"
      metaDescription="Explore Pokémon from the original Pokémon API."
    >
      <HomeContainer />
    </HelmetLayout>
  );
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    try {
      const allPokemons = await getAllPokemons();
      store.dispatch(pokemonActions.setPokemons(allPokemons));

      const pokemonTypes = await getPokemonTypes();
      store.dispatch(pokemonTypesActions.setPokemonTypes(pokemonTypes));

      return { props: {} };
    } catch {
      return { notFound: true };
    }
  }
);

export default Home;
