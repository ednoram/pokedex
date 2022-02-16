import React from "react";

import { IPokemonData } from "types/index";

interface IProps {
  pokemonData: IPokemonData;
}

const PokemonPageContainer: React.FC<IProps> = ({ pokemonData }) => {
  return (
    <div>
      <h1>{pokemonData.name}</h1>
    </div>
  );
};

export default PokemonPageContainer;
