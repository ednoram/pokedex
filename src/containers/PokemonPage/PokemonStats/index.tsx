import React, { useCallback, useMemo } from "react";
import classNames from "classnames";

import { MAX_STAT_VALUES } from "constants/index";
import { IPokemonStat, PokemonStatName } from "types/index";

import styles from "./PokemonStats.module.scss";

interface IProps {
  pokemonStats: IPokemonStat[];
}

const PokemonStats: React.FC<IProps> = ({ pokemonStats }) => {
  const blockNumbers = Array.from({ length: 15 }, (_, index) => index);

  const getBlockClassName = useCallback(
    (number: number, statName: PokemonStatName, baseStat: number) => {
      const isLast = number === blockNumbers.length - 1;
      const maxValue = MAX_STAT_VALUES[statName];
      const progress = (baseStat / maxValue) * 15;
      const hasPassed = progress >= blockNumbers.length - number;

      return classNames(styles.content__stats__bar__block, {
        [styles.content__stats__bar__block_filled]: hasPassed || isLast,
      });
    },
    []
  );

  const statsSection = useMemo(
    () =>
      pokemonStats.map(({ stat, base_stat }) => {
        const nameWithoutDash = stat.name.replace("-", " ");
        const statName = stat.name === "hp" ? "HP" : nameWithoutDash;

        return (
          <div key={stat.name}>
            <div className={styles.content__stats__bar}>
              {blockNumbers.map((number) => {
                const className = getBlockClassName(
                  number,
                  stat.name,
                  base_stat
                );
                return <div key={number} className={className} />;
              })}
            </div>
            <p className={styles.content__stats__name}>{statName}</p>
          </div>
        );
      }),
    [pokemonStats, getBlockClassName]
  );

  return (
    <div className={styles.content}>
      <h2>Stats</h2>
      <div className={styles.content__stats}>{statsSection}</div>
    </div>
  );
};

export default PokemonStats;
