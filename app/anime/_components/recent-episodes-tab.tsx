import { useRecentEpisodes } from "@/hooks/use-anime-fetch";
import { ExploreSkeleton } from "./explore-skeleton";
import { ExploreCard } from "./explore-card";
import React from "react";

interface RecentEpisodesTabProps {
  page: number;
  type: number;
  setHasNextPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RecentEpisodesTab = ({
  page,
  type,
  setHasNextPage,
}: RecentEpisodesTabProps) => {
  const { data, isLoading } = useRecentEpisodes(page, type);

  React.useEffect(() => {
    if (data?.hasNextPage) {
      setHasNextPage(data.hasNextPage);
    }
  }, [data, setHasNextPage]);

  if (isLoading) return <ExploreSkeleton />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {data?.results.map((episode) => (
        <ExploreCard
          key={episode.episodeId}
          id={episode.id}
          episodeId={episode.episodeId}
          image={episode.image}
          title={episode.title}
          episodeNumber={episode.episodeNumber}
          episodeUrl={episode.url}
          type="episode"
        />
      ))}
    </div>
  );
};
