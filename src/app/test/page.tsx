import { PokemonCard } from "../../components/card";

export default function Test() {
  return (
    <div className="flex flex-col gap-4 w-screen min-h-screen justify-center items-center">
      <PokemonCard
        imageUrl="https://images.pokemontcg.io/sv10/231.png"
        foilType="holofoil"
      />
      <PokemonCard
        imageUrl="https://images.pokemontcg.io/sv10/231.png"
        foilType="cosmos"
      />
      <PokemonCard
        imageUrl="https://images.pokemontcg.io/sv10/231.png"
        foilType="full-art"
      />
      <PokemonCard
        imageUrl="https://images.pokemontcg.io/sv10/231.png"
        foilType="reverse-holofoil"
      />
      <PokemonCard
        imageUrl="https://images.pokemontcg.io/sv10/231.png"
        foilType="shining"
      />
    </div>
  );
}
