"use server";

import { cache } from 'react';
import { Set } from "../types/set";

const getSetsData = async () => {
  const response = await fetch("https://api.pokemontcg.io/v2/sets?orderBy=-releaseDate", {
    headers: {
      "X-Api-Key": process.env.TCG_API_KEY!,
    },
    next: {
      revalidate: 86400 // 24 hours in seconds
    }
  });
  const data = await response.json() as { data: Set[] };
  return data;
};

export const getSets = cache(getSetsData);

