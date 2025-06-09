"use server";

import { cache } from 'react';
import { Card } from "../types/card";

const getSearchResults = async (queryString: string) => {
  const response = await fetch(`https://api.pokemontcg.io/v2/cards${queryString}`, {
    headers: {
      "X-Api-Key": process.env.TCG_API_KEY!,
    },
    next: {
      revalidate: 21600 // 6 hours in seconds
    }
  });
  const data = await response.json() as { data: Card[] };
  return data;
};

export const searchBySet = cache(async (query: string | undefined, set: string | undefined) => {
  let queryString = "?q="

  if (!query && !set) {
    return { data: [] };
  }

  if (query) {
    queryString += `name:"*${query.replace(" ", "%20")}*"`
  }

  if (set) {
    if (query) queryString += "+";
    queryString += `set.id:${set}`
  }

  // Order by price
  queryString += "&orderBy=-tcgplayer.prices.holofoil.market,-tcgplayer.prices.reverseHolofoil.market,-tcgplayer.prices.normal.market"

  // console.log(queryString);

  return getSearchResults(queryString);
});
