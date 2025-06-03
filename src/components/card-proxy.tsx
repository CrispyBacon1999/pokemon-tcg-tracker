import { Card } from "../types/card";
import "react-pokemon-card-effect/dist/assets/output-CMGRxOEV.css";
import "react-pokemon-card-effect/dist/assets/output-PGVy4a0q.css";
import { type FoilType, PokemonCard } from "./card";

const rarityToFoilType: Record<string, FoilType> = {
  Common: "none",
  Uncommon: "holofoil",
  Rare: "reverse-holofoil",
  "Double Rare": "cosmos",
  "Ultra Rare": "full-art",
  "Hyper Rare": "cosmos",
  "Special Illustration Rare": "full-art", // Need actual effect for this
  "Illustration Rare": "full-art",
  "ACE SPEC Rare": "ace-spec", // This is pink trainer cards
  // "ACE SPEC Ultra Rare": "full-art", // This is pink trainer cards
};

export default function CardProxy({ card }: { card: Card }) {
  console.log(card);

  return (
    <div className="flex flex-col items-center">
      <a href={card.tcgplayer?.url} target="_blank">
        <PokemonCard
          imageUrl={card.images.large}
          foilType={rarityToFoilType[card.rarity] ?? "none"}
        />
      </a>
      <h2 className="text-lg">
        {card.number}/{card.set.printedTotal}
      </h2>
      <CardPrice card={card} />
    </div>
  );
}

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function CardPrice({ card }: { card: Card }) {
  if (!card.tcgplayer?.prices) return null;
  return (
    <div>
      {card.tcgplayer?.prices["1stEditionHolofoil"] ? (
        <p>
          1st Edition Holofoil:{" "}
          {priceFormatter.format(
            card.tcgplayer?.prices["1stEditionHolofoil"]?.market
          )}
        </p>
      ) : null}
      {card.tcgplayer?.prices["1stEditionNormal"] ? (
        <p>
          1st Edition Normal:{" "}
          {priceFormatter.format(
            card.tcgplayer?.prices["1stEditionNormal"]?.market
          )}
        </p>
      ) : null}
      {card.tcgplayer?.prices.reverseHolofoil ? (
        <p>
          Reverse Holofoil:{" "}
          {priceFormatter.format(card.tcgplayer.prices.reverseHolofoil?.market)}
        </p>
      ) : null}
      {card.tcgplayer?.prices.holofoil ? (
        <p>
          Holofoil:{" "}
          {priceFormatter.format(card.tcgplayer.prices.holofoil?.market)}
        </p>
      ) : null}
      {card.tcgplayer?.prices.normal ? (
        <p>
          Normal: {priceFormatter.format(card.tcgplayer.prices.normal?.market)}
        </p>
      ) : null}
    </div>
  );
}
