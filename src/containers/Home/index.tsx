import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPokemons } from "store/actions";
import { selectPokemonsData } from "store/selectors";

import styles from "./Home.module.scss";

const HomeContainer: FC = () => {
  const pokemonsData = useSelector(selectPokemonsData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemons(0, 20));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Pokédex</h1>
      {JSON.stringify(pokemonsData.pokemons)}
    </div>
  );
};

export default HomeContainer;
