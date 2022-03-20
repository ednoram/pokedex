import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import { useDidUpdateEffect } from "hooks/index";
import { Dropdown, Searchbar } from "components/index";
import { pokemonActions, pokemonTypesActions } from "actions/index";
import { pokemonSelectors, pokemonTypesSelectors } from "selectors/index";
import { ALL_TYPES_NAME, LIMIT_OPTIONS, SORT_OPTIONS } from "constants/index";

import styles from "./ListControls.module.scss";

const ListControls: React.FC = () => {
  const pokemonTypeNames = useSelector(
    pokemonTypesSelectors.selectPokemonTypeNames
  );
  const sortOption = useSelector(pokemonSelectors.selectSortOption);
  const activeType = useSelector(pokemonTypesSelectors.selectActiveType);
  const { limit } = useSelector(pokemonSelectors.selectPaginationParams);
  const typeFilteredPokemons = useSelector(
    pokemonSelectors.selectTypeFilteredPokemons
  );

  const searchSuggestions = typeFilteredPokemons.map((pokemon) => pokemon.name);

  const limitStringOptions = LIMIT_OPTIONS.map((item) => String(item));
  const pokemonTypesOptions = [ALL_TYPES_NAME, ...pokemonTypeNames];

  const typesDropdownClasses = classNames(
    styles.controls__left__dropdown,
    styles.controls__left__dropdown_types
  );

  const dispatch = useDispatch();

  useDidUpdateEffect(() => {
    dispatch(pokemonActions.filterByType(activeType));
  }, [activeType]);

  const setLimitValue = (limitOption: string) => {
    dispatch(pokemonActions.setLimit(Number(limitOption)));
  };

  const setActiveType = (typeName: string) => {
    dispatch(pokemonTypesActions.setActiveType(typeName));
  };

  const setSortOption = (sortOption: string) => {
    dispatch(pokemonActions.setSortOption(sortOption));
  };

  const setSearchValue = (value: string) => {
    dispatch(pokemonActions.setSearchValue(value));
  };

  return (
    <div className={styles.controls}>
      <div className={styles.controls__left}>
        <Searchbar
          maxLength={30}
          options={searchSuggestions}
          placeholder="Search by name"
          setSearchValue={setSearchValue}
          className={styles.controls__left__searchbar}
        />
        <Dropdown
          options={pokemonTypesOptions}
          selectedOption={activeType.name}
          className={typesDropdownClasses}
          setSelectedOption={setActiveType}
          optionsClassName={styles.controls__left__dropdown_types__options}
        />
        <Dropdown
          options={SORT_OPTIONS}
          selectedOption={sortOption}
          setSelectedOption={setSortOption}
          className={styles.controls__left__dropdown}
        />
      </div>
      <div className={styles.controls__right}>
        <p>Show per page: </p>
        <Dropdown
          options={limitStringOptions}
          selectedOption={String(limit)}
          setSelectedOption={setLimitValue}
        />
      </div>
    </div>
  );
};

export default ListControls;
