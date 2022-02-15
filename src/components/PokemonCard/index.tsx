import React from "react";
import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
import classNames from "classnames";

import {
  processPokemonName,
  getPokemonIdString,
  getPokemonAvatarSrc,
} from "utils/index";
import { Loader } from "components/index";
import utilStyles from "styles/utils.module.scss";

import styles from "./PokemonCard.module.scss";

interface IProps {
  url: string;
}

const fetch = (url: string) => axios.get(url).then((res) => res.data);

const PokemonCard: React.FC<IProps> = ({ url }) => {
  const { data, error } = useSWR(url, fetch, { errorRetryCount: 1 });

  const pokemonIdString = data ? "#" + getPokemonIdString(data.id) : "";
  const pokemonTypes = data?.types
    ? data.types
        ?.map(({ type }: { type: { name: string } }) => type.name)
        .join(", ")
    : [];

  return (
    <div
      className={classNames(styles.content, {
        [utilStyles.flex_center]: error || !data,
      })}
    >
      {data ? (
        <>
          <div className={styles.content__avatar}>
            <Image
              width={150}
              height={150}
              alt="pokemon avatar"
              src={getPokemonAvatarSrc(data.id)}
              className={styles.container__avatar__image}
            />
          </div>
          <div>
            <p className={styles.content__name}>
              {processPokemonName(data.name)}
            </p>
            <p className={styles.content__id}>{pokemonIdString}</p>
            <p className={styles.content__types}>{pokemonTypes}</p>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PokemonCard;
