import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IPokemon } from "types/index";
import { fetchPokemons } from "actions/index";
import { PokemonCard } from "components/index";
import { selectPokemonsData } from "selectors/index";

import styles from "./Home.module.scss";

const HomeContainer: FC = () => {
  const { pokemons } = useSelector(selectPokemonsData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemons(0, 20));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Pokédex</h1>
      <ul className={styles.container__list}>
        {pokemons.map(({ url, name }: IPokemon) => (
          <li key={name}>
            <PokemonCard url={url} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeContainer;
