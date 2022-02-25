import React from "react";

import { INameURL } from "types/index";
import RightArrow from "assets/RightArrow.svg";
import { PokemonCard } from "components/index";

import styles from "./PokemonEvolutions.module.scss";

interface IProps {
  pokemons: INameURL[];
}

const PokemonEvolutions: React.FC<IProps> = ({ pokemons }) => {
  return (
    <div className={styles.content}>
      <h2>Evolutions</h2>
      <div className={styles.content__list}>
        {pokemons.map(({ name, url }, index) => {
          const isLast = index === pokemons.length - 1;

          return (
            <React.Fragment key={name}>
              <PokemonCard url={url} />
              {!isLast && (
                <RightArrow className={styles.content__list__arrow} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonEvolutions;
