"use client";
import { useEffect, useState } from "react";
import { searchBySet } from "../api/search";
import CardProxy from "../components/card-proxy";
import { Input } from "../components/ui/input";
import { Set } from "../types/set";
import { Button } from "../components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getSets } from "../api/sets";
import { Skeleton } from "../components/ui/skeleton";
import SearchDropdown from "../components/search-dropdown";
import { debounce } from "@tanstack/pacer";

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
  const debouncedSearch = debounce((search: string) => refetch(), {
    wait: 500,
  });
  const [set, setSet] = useState<Set | undefined>(undefined);
  const {
    data: cardData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cards", searchQuery, set?.id],
    queryFn: async () => {
      const results = await searchBySet(searchQuery, set?.id);
      return results.data;
    },
    enabled: false,
    staleTime: 1000 * 60 * 60 * 12,
  });

  const cards = cardData ?? [];

  useEffect(() => {
    if (sets.data && !set) {
      setSet(sets.data.find((set) => set.id === localStorage.getItem("set")));
    }
  }, [sets.data]);

  useEffect(() => {
    if (searchQuery && set) {
      debouncedSearch(searchQuery);
    }
  }, [searchQuery, set]);

  useEffect(() => {
    if (!set) return;

    const previousSet = localStorage.getItem("set");
    if (set?.id !== previousSet) {
      localStorage.setItem("set", set?.id ?? "");
      refetch();
    }
  }, [set]);

  return (
    <main className="flex flex-col items-center h-screen gap-4 p-4">
      <form
        className="flex flex-row gap-2 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          refetch();
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
        {cards.map((card) => (
          <CardProxy key={card.id} card={card} />
        ))}
      </section>
    </main>
  );
}
