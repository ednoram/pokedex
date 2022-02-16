const processPokemonName = (name: string): string => {
  const nameSlice = name.includes("-")
    ? name.slice(0, name.indexOf("-"))
    : name;

  return nameSlice[0].toUpperCase() + nameSlice.slice(1);
};

export default processPokemonName;
