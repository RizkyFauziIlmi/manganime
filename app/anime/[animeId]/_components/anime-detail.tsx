"use client";

import { Button } from "@/components/ui/button";
import { AnimeInfoData } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ReactPlayer from "react-player";
import {
  DownloadIcon,
  ExclamationTriangleIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";
import { useEpisodeStore } from "@/hooks/use-episode-store";
import { useStreamLinks } from "@/hooks/use-anime-fetch";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { useBoolean } from "usehooks-ts";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface AnimeDetailProps {
  data: AnimeInfoData;
}

export const AnimeDetail = ({ data }: AnimeDetailProps) => {
  const { toast } = useToast();
  const [value, setValue] = React.useState<
    "gogocdn" | "streamsb" | "vidstreaming"
  >("gogocdn");
  const [resolutionIndex, setResolutionIndex] = React.useState(0);
  const isAutoFoward = useBoolean(false);
  const { episodeData, setData } = useEpisodeStore();
  const [videoUrl, setVideoUrl] = React.useState("");
  const [videoTimestamp, setVideoTimestamp] = React.useState(0);
  const streamlinks = useStreamLinks(episodeData.id, value);
  const videoRef = React.useRef<ReactPlayer>(null);

  React.useEffect(() => {
    // set first episode when episodeData.id is empty
    if (episodeData.id === "") {
      setData({
        id: data.episodes[0].id,
        number: data.episodes[0].number,
        url: data.episodes[0].url,
      });
    }
  }, [setData, data.episodes, episodeData.id]);

  React.useEffect(() => {
    // set video url when variable changes
    setVideoUrl(streamlinks.data?.sources[resolutionIndex].url as string);
  }, [streamlinks, resolutionIndex]);

  // reset video timestamp when episode changes
  React.useEffect(() => {
    setVideoTimestamp(0);
  }, [episodeData.id]);

  const handleAutoFoward = () => {
    const isLastVideo = data.episodes.length === episodeData.number;
    if (isAutoFoward.value && !isLastVideo) {
      setData(
        data.episodes[
          episodeData.number === 0 ? episodeData.number + 1 : episodeData.number
        ],
      );
    }
  };

  return (
    <div className="space-y-4 w-full md:w-1/2 px-2 pb-4">
      {streamlinks.isLoading ? (
        <Skeleton className="h-[220px] md:h-[23rem] w-full rounded-xl" />
      ) : (
        <div
          className={cn(
            streamlinks.isLoading && "pointer-events-none opacity-50",
            "rounded-xl w-full overflow-hidden bg-background",
          )}
        >
          <ReactPlayer
            ref={videoRef}
            url={videoUrl}
            controls
            playing
            width="100%"
            height="100%"
            onEnded={handleAutoFoward}
            onReady={() => videoRef.current?.seekTo(videoTimestamp)}
            stopOnUnmount
          />
        </div>
      )}
      <div>
        <p className="text-xl line-clamp-1 w-96 text-muted-foreground">
          {data.title} {data.otherName}
        </p>
        <p className="text-xs line-clamp-2 w-96 text-muted-foreground">
          {data.otherName}
        </p>
      </div>
      {videoUrl === "" && !streamlinks.isLoading && (
        <Alert>
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Link Required</AlertTitle>
          <AlertDescription>Select your video resolution!</AlertDescription>
        </Alert>
      )}
      <div className="space-x-2 flex overflow-auto">
        {data.genres.map((genre) => (
          <Button
            key={genre}
            variant="outline"
            className="rounded-full hover:bg-background cursor-text"
          >
            {genre}
          </Button>
        ))}
      </div>
      <div className="flex overflow-auto gap-2 w-full">
        <Select
          value={value}
          onValueChange={(e) =>
            setValue(e as "gogocdn" | "streamsb" | "vidstreaming")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Servers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gogocdn">Gogocdn</SelectItem>
            <SelectItem value="streamsb">Streamsb</SelectItem>
            <SelectItem value="vidstreaming">Vidstreaming</SelectItem>
          </SelectContent>
        </Select>
        {streamlinks.data && (
          <div className="space-x-2 inline-flex flex-grow-0">
            {streamlinks.data.sources.map((source, index) => (
              <Button
                key={source.url}
                onClick={() => {
                  setResolutionIndex(index);
                  setVideoUrl(source.url);
                  setVideoTimestamp(
                    videoRef.current?.getCurrentTime() as number,
                  );
                }}
                className={cn(
                  index === resolutionIndex &&
                    "bg-orange-500 text-white hover:bg-orange-500 cursor-text",
                )}
              >
                {source.quality}
              </Button>
            ))}
          </div>
        )}
      </div>
      {streamlinks.data && (
        <Button asChild>
          <Link href={streamlinks.data.download} target="_blank">
            <DownloadIcon className="h-4 w-4 mr-2" /> Download
          </Link>
        </Button>
      )}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Description</AccordionTrigger>
          <AccordionContent>
            <small className="text-sm w-full font-medium leading-none flex-1 flex">
              {data.description}
            </small>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <div className="space-y-0.5">
          <p className="font-semibold text-sm">Auto Foward</p>
          <p className="text-xs">
            Video will go to the next playlist if active.
          </p>
        </div>
        <Switch
          checked={isAutoFoward.value}
          onCheckedChange={(value) => {
            toast({
              title: value ? "AutoFoward Active" : "AutoFoward Inactive",
              description: value
                ? "This playlist will go to next video automatically"
                : "This playlist would't go to next video automatically",
            });
            isAutoFoward.setValue(value);
          }}
        />
      </div>
      <Alert>
        <MagicWandIcon className="h-4 w-4" />
        <AlertTitle>More details!</AlertTitle>
        <AlertDescription>
          This anime was released on{" "}
          <span className="font-bold">{data.releaseDate}</span>, with a status
          of <span className="font-bold">{data.status}</span>. It has a total of{" "}
          <span className="font-bold">{data.totalEpisodes} episodes</span> and
          is available in <span className="font-bold">{data.subOrDub}</span>{" "}
          format.
        </AlertDescription>
      </Alert>
    </div>
  );
};
