import React from "react";

import { RightArrowIcon } from "@assets";
import { PokemonCard } from "@components";

import { PokemonEvolutionsProps } from "./types";
import styles from "./PokemonEvolutions.module.scss";

const PokemonEvolutions: React.FC<PokemonEvolutionsProps> = ({ pokemons }) => {
  return (
    <div className={styles.content}>
      <h2 className={styles.content__heading}>Evolutions</h2>
      <div className={styles.content__list}>
        {pokemons.map(({ name, url }, index) => {
          const isLast = index === pokemons.length - 1;

          return (
            <React.Fragment key={name}>
              <PokemonCard url={url} />
              {!isLast && (
                <RightArrowIcon className={styles.content__list__arrow} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonEvolutions;
