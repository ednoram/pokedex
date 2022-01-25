const getPokemonIdString = (id: number) => {
  return String(id).length < 3 ? ("00" + id).slice(-3) : String(id);
};

export default getPokemonIdString;
