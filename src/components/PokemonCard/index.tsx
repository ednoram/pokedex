import React from "react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

import {
  fetcher,
  processPokemonName,
  getPokemonIdString,
  getPokemonAvatarSrc,
  getPokemonTypesText,
  getPokemonRoute,
} from "utils/index";
import { Loader } from "components/index";

import { PokemonCardProps } from "./types";
import styles from "./PokemonCard.module.scss";

const IMAGE_RESOLUTION = 160;

const PokemonCard: React.FC<PokemonCardProps> = ({ url, className }) => {
  const { data, error } = useSWR(url, fetcher, { errorRetryCount: 1 });

  const pokemonIdString = data ? getPokemonIdString(data.id) : "";
  const pokemonTypes = getPokemonTypesText(data?.types);

  const containerClassNames = classNames(styles.content, className, {
    [styles.content_centered]: error || !data,
  });

  const pokemonRoute = data ? getPokemonRoute(data.name) : "";

  return (
    <div className={containerClassNames}>
      {!data && !error ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Link href={pokemonRoute}>
            <div className={styles.content__avatar}>
              <Image
                alt="pokemon avatar"
                width={IMAGE_RESOLUTION}
                height={IMAGE_RESOLUTION}
                src={getPokemonAvatarSrc(data.id)}
                className={styles.container__avatar__image}
              />
            </div>
          </Link>
          <div>
            <p className={styles.content__name}>
              {processPokemonName(data.name)}
            </p>
            <p className={styles.content__id}>#{pokemonIdString}</p>
            <p className={styles.content__types}>{pokemonTypes}</p>
          </div>
        </React.Fragment>
      )}
      {!!error && (
        <p className={styles.content__error}>Something went wrong!</p>
      )}
    </div>
  );
};

export default PokemonCard;
