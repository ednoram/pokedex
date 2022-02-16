import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { INameURL } from "types/index";
import { pokemonActions } from "actions/index";
import { pokemonSelectors } from "selectors/index";
import { Pagination, PokemonCard } from "components/index";

import styles from "./Home.module.scss";

const HomeContainer: React.FC = () => {
  const visiblePokemons = useSelector(pokemonSelectors.selectVisiblePokemons);
  const { count, limit, offset } = useSelector(
    pokemonSelectors.selectPokemonsData
  );
  const currentPage = useSelector(pokemonSelectors.selectCurrentPage);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scroll(0, 0);
  }, [limit, offset]);

  const setPage = (page: number) => {
    dispatch(pokemonActions.setPage(page));
  };

  const pokemonCards = useMemo(
    () =>
      visiblePokemons.map(({ url, name }: INameURL) => (
        <li key={name}>
          <PokemonCard url={url} />
        </li>
      )),
    [visiblePokemons]
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Pokédex</h1>
      <ul className={styles.container__list}>{pokemonCards}</ul>
      <div className={styles.container__pagination}>
        <Pagination
          limit={limit}
          setPage={setPage}
          totalCount={count}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default HomeContainer;
