import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { INameURL } from "types/index";
import { pokemonActions } from "actions/index";
import { pokemonSelectors } from "selectors/index";
import { Pagination, PokemonCard, Loader } from "components/index";

import styles from "./Home.module.scss";
import LoadMore from "./LoadMore/index";
import ListControls from "./ListControls/index";

const HomeContainer: React.FC = () => {
  const visiblePokemons = useSelector(pokemonSelectors.selectVisiblePokemons);
  const { count, limit } = useSelector(pokemonSelectors.selectPaginationParams);
  const currentPage = useSelector(pokemonSelectors.selectCurrentPage);
  const searchValue = useSelector(pokemonSelectors.selectSearchValue);
  const isLoading = useSelector(pokemonSelectors.selectPokemonsLoading);

  const pokemonCards = useMemo(
    () =>
      visiblePokemons.length ? (
        visiblePokemons.map(({ url, name }: INameURL) => (
          <li key={name}>
            <PokemonCard url={url} className={styles.container__list__card} />
          </li>
        ))
      ) : (
        <p className={styles.container__empty_list}>Nothing was found</p>
      ),
    [visiblePokemons]
  );

  const dispatch = useDispatch();

  const setPage = (page: number) => {
    dispatch(pokemonActions.setPage(page));
    window.scroll(0, 0);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Pokédex</h1>
      <ListControls />
      {searchValue && (
        <p className={styles.container__search_filter}>
          Showing matches for{" "}
          <span className={styles.container__search_filter__value}>
            &quot;{searchValue}&quot;
          </span>
        </p>
      )}
      {isLoading ? (
        <div className={styles.container__list_loading}>
          <Loader />
        </div>
      ) : (
        <React.Fragment>
          <ul className={styles.container__list}>{pokemonCards}</ul>
          <div className={styles.container__pagination}>
            <Pagination
              limit={limit}
              setPage={setPage}
              totalCount={count}
              currentPage={currentPage}
            />
          </div>
        </React.Fragment>
      )}
      <LoadMore />
    </div>
  );
};

export default HomeContainer;
