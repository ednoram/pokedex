import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import { processPokemonName } from "utils/index";

import { SuggestionsProps } from "./types";
import styles from "./Suggestions.module.scss";

const MAX_SUGGESTIONS = 5;

const Suggestions: React.FC<SuggestionsProps> = ({
  options,
  inputValue,
  setInputValue,
  isInputFocused,
  submitButtonRef,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const inputFilterValue = inputValue.trim().toLowerCase();
  const isInputValueEmpty = !!inputFilterValue.length;
  const optionIsInputValue =
    suggestions.length === 1 &&
    suggestions[0].toLowerCase() === inputFilterValue;

  const clickSubmit = () => {
    submitButtonRef.current?.click();
  };

  const getSuggestions = (value: string) =>
    options
      .filter((option) => {
        const lowercaseOption = option.toLowerCase();
        const lowercaseInputValue = value.toLowerCase();

        return lowercaseOption.includes(lowercaseInputValue);
      })
      .slice(0, MAX_SUGGESTIONS)
      .map((name) => processPokemonName(name));

  useEffect(() => {
    const newSuggestions = getSuggestions(inputValue.trim());
    setSuggestions(newSuggestions);
  }, [inputValue]);

  return isInputFocused && isInputValueEmpty && !optionIsInputValue ? (
    <ul className={styles.suggestions}>
      {suggestions.map((option) => {
        const handleClick = () => {
          setInputValue(option);
          setTimeout(clickSubmit);
        };

        return (
          <li
            role="button"
            key={nanoid()}
            onClick={handleClick}
            className={styles.suggestions__option}
          >
            {option}
          </li>
        );
      })}
    </ul>
  ) : (
    <React.Fragment />
  );
};

export default Suggestions;
