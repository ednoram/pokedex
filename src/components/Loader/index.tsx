import React from "react";
import classNames from "classnames";

import styles from "./Loader.module.scss";

interface IProps {
  loadingMore?: boolean;
}

const Loader: React.FC<IProps> = ({ loadingMore }) => {
  const containerClassNames = classNames(styles.container, {
    [styles.container_loading_more]: loadingMore,
  });

  return (
    <div className={containerClassNames}>
      <div className={styles.container__lds_ellipsis}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;
