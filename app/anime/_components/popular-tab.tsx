import { usePopularAnime } from "@/hooks/use-anime-fetch";
import React from "react";
import { ExploreSkeleton } from "./explore-skeleton";
import { ExploreCard } from "./explore-card";

interface PopularTabProps {
  page: number;
  setHasNextPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PopularTab = ({ page, setHasNextPage }: PopularTabProps) => {
  const { data, isLoading } = usePopularAnime(page);

  React.useEffect(() => {
    if (data?.hasNextPage) {
      setHasNextPage(data.hasNextPage);
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
          releaseDate={anime.releaseDate}
          type="anime"
        />
      ))}
    </div>
  );
};
