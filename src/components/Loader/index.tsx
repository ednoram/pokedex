import { FC } from "react";

import utilStyles from "styles/utils.module.scss";

import styles from "./Loader.module.scss";

interface IProps {
  loadingMore?: boolean;
}

const Loader: FC<IProps> = ({ loadingMore }) => {
  return (
    <div
      className={[
        styles.container,
        utilStyles.flex_center,
        loadingMore ? styles.container_loading_more : "",
      ].join(" ")}
    >
      <div className={styles.container__lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
