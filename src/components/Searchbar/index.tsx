import React, { FormEvent, memo, useRef } from "react";
import classNames from "classnames";

import SearchIcon from "assets/SearchIcon.svg";

import { SearchbarProps } from "./types";
import styles from "./Searchbar.module.scss";

const Searchbar: React.FC<SearchbarProps> = ({
  className,
  maxLength,
  placeholder,
  setSearchValue,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const inputElement = searchInputRef.current;

    if (inputElement) {
      const searchValue = inputElement.value.trim().toLowerCase();
      setSearchValue(searchValue);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames(styles.container, className)}
    >
      <input
        ref={searchInputRef}
        maxLength={maxLength}
        placeholder={placeholder}
        className={styles.container__input}
      />
      <button name="search" className={styles.container__search_button}>
        <SearchIcon />
      </button>
    </form>
  );
};

export default memo(Searchbar);
