import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Loader } from "components/index";
import { pokemonActions } from "actions/index";
import { useMobileLoadMore } from "hooks/index";
import { pokemonSelectors } from "selectors/index";
import { MOBILE_LIMIT_STEP } from "constants/index";

const LoadMore: React.FC = () => {
  const { count, limit } = useSelector(pokemonSelectors.selectPaginationParams);

  const dispatch = useDispatch();

  const extendLimit = () => {
    dispatch(pokemonActions.setLimit(limit + MOBILE_LIMIT_STEP));
  };

  const isLoadingMore = useMobileLoadMore({
    limit,
    extendLimit,
    totalCount: count,
  });

  return isLoadingMore ? <Loader loadingMore={true} /> : <React.Fragment />;
};

export default LoadMore;
