import React, { FormEvent, useState } from "react";

import SearchIcon from "assets/SearchIcon.svg";

import styles from "./Searchbar.module.scss";

interface IProps {
  placeholder: string;
  setSearchValue: (value: string) => void;
}

const Searchbar: React.FC<IProps> = ({ placeholder, setSearchValue }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const searchValue = inputValue.trim().toLowerCase();
    setSearchValue(searchValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <input
          value={inputValue}
          placeholder={placeholder}
          className={styles.container__input}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button name="search" className={styles.container__search_button}>
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default Searchbar;
