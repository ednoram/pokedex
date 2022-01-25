import React, { FC } from "react";
import useSWR from "swr";
import axios from "axios";
import Image from "next/image";

import {
  processPokemonName,
  getPokemonIdString,
  getPokemonAvatarSrc,
} from "utils/index";

import styles from "./PokemonCard.module.scss";

interface IProps {
  url: string;
}

const fetch = (url: string) => axios.get(url).then((res) => res.data);

const PokemonCard: FC<IProps> = ({ url }) => {
  const { data } = useSWR(url, fetch, { errorRetryCount: 1 });

  const pokemonIdString = data ? "#" + getPokemonIdString(data.id) : "";
  const pokemonTypes = data?.types
    ? data.types
        ?.map(({ type }: { type: { name: string } }) => type.name)
        .join(", ")
    : [];

  return (
    <div className={styles.content}>
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
        <p>loading</p>
      )}
    </div>
  );
};

export default PokemonCard;
