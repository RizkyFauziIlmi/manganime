"use client";

import { useEpisodeStore } from "@/hooks/use-episode-store";
import { AnimeInfoData } from "@/types";

interface AnimeHeaderProps {
  data: AnimeInfoData;
}

export const AnimeHeader = ({ data }: AnimeHeaderProps) => {
  const { episodeData } = useEpisodeStore();

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${data.image})` }}
        className="absolute top-0 -z-20 right-0 left-0 h-2/3 bg-repeat bg-contain bg-center opacity-80"
      ></div>
      {/* overlay */}
      <div className="absolute top-0 right-0 -z-10 left-0 h-2/3 bg-gradient-to-t from-background"></div>
      <div className="flex flex-col items-center px-2 md:px-0 py-28 text-center">
        <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
          {data.title}: Episode {episodeData.number}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 w-2/3">
          {data.description}
        </p>
      </div>
    </div>
  );
};
