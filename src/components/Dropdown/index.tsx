import React, { useMemo, useRef, useState } from "react";
import { nanoid } from "nanoid";
import classNames from "classnames";

import { useOutsideClick } from "hooks/index";
import RightArrow from "assets/RightArrow.svg";

import styles from "./Dropdown.module.scss";

interface IProps {
  options: number[];
  selectedOption: number;
  setSelectedOption: React.Dispatch<React.SetStateAction<number>>;
}

const Dropdown: React.FC<IProps> = ({
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
      options.map((option) => {
        const handleClick = () => {
          setSelectedOption(option);
          setIsOpen(false);
        };

        return (
          <div
            role="button"
            key={nanoid()}
            onClick={handleClick}
            className={styles.dropdown__options__item}
          >
            {option}
          </div>
        );
      }),
    [options]
  );

  return (
    <div className={styles.dropdown}>
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
