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
    if (data?.hasNextPage) {
      setHasNextPage(data.hasNextPage);
    }
  }, [data, setHasNextPage]);

  if (isLoading) return <ExploreSkeleton />;

  return (
    <div className="flex flex-wrap gap-4 justify-center">
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
