import { animeService } from "@/services/animeService";
import {
  AnimeInfoData,
  AnimeRecentEpisodesData,
  AnimeSearchData,
  AnimeTopAiringData,
  AnimeServersAvailableData,
  AnimeStreamLinksData,
} from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useTopAiringAnimes = (page?: number) => {
  return useQuery<AnimeTopAiringData>({
    queryKey: ["topAiringAnimes", page],
    queryFn: () => animeService.getTopAiringAnimes(page),
  });
};

export const useRecentEpisodes = (page?: number, type?: number) => {
  return useQuery<AnimeRecentEpisodesData>({
    queryKey: ["recentEpisodes", page, type],
    queryFn: () => animeService.getRecentEpisodes(page, type),
  });
};

export const useSeachAnime = (query: string, page?: number) => {
  return useQuery<AnimeSearchData>({
    queryKey: ["searchAnime", query, page],
    queryFn: () => animeService.search(query, page),
  });
};

export const useAnimeInfo = (id: string) => {
  return useQuery<AnimeInfoData>({
    queryKey: ["animeInfo", id],
    queryFn: () => animeService.getAnimeInfo(id),
  });
};

export const useServersAvailable = (episodeId: string) => {
  return useQuery<AnimeServersAvailableData>({
    queryKey: ["animeServers", episodeId],
    queryFn: () => animeService.getAvailableServers(episodeId),
  });
};

export const useStreamLinks = (
  episodeId: string,
  server?: "gogocdn" | "streamsb" | "vidstreaming",
) => {
  return useQuery<AnimeStreamLinksData>({
    queryKey: ["animeStreamLinks", episodeId, server],
    queryFn: () => animeService.getStreamLinks(episodeId, server),
  });
};
