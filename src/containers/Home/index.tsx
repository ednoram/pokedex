import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { INameURL } from "types/index";
import { pokemonActions } from "actions/index";
import { pokemonSelectors } from "selectors/index";
import { LIMIT_OPTIONS, SORT_OPTIONS } from "constants/index";
import { Pagination, PokemonCard, Searchbar, Dropdown } from "components/index";

import styles from "./Home.module.scss";

const HomeContainer: React.FC = () => {
  const visiblePokemons = useSelector(pokemonSelectors.selectVisiblePokemons);
  const { count, limit, offset } = useSelector(
    pokemonSelectors.selectPokemonsData
  );
  const currentPage = useSelector(pokemonSelectors.selectCurrentPage);

  const [limitOption, setLimitOption] = useState<number>(limit);
  const [sortOption, setSortOption] = useState<string>(SORT_OPTIONS[0]);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scroll(0, 0);
  }, [limit, offset]);

  useEffect(() => {
    dispatch(pokemonActions.setLimit(limitOption));
  }, [limitOption]);

  useEffect(() => {
    dispatch(pokemonActions.setSortOption(sortOption));
  }, [sortOption]);

  const limitStringOptions = useMemo(
    () => LIMIT_OPTIONS.map((item) => String(item)),
    []
  );

  const setPage = (page: number) => {
    dispatch(pokemonActions.setPage(page));
  };

  const setLimitOptionValue = (value: string) => {
    setLimitOption(Number(value));
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
        <div className={styles.container__controls__left}>
          <Searchbar
            placeholder="Search by name"
            setSearchValue={setSearchValue}
          />
          <Dropdown
            options={SORT_OPTIONS}
            selectedOption={sortOption}
            setSelectedOption={setSortOption}
            className={styles.container__controls__left__dropdown}
          />
        </div>
        <Dropdown
          options={limitStringOptions}
          selectedOption={String(limitOption)}
          setSelectedOption={setLimitOptionValue}
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
