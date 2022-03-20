export type SearchbarProps = {
  maxLength: number;
  className?: string;
  placeholder: string;
  setSearchValue: (value: string) => void;
};
