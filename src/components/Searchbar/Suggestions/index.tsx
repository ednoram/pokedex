import React, { useEffect, useState } from "react";
import { uniq } from "lodash";
import { nanoid } from "nanoid";

import { processPokemonName } from "@utils";
import { useSuggestionsControls } from "@hooks";

import { SuggestionsProps } from "./types";
import styles from "./Suggestions.module.scss";

const MAX_SUGGESTIONS = 5;

const Suggestions: React.FC<SuggestionsProps> = ({
  options,
  inputRef,
  inputValue,
  submitForm,
  setInputValue,
  isInputFocused,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const inputFilterValue = inputValue.trim().toLowerCase();
  const isInputValueEmpty = !!inputFilterValue.length;
  const optionIsInputValue =
    suggestions.length === 1 &&
    suggestions[0].toLowerCase() === inputFilterValue;

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
    setSuggestions(uniq(newSuggestions));
  }, [inputValue]);

  useSuggestionsControls({
    inputRef,
    submitForm,
    inputValue,
    suggestions,
    setInputValue,
  });

  return isInputFocused && isInputValueEmpty && !optionIsInputValue ? (
    <ul className={styles.suggestions}>
      {suggestions.map((option) => {
        const handleClick = () => {
          setInputValue(option);
          setTimeout(submitForm);
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
