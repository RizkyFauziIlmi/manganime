"use client";

import { Badge } from "@/components/ui/badge";
import { useEpisodeStore } from "@/hooks/use-episode-store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ExploreCardProps {
  id: string;
  episodeId?: string;
  subOrDub?: string;
  image: string;
  title: string;
  genres?: string[];
  episodeNumber?: number;
  releaseDate?: string;
  episodeUrl?: string;
  type: "anime" | "manga" | "movie" | "episode";
}

export const ExploreCard = ({
  id,
  episodeId,
  subOrDub,
  image,
  title,
  genres,
  episodeNumber,
  episodeUrl,
  releaseDate,
  type,
}: ExploreCardProps) => {
  const router = useRouter();
  const { setData } = useEpisodeStore();

  const url = `/${type === "episode" ? "anime" : type}/${id}`;

  return (
    <div
      className="h-80 w-52 relative overflow-hidden hover:border-[1px] hover:border-orange-300 transition-all duration-300 rounded-2xl group cursor-pointer"
      onClick={() => {
        if (type === "episode") {
          setData({
            id: episodeId as string,
            number: episodeNumber as number,
            url: episodeUrl as string,
          });
        }
        router.push(url);
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t transition-opacity duration-300 from-black via-transparent to-transparent z-40"></div>
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />
      <Badge className="absolute top-4 left-4 bg-yellow-300 rounded-full text-black hover:bg-yellow-300">
        {episodeNumber ? "New" : releaseDate ? "Hot" : "Trending"}
      </Badge>
      {episodeNumber && (
        <Badge className="bg-slate-900/50 absolute right-4 top-4 text-white">
          {episodeNumber} Episodes
        </Badge>
      )}
      {releaseDate && (
        <Badge className="bg-slate-900/50 absolute right-4 top-4 text-white">
          {releaseDate}
        </Badge>
      )}
      {subOrDub && (
        <Badge className="bg-slate-900/50 absolute right-4 top-4 text-white">
          {subOrDub}
        </Badge>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-center z-50">
        <small className="text-sm font-bold leading-none line-clamp-1 rounded-sm text-white group-hover:text-orange-400">
          {title}
        </small>
        {genres && (
          <div
            className={cn(
              genres.length <= 2 && "justify-center",
              "flex h-6 gap-2 overflow-auto mt-2",
            )}
          >
            {genres.map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
