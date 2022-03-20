import React, { useRef, useState, FormEvent, ChangeEvent } from "react";
import classNames from "classnames";

import { useOutsideClick } from "hooks/index";
import SearchIcon from "assets/SearchIcon.svg";

import { SearchbarProps } from "./types";
import styles from "./Searchbar.module.scss";
import Suggestions from "./Suggestions/index";

const Searchbar: React.FC<SearchbarProps> = ({
  options,
  className,
  maxLength,
  placeholder,
  setSearchValue,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const searchValue = inputValue.trim().toLowerCase();
    setSearchValue(searchValue);
    inputRef.current?.blur();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  useOutsideClick(inputRef, () => {
    setIsInputFocused(false);
  });

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames(styles.container, className)}
    >
      <input
        ref={inputRef}
        value={inputValue}
        maxLength={maxLength}
        placeholder={placeholder}
        onFocus={handleInputFocus}
        onChange={handleInputChange}
        className={styles.container__input}
      />
      <button
        name="search"
        ref={submitButtonRef}
        className={styles.container__search_button}
      >
        <SearchIcon />
      </button>
      <Suggestions
        options={options}
        inputValue={inputValue}
        setInputValue={setInputValue}
        isInputFocused={isInputFocused}
        submitButtonRef={submitButtonRef}
      />
    </form>
  );
};

export default Searchbar;
