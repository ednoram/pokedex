import React, { FC } from "react";
import classNames from "classnames";

import { getPaginationButtonNames } from "utils/index";

import styles from "./Pagination.module.scss";

interface IProps {
  limit: number;
  offset: number;
  totalCount: number;
  updateParams: (offset: number, limit: number) => void;
}

const Pagination: FC<IProps> = ({
  limit,
  offset,
  totalCount,
  updateParams,
}) => {
  const currentPage = offset / limit + 1;
  const lastPage = Math.ceil(totalCount / limit);

  const buttonNames = getPaginationButtonNames({
    totalCount,
    currentPage,
    limit,
  });

  const setPage = (page: number) => {
    updateParams((page - 1) * limit, limit);
  };

  const handlePrevPageClick = () => {
    if (offset - limit >= 0) {
      updateParams(offset - limit, limit);
    }
  };

  const handleNextPageClick = () => {
    if (offset + limit <= totalCount) {
      updateParams(offset + limit, limit);
    }
  };

  return (
    <ul className={styles.content} hidden={totalCount <= limit}>
      <li>
        <button
          disabled={currentPage === 1}
          onClick={handlePrevPageClick}
          className={styles.content__button_prev_next}
        >
          Prev.
        </button>
      </li>
      {buttonNames.map((name) => (
        <li key={name}>
          <button
            onClick={() => setPage(name)}
            className={classNames(styles.content__button, {
              [styles.content__button_active]: name === currentPage,
            })}
          >
            {name}
          </button>
        </li>
      ))}
      <li>
        <button
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
