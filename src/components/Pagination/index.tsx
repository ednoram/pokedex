import React from "react";
import classNames from "classnames";

import { getPaginationButtonNames } from "@utils";

import { PaginationTypes } from "./types";
import styles from "./Pagination.module.scss";

const Pagination: React.FC<PaginationTypes> = ({
  limit,
  setPage,
  totalCount,
  currentPage,
}) => {
  const lastPage = Math.ceil(totalCount / limit);

  const buttonNames = getPaginationButtonNames({
    limit,
    totalCount,
    currentPage,
  });

  const isHidden = totalCount <= limit;

  const handlePrevPageClick = () => {
    setPage(currentPage - 1);
  };

  const handleNextPageClick = () => {
    setPage(currentPage + 1);
  };

  return (
    <ul className={styles.content} hidden={isHidden}>
      <li>
        <button
          name="previous page"
          disabled={currentPage === 1}
          onClick={handlePrevPageClick}
          className={styles.content__button_prev_next}
        >
          Prev.
        </button>
      </li>
      {buttonNames.map((name) => {
        const buttonName = `${name} page`;

        return (
          <li key={name}>
            <button
              name={buttonName}
              onClick={() => setPage(name)}
              className={classNames(styles.content__button, {
                [styles.content__button_active]: name === currentPage,
              })}
            >
              {name}
            </button>
          </li>
        );
      })}
      <li>
        <button
          name="next page"
          onClick={handleNextPageClick}
          disabled={currentPage === lastPage}
          className={styles.content__button_prev_next}
        >
          Next.
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
