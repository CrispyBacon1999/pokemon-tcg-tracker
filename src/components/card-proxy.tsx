import { HoloCard, HoloEffectType } from "react-pokemon-card-effect";
import { Card } from "../types/card";
import "react-pokemon-card-effect/dist/assets/output-CMGRxOEV.css";
import "react-pokemon-card-effect/dist/assets/output-PGVy4a0q.css";

export default function CardProxy({ card }: { card: Card }) {
  const isShiny = card.number.startsWith("sv");
  const isGallery = !!card.number.match(/^[tg]g/i);
  // const isPromo = card.set.id === "swshp";

  return (
    <a href={card.tcgplayer.url} target="_blank">
      <div className="flex flex-col items-center">
        <img src={card.images.small} />
        <h2 className="text-lg">
          {card.number}/{card.set.printedTotal}
        </h2>
        <CardPrice card={card} />
      </div>
    </a>
  );
}

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function CardPrice({ card }: { card: Card }) {
  return (
    <div>
      {card.tcgplayer.prices["1stEditionHolofoil"] ? (
        <p>
          1st Edition Holofoil:{" "}
          {priceFormatter.format(
            card.tcgplayer.prices["1stEditionHolofoil"]?.market
          )}
        </p>
      ) : null}
      {card.tcgplayer.prices["1stEditionNormal"] ? (
        <p>
          1st Edition Normal:{" "}
          {priceFormatter.format(
            card.tcgplayer.prices["1stEditionNormal"]?.market
          )}
        </p>
      ) : null}
      {card.tcgplayer.prices.reverseHolofoil ? (
        <p>
          Reverse Holofoil:{" "}
          {priceFormatter.format(card.tcgplayer.prices.reverseHolofoil?.market)}
        </p>
      ) : null}
      {card.tcgplayer.prices.holofoil ? (
        <p>
          Holofoil:{" "}
          {priceFormatter.format(card.tcgplayer.prices.holofoil?.market)}
        </p>
      ) : null}
      {card.tcgplayer.prices.normal ? (
        <p>
          Normal: {priceFormatter.format(card.tcgplayer.prices.normal?.market)}
        </p>
      ) : null}
    </div>
  );
}
