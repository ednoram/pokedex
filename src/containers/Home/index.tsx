import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { INameURL } from "types/index";
import { pokemonActions } from "actions/index";
import { pokemonSelectors } from "selectors/index";
import { Pagination, PokemonCard, Searchbar } from "components/index";

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

  const setSearchValue = useCallback((value: string) => {
    dispatch(pokemonActions.setSearchValue(value));
  }, []);

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
      <div className={styles.container__controls}>
        <Searchbar
          placeholder="Search by name"
          setSearchValue={setSearchValue}
        />
      </div>
      {pokemonCards.length ? (
        <ul className={styles.container__list}>{pokemonCards}</ul>
      ) : (
        <p className={styles.container__empty_list}>Nothing was found</p>
      )}
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
