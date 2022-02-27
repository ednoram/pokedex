import React, { FormEvent, memo, useRef } from "react";

import SearchIcon from "assets/SearchIcon.svg";

import styles from "./Searchbar.module.scss";

interface IProps {
  placeholder: string;
  setSearchValue: (value: string) => void;
}

const Searchbar: React.FC<IProps> = ({ placeholder, setSearchValue }) => {
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
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <input
          ref={searchInputRef}
          placeholder={placeholder}
          className={styles.container__input}
        />
        <button name="search" className={styles.container__search_button}>
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default memo(Searchbar);
