import { useEffect } from "react";
import type { NextPage } from "next";
import { useDispatch } from "react-redux";

import { HelmetLayout } from "layouts/index";
import { pokemonActions } from "actions/index";
import { HomeContainer } from "containers/index";

const Home: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pokemonActions.fetchPokemons());
  }, []);

  return (
    <HelmetLayout
      title="Pokédex"
      metaDescription="Explore Pokémon from the original Pokémon API."
    >
      <HomeContainer />
    </HelmetLayout>
  );
};

export default Home;
