import React, { useMemo } from "react";

import { kgToLbs, metersToFt } from "utils/index";
import { IPokemonData, IPokemonSpecies } from "types/index";

import styles from "./PokemonInfoGrid.module.scss";

interface IProps {
  genders: string[];
  pokemonData: IPokemonData;
  pokemonSpecies: IPokemonSpecies;
}

const PokemonInfoGrid: React.FC<IProps> = ({
  genders,
  pokemonData,
  pokemonSpecies,
}) => {
  const heightM = pokemonData.height / 10;
  const weightKg = pokemonData.weight / 10;
  const heightFt = metersToFt(heightM);
  const weightLbs = kgToLbs(weightKg);

  const foundGenus = pokemonSpecies.genera.find(
    (item) => item.language.name === "en"
  )?.genus;

  const category = foundGenus ? foundGenus.replace("Pokémon", "") : "unknown";

  const types = useMemo(
    () =>
      pokemonData.types.map((item) => (
        <p key={item.type.name}>{item.type.name}</p>
      )),
    [pokemonData]
  );

  const abilities = useMemo(
    () =>
      pokemonData.abilities.reduce((acc, item) => {
        const node = !item.is_hidden && (
          <p key={item.ability.name}>{item.ability.name}</p>
        );
        return [...acc, node];
      }, [] as React.ReactNode[]),
    [pokemonData]
  );

  return (
    <div className={styles.content}>
      <div className={styles.content__item}>
        <p className={styles.content__item__heading}>Height</p>
        <p>
          {heightM}m ({heightFt})
        </p>
      </div>
      <div className={styles.content__item}>
        <p className={styles.content__item__heading}>Weight</p>
        <p>
          {weightKg}kg ({weightLbs}lbs)
        </p>
      </div>
      <div className={styles.content__item}>
        <p className={styles.content__item__heading}>Category</p>
        <p>{category}</p>
      </div>
      <div className={styles.content__item}>
        <p className={styles.content__item__heading}>Types</p>
        {types}
      </div>
      <div className={styles.content__item}>
        <p className={styles.content__item__heading}>Abilities</p>
        {abilities}
      </div>
      <div className={styles.content__item}>
        <p className={styles.content__item__heading}>Genders</p>
        {genders.length ? (
          genders.map((item) => <p key={item}>{item}</p>)
        ) : (
          <p>None</p>
        )}
      </div>
    </div>
  );
};
export default PokemonInfoGrid;
