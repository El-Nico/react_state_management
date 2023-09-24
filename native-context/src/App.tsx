import { useState, useEffect, createContext, useContext } from "react";

//create a pokemon type
interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

//custom hook gets all  pokemon data form json file
function usePokemonSource(): {
  pokemon: Pokemon[];
} {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  //get pokemon from file
  useEffect(() => {
    fetch("/pokemon.json")
      .then((response) => response.json())
      .then((data) => setPokemon(data));
  }, []);

  return { pokemon };
}

//use context is a form of storing data universally axcessible
//by all components on file, without passing it indivuually
//through propls
const PokemonContext = createContext<ReturnType<typeof usePokemonSource>>(
  {} as unknown as ReturnType<typeof usePokemonSource>
);

function usePokemon() {
  return useContext(PokemonContext);
}

const PokemonList = () => {
  const { pokemon } = usePokemon();
  return (
    <div>
      {pokemon.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
};

function App() {
  return (
    <PokemonContext.Provider value={usePokemonSource()}>
      <PokemonList />
    </PokemonContext.Provider>
  );
}

export default App;
