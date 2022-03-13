import React, { useMemo, useRef, useState } from "react";
import { uniq } from "lodash";
import classNames from "classnames";

import { useOutsideClick } from "hooks/index";
import RightArrow from "assets/RightArrow.svg";

import styles from "./Dropdown.module.scss";

interface IProps {
  options: string[];
  className?: string;
  selectedOption: string;
  optionsClassName?: string;
  setSelectedOption: (value: string) => void;
}

const Dropdown: React.FC<IProps> = ({
  className,
  options,
  optionsClassName,
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

  const headClasses = classNames(styles.dropdown__head, {
    [styles.dropdown__head_active]: isOpen,
  });
  const arrowClasses = classNames(styles.dropdown__head__icon, {
    [styles.dropdown__head__icon_active]: isOpen,
  });
  const optionsClasses = classNames(styles.dropdown__options, optionsClassName);

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
        className={headClasses}
      >
        <p>{selectedOption}</p>
        <RightArrow className={arrowClasses} />
      </div>
      {isOpen && <div className={optionsClasses}>{optionsList}</div>}
    </div>
  );
};

export default Dropdown;
