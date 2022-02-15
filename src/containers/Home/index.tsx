import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IPokemon } from "types/index";
import { pokemonActions } from "actions/index";
import { pokemonSelectors } from "selectors/index";
import { Pagination, PokemonCard } from "components/index";

import styles from "./Home.module.scss";

const HomeContainer: FC = () => {
  const { pokemons, count, limit, offset } = useSelector(
    pokemonSelectors.selectPokemonsData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    window.scroll(0, 0);
  }, [limit, offset]);

  const updatePaginationParams = (newOffset: number, newLimit: number) => {
    dispatch(
      pokemonActions.setPagination({ offset: newOffset, limit: newLimit })
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Pokédex</h1>
      <ul className={styles.container__list}>
        {pokemons &&
          pokemons
            .slice(offset, offset + limit)
            .map(({ url, name }: IPokemon) => (
              <li key={name}>
                <PokemonCard url={url} />
              </li>
            ))}
      </ul>
      <div className={styles.container__pagination}>
        <Pagination
          limit={limit}
          offset={offset}
          totalCount={count}
          updateParams={updatePaginationParams}
        />
      </div>
    </div>
  );
};

export default HomeContainer;
