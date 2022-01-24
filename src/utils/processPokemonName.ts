const processPokemonName = (name: string): string =>
  name.slice(0, name.indexOf("-") > -1 ? name.indexOf("-") : name.length);

export default processPokemonName;
