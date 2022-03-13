import React, { useMemo, useRef, useState } from "react";
import { uniq } from "lodash";
import classNames from "classnames";

import { useOutsideClick } from "hooks/index";
import { SortOptionsEnum } from "types/index";
import RightArrow from "assets/RightArrow.svg";

import styles from "./Dropdown.module.scss";

type SetOptionFuncType = (value: string) => void;

interface IProps {
  options: string[];
  className?: string;
  selectedOption: string | SortOptionsEnum;
  setSelectedOption:
    | React.Dispatch<React.SetStateAction<string>>
    | SetOptionFuncType;
}

const Dropdown: React.FC<IProps> = ({
  className,
  options,
  setSelectedOption,
  selectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useOutsideClick(dropdownRef, closeDropdown);

  const headClassName = classNames(styles.dropdown__head, {
    [styles.dropdown__head_active]: isOpen,
  });
  const arrowClassName = classNames(styles.dropdown__head__icon, {
    [styles.dropdown__head__icon_active]: isOpen,
  });

  const optionsList = useMemo(
    () =>
      uniq(options).map((option) => {
        const handleClick = () => {
          setSelectedOption(option);
          setIsOpen(false);
        };

        return (
          <div
            role="button"
            key={option}
            onClick={handleClick}
            className={styles.dropdown__options__item}
          >
            <p>{option}</p>
          </div>
        );
      }),
    [options]
  );

  return (
    <div className={classNames(styles.dropdown, className)}>
      <div
        role="button"
        ref={dropdownRef}
        onClick={toggleOpen}
        className={headClassName}
      >
        <p>{selectedOption}</p>
        <RightArrow className={arrowClassName} />
      </div>
      {isOpen && <div className={styles.dropdown__options}>{optionsList}</div>}
    </div>
  );
};

export default Dropdown;
