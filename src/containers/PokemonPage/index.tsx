import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  getPokemonIdString,
  processPokemonName,
  getPokemonAvatarSrc,
  getPokemonFlavorText,
} from "utils/index";
import { Loader } from "components/index";
import { IPokemonData, IPokemonSpecies } from "types/index";

import styles from "./PokemonPage.module.scss";

interface IProps {
  pokemonData: IPokemonData;
  pokemonSpecies: IPokemonSpecies;
}

const PokemonPageContainer: React.FC<IProps> = ({
  pokemonData,
  pokemonSpecies,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingImage(false);
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const idString = getPokemonIdString(pokemonData.id);
  const flavorText = getPokemonFlavorText(pokemonSpecies);
  const processedName = processPokemonName(pokemonData.name);
  const avatarImageSrc = getPokemonAvatarSrc(pokemonData.id, { full: true });

  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.container__back}>{`<`} Pokédex</a>
      </Link>
      <h1 className={styles.container__title}>
        {processedName} #{idString}
      </h1>
      <div className={styles.container__content}>
        <div className={styles.container__content__avatar}>
          {!loadingImage ? (
            <Image
              width={430}
              height={430}
              priority={true}
              src={avatarImageSrc}
            />
          ) : (
            <Loader />
          )}
        </div>
        <div>
          <p className={styles.container__content__flavor_text}>{flavorText}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonPageContainer;
