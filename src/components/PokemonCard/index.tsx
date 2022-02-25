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
} from "utils/index";
import { Loader } from "components/index";

import styles from "./PokemonCard.module.scss";

interface IProps {
  url: string;
}

const PokemonCard: React.FC<IProps> = ({ url }) => {
  const { data, error } = useSWR(url, fetcher, { errorRetryCount: 1 });

  const pokemonIdString = data ? "#" + getPokemonIdString(data.id) : "";
  const pokemonTypes = getPokemonTypesText(data?.types);

  const containerClassNames = classNames(styles.content, {
    [styles.content_centered]: error || !data,
  });

  return (
    <div className={containerClassNames}>
      {data ? (
        <>
          <Link href={`/pokemon/${data.name}`}>
            <div className={styles.content__avatar}>
              <Image
                width={150}
                height={150}
                alt="pokemon avatar"
                src={getPokemonAvatarSrc(data.id)}
                className={styles.container__avatar__image}
              />
            </div>
          </Link>
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
