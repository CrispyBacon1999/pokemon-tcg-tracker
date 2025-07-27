"use client";
import { useEffect, useState, useMemo } from "react";
import { searchBySet } from "../api/search";
import CardProxy from "../components/card-proxy";
import { Input } from "../components/ui/input";
import { Set } from "../types/set";
import { Button } from "../components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getSets } from "../api/sets";
import { Skeleton } from "../components/ui/skeleton";
import SearchDropdown from "../components/search-dropdown";
import { Card } from "../types/card";

export default function Home() {
  const sets = useQuery({
    queryKey: ["sets"],
    queryFn: async () => {
      const sets = await getSets();
      return sets.data;
    },
    staleTime: 1000 * 60 * 60 * 24,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [set, setSet] = useState<Set | undefined>(undefined);
  const [allCards, setAllCards] = useState<Card[]>([]);

  // Fetch all cards from the selected set
  const { data: cardData, isLoading } = useQuery({
    queryKey: ["cards", set?.id],
    queryFn: async () => {
      if (!set?.id) return { data: [] };
      // Fetch all cards from the set without name filtering
      const results = await searchBySet(undefined, set.id);
      return results;
    },
    enabled: !!set?.id,
    staleTime: 1000 * 60 * 60 * 12,
  });

  // Filter cards locally by name (case insensitive)
  const filteredCards = useMemo(() => {
    if (!searchQuery.trim()) {
      return allCards;
    }

    const query = searchQuery.toLowerCase();
    return allCards.filter((card) => card.name.toLowerCase().includes(query));
  }, [allCards, searchQuery]);

  // Update allCards when cardData changes
  useEffect(() => {
    if (cardData) {
      setAllCards(cardData.data || []);
    }
  }, [cardData]);

  useEffect(() => {
    if (sets.data && !set) {
      setSet(sets.data.find((set) => set.id === localStorage.getItem("set")));
    }
  }, [sets.data]);

  useEffect(() => {
    if (!set) return;

    const previousSet = localStorage.getItem("set");
    if (set?.id !== previousSet) {
      localStorage.setItem("set", set?.id ?? "");
      // Clear search query when changing sets
      setSearchQuery("");
      // Clear all cards when changing sets
      setAllCards([]);
    }
  }, [set]);

  return (
    <main className="flex flex-col items-center h-screen gap-4 p-4">
      <form
        className="flex flex-row gap-2 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          // No need to refetch since we're filtering locally
        }}
      >
        <SearchDropdown
          value={set?.id ?? ""}
          options={
            sets.data?.map((set) => ({
              value: set.id,
              label: `${set.id.toUpperCase()} - ${set.name}`,
              image: set.images.symbol,
            })) ?? []
          }
          onChange={(value) =>
            setSet(sets.data?.find((set) => set.id === value))
          }
        />

        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
          placeholder="Search cards by name..."
        />
        <Button variant="outline" type="submit">
          Search
        </Button>
      </form>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 grid-rows-auto gap-2 flex-wrap justify-center">
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="w-[300px] h-[420px]" />
              <Skeleton className="w-full h-4" />
            </div>
          ))}
        {filteredCards.map((card) => (
          <CardProxy key={card.id} card={card} />
        ))}
      </section>
    </main>
  );
}
