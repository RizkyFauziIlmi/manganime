import { useTopAiringAnimes } from "@/hooks/use-anime-fetch";
import React from "react";
import { ExploreCard } from "./explore-card";
import { ExploreSkeleton } from "./explore-skeleton";

interface TopAiringTabProps {
  page: number;
  setHasNextPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TopAiringTab = ({ page, setHasNextPage }: TopAiringTabProps) => {
  const { data, isLoading } = useTopAiringAnimes(page);

  React.useEffect(() => {
    if (data?.results.length === 0) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  }, [data, setHasNextPage]);

  if (isLoading) return <ExploreSkeleton />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {data?.results.map((anime) => (
        <ExploreCard
          key={anime.id}
          id={anime.id}
          image={anime.image}
          title={anime.title}
          genres={anime.genres}
          type="anime"
        />
      ))}
    </div>
  );
};
