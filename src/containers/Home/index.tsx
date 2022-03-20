import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { INameURL } from "types/index";
import { pokemonActions } from "actions/index";
import { pokemonSelectors } from "selectors/index";
import { Pagination, PokemonCard } from "components/index";

import styles from "./Home.module.scss";
import LoadMore from "./LoadMore/index";
import ListControls from "./ListControls/index";

const HomeContainer: React.FC = () => {
  const visiblePokemons = useSelector(pokemonSelectors.selectVisiblePokemons);
  const { count, limit } = useSelector(pokemonSelectors.selectPaginationParams);
  const currentPage = useSelector(pokemonSelectors.selectCurrentPage);

  const dispatch = useDispatch();

  const setPage = (page: number) => {
    dispatch(pokemonActions.setPage(page));
    window.scroll(0, 0);
  };

  const pokemonCards = useMemo(
    () =>
      visiblePokemons.map(({ url, name }: INameURL) => (
        <li key={name}>
          <PokemonCard url={url} className={styles.container__list__card} />
        </li>
      )),
    [visiblePokemons]
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Pokédex</h1>
      <ListControls />
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
      <LoadMore />
    </div>
  );
};

export default HomeContainer;
