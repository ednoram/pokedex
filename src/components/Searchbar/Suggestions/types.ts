import { RefObject } from "react";

export type SuggestionsProps = {
  options: string[];
  inputValue: string;
  isInputFocused: boolean;
  setInputValue: (value: string) => void;
  submitButtonRef: RefObject<HTMLButtonElement>;
};
