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
import PokemonStats from "./PokemonStats/index";
import PokemonInfoGrid from "./PokemonInfoGrid/index";

interface IProps {
  genders: string[];
  pokemonData: IPokemonData;
  pokemonSpecies: IPokemonSpecies;
}

const PokemonPageContainer: React.FC<IProps> = ({
  genders,
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
        <a className={styles.container__back}>← Explore more Pokémon</a>
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
          <PokemonInfoGrid
            genders={genders}
            pokemonData={pokemonData}
            pokemonSpecies={pokemonSpecies}
          />
          <PokemonStats pokemonStats={pokemonData.stats} />
        </div>
      </div>
    </div>
  );
};

export default PokemonPageContainer;
