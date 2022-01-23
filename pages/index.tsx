import type { NextPage } from "next";

import { HelmetLayout } from "layouts/index";
import { HomeContainer } from "containers/index";

const Home: NextPage = () => {
  return (
    <HelmetLayout title="Pokédex" metaDescription="Pokémon list">
      <HomeContainer />
    </HelmetLayout>
  );
};

export default Home;
