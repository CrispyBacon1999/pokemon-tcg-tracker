import { CardmarketPrice, TcgPrice } from "./price";
import { Set } from "./set";

export type Card = {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  level: string;
  hp: string;
  types: string[];
  evolvesFrom: string;
  evolvesTo: string[];
  rules: string[];
  ancientTrait: {
    name: string;
    text: string;
  }
  abilities: {
    name: string;
    text: string;
    type: string;
  }[]
  attacks: {
    cost: string[];
    name: string;
    text: string;
    damage: string;
    convertedEnergyCost: number;
  }[]
  weaknesses: {
    type: string;
    value: string;
  }[]
  resistances: {
    type: string;
    value: string;
  }[]
  retreatCost: string[];
  convertedRetreatCost: number;
  set: Set;
  number: string;
  artist: string;
  rarity: string;
  flavorText: string;
  nationalPokedexNumbers: number[];
  legalities: {
    format: string;
    legality: string;
  }[]
  images: {
    small: string;
    large: string;
  }
  tcgplayer: {
    url: string;
    updatedAt: string;
    prices: {
      normal?: TcgPrice;
      holofoil?: TcgPrice;
      reverseHolofoil?: TcgPrice;
      "1stEditionHolofoil"?: TcgPrice;
      "1stEditionNormal"?: TcgPrice;
    }
  }
  cardmarket: {
    url: string;
    updatedAt: string;
    prices: CardmarketPrice;
  }
}