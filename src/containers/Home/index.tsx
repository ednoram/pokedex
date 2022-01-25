import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { IPokemon } from "types/index";
import { setQueryParams } from "utils/index";
import { fetchPokemons } from "actions/index";
import { selectPokemonsData } from "selectors/index";
import { Pagination, PokemonCard } from "components/index";

import styles from "./Home.module.scss";

const HomeContainer: FC = () => {
  const { pokemons, count } = useSelector(selectPokemonsData);

  const router = useRouter();
  const dispatch = useDispatch();

  const { query } = router;

  const limit = query?.limit ? Number(query.limit) : null;
  const offset = query?.offset ? Number(query.offset) : null;

  const paginationIsSet = offset !== null && limit !== null;

  useEffect(() => {
    if (!router.isReady) return;

    window.scroll(0, 0);

    if (paginationIsSet) {
      dispatch(fetchPokemons(offset, limit));
    } else {
      setQueryParams({ offset: "0", limit: "20" });
    }
  }, [limit, offset]);

  const updatePaginationParams = (offset: number, limit: number) => {
    setQueryParams({ offset: String(offset), limit: String(limit) });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Pokédex</h1>
      <ul className={styles.container__list}>
        {pokemons.map(({ url, name }: IPokemon) => (
          <li key={name}>
            <PokemonCard url={url} />
          </li>
        ))}
      </ul>
      <div className={styles.container__pagination}>
        {paginationIsSet && (
          <Pagination
            limit={limit}
            offset={offset}
            totalCount={count}
            updateParams={updatePaginationParams}
          />
        )}
      </div>
    </div>
  );
};

export default HomeContainer;
