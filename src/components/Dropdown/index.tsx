import React, { useMemo, useRef } from "react";
import { uniq } from "lodash";
import classNames from "classnames";
import { useToggle } from "react-use";

import { useOutsideClick } from "hooks/index";
import RightArrow from "assets/RightArrow.svg";

import { DropdownProps } from "./types";
import styles from "./Dropdown.module.scss";

const Dropdown: React.FC<DropdownProps> = ({
  className,
  options,
  optionsClassName,
  setSelectedOption,
  selectedOption,
}) => {
  const [isOpen, toggleIsOpen] = useToggle(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const headClasses = classNames(styles.dropdown__head, {
    [styles.dropdown__head_active]: isOpen,
  });
  const arrowClasses = classNames(styles.dropdown__head__icon, {
    [styles.dropdown__head__icon_active]: isOpen,
  });
  const optionsClasses = classNames(styles.dropdown__options, optionsClassName);

  const closeDropdown = () => {
    toggleIsOpen(false);
  };

  useOutsideClick(dropdownRef, closeDropdown);

  const optionsList = useMemo(
    () =>
      uniq(options).map((option) => {
        const handleClick = () => {
          setSelectedOption(option);
          closeDropdown();
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
        onClick={toggleIsOpen}
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
