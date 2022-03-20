import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Loader } from "components/index";
import { pokemonActions } from "actions/index";
import { useMobileLoadMore } from "hooks/index";
import { pokemonSelectors, pokemonTypesSelectors } from "selectors/index";

const LoadMore: React.FC = () => {
  const sortOption = useSelector(pokemonSelectors.selectSortOption);
  const searchFilter = useSelector(pokemonSelectors.selectSearchValue);
  const activeType = useSelector(pokemonTypesSelectors.selectActiveType);
  const { count, limit } = useSelector(pokemonSelectors.selectPaginationParams);

  const dispatch = useDispatch();

  const setLimit = (newLimit: number) => {
    dispatch(pokemonActions.setLimit(newLimit));
  };

  const isLoadingMore = useMobileLoadMore({
    limit,
    setLimit,
    sortOption,
    searchFilter,
    totalCount: count,
    typeFilter: activeType.name,
  });

  return isLoadingMore ? <Loader loadingMore={true} /> : <React.Fragment />;
};

export default LoadMore;
