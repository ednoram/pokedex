import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

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

  const [limitOption, setLimitOption] = useState<number>(limit);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pokemonActions.setLimit(limitOption));
  }, [limitOption]);

  useEffect(() => {
    dispatch(pokemonActions.filterByType(activeType));
  }, [activeType]);

  const limitStringOptions = LIMIT_OPTIONS.map((item) => String(item));

  const setLimitOptionValue = (value: string) => {
    setLimitOption(Number(value));
  };

  const setActiveType = (typeName: string) => {
    dispatch(pokemonTypesActions.setActiveType(typeName));
  };

  const setSortOption = (sortOption: string) => {
    dispatch(pokemonActions.setSortOption(sortOption));
  };

  const setSearchValue = useCallback((value: string) => {
    dispatch(pokemonActions.setSearchValue(value));
  }, []);

  const pokemonTypesOptions = [ALL_TYPES_NAME, ...pokemonTypeNames];

  const typesDropdownClasses = classNames(
    styles.controls__left__dropdown,
    styles.controls__left__dropdown_types
  );

  return (
    <div className={styles.controls}>
      <div className={styles.controls__left}>
        <Searchbar
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
          selectedOption={String(limitOption)}
          setSelectedOption={setLimitOptionValue}
        />
      </div>
    </div>
  );
};

export default ListControls;
