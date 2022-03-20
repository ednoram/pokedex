import { RefObject } from "react";

export type SuggestionsProps = {
  options: string[];
  inputValue: string;
  submitForm: () => void;
  isInputFocused: boolean;
  inputRef: RefObject<HTMLInputElement>;
  setInputValue: (value: string) => void;
};
