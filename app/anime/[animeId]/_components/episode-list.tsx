"use client";

import { Button } from "@/components/ui/button";
import { useEpisodeStore } from "@/hooks/use-episode-store";
import { cn } from "@/lib/utils";
import { AnimeInfoData } from "@/types";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface EpisodeListProps {
  data: AnimeInfoData;
}

export const EpisodeList = ({ data }: EpisodeListProps) => {
  const { toast } = useToast();
  const { episodeData, setData } = useEpisodeStore();

  return (
    <div className="bg-background py-4 border-[0.1px] border-primary/20 rounded-lg max-h-screen overflow-auto">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1 h-8 rounded-e-md bg-red-500"></span>
          <Button
            size="icon"
            className="rounded-xl text-white bg-orange-500 hover:bg-orange-500"
          >
            <VideoIcon className="w-6 h-6" />
          </Button>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Episode List
          </h4>
        </div>
        <div className="flex justify-center gap-1">
          <Button
            size="icon"
            variant="outline"
            disabled={data.episodes[0] === episodeData}
            onClick={() => {
              const currentIndex = data.episodes.findIndex(
                (episode) => episode.id === episodeData.id,
              );
              const prevIndex = currentIndex - 1;
              const prevEpisode = data.episodes[prevIndex];
              if (!prevEpisode) return;
              setData(prevEpisode);
            }}
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          {episodeData.id && (
            <Select
              defaultValue={episodeData.id}
              onValueChange={(value) => {
                const episodeTarget = data.episodes.find(
                  (episode) => episode.id === value,
                );
                if (!episodeTarget) {
                  toast({
                    title: "Episode not found",
                    description: "Please select a valid episode",
                    variant: "destructive",
                  });
                  return;
                }
                setData(episodeTarget);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose Episode..." />
              </SelectTrigger>
              <SelectContent>
                {data.episodes.map((episode) => (
                  <SelectItem key={episode.id} value={episode.id}>
                    Episode {episode.number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Button
            size="icon"
            variant="outline"
            disabled={
              data.episodes[data.episodes.length - 1].id === episodeData.id
            }
            onClick={() => {
              const currentIndex = data.episodes.findIndex(
                (episode) => episode.id === episodeData.id,
              );
              const nextIndex = currentIndex + 1;
              const nextEpisode = data.episodes[nextIndex];
              if (!nextEpisode) return;
              setData(nextEpisode);
            }}
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="p-2 mt-2 space-y-4">
        {data.episodes.map((episode) => (
          <div
            key={episode.id}
            className={cn(
              episodeData.id === episode.id && "bg-accent",
              "flex items-center gap-2 cursor-pointer transition-all duration-300 border-[1px] border-primary/10 hover:bg-accent p-4 rounded-xl",
            )}
            onClick={() => setData(episode)}
          >
            <Button variant="outline" className="rounded-full" size="icon">
              {episode.number}
            </Button>

            <Image
              src={data.image}
              alt={episode.id}
              width={100}
              height={50}
              className="rounded-lg object-contain"
            />
            <div className="text-lg font-semibold">
              Episode {episode.number}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
