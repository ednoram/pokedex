import React from "react";

import { IPokemonData } from "types/index";
import { getPokemonIdString, processPokemonName } from "utils/index";

import styles from "./PokemonPage.module.scss";

interface IProps {
  pokemonData: IPokemonData;
}

const PokemonPageContainer: React.FC<IProps> = ({ pokemonData }) => {
  const processedName = processPokemonName(pokemonData.name);
  const idString = getPokemonIdString(pokemonData.id);

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>
        {processedName} #{idString}
      </h1>
    </div>
  );
};

export default PokemonPageContainer;
