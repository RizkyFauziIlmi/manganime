import { serviceUrl } from "@/constants/url";
import {
  AnimeInfoData,
  AnimeRecentEpisodesData,
  AnimeSearchData,
  AnimeServersAvailableData,
  AnimeStreamLinksData,
  AnimeTopAiringData,
} from "@/types";
import qs from "qs";

const baseUrl = serviceUrl.BASE_ANIME_URL;

export const animeService = {
  search: async (query: string, page?: number) => {
    // eg: /naruto?page=1
    const url =
      baseUrl + `/${query}` + qs.stringify({ page }, { addQueryPrefix: true });

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    data.currentPage = Number(data.currentPage);

    return data as AnimeSearchData;
  },
  /*
    The type of anime to get,
    i.e. sub or dub. 1: Japanese Dub, English Sub;
    2: English Dub, No Sub;
    3: Chinese Dub, English Sub.
  */
  getRecentEpisodes: async (page?: number, type?: number) => {
    // eg: /recent-episodes?page=1&?type=2
    const url =
      baseUrl +
      "/recent-episodes" +
      qs.stringify({ page, type }, { addQueryPrefix: true });

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    data.currentPage = Number(data.currentPage);

    return data as AnimeRecentEpisodesData;
  },
  getTopAiringAnimes: async (page?: number) => {
    // eg: /top-airing?page=1
    const url =
      baseUrl +
      "/top-airing" +
      qs.stringify({ page }, { addQueryPrefix: true });

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    data.currentPage = Number(data.currentPage);

    return data as AnimeTopAiringData;
  },
  getAnimeInfo: async (id: string) => {
    // eg: info/spy-x-family
    const url = baseUrl + `/info/${id}`;

    const response = await fetch(url);

    if (response.status === 404) {
      throw new Error("Anime not found");
    } else if (response.status === 500) {
      throw new Error("Internal server error");
    }

    const data = await response.json();

    return data as AnimeInfoData;
  },
  getStreamLinks: async (
    episodeId: string,
    server?: "gogocdn" | "streamsb" | "vidstreaming",
  ) => {
    // eg: /watch/spy-x-family-episode-1?server=vidstreaming
    const url =
      baseUrl +
      `/watch/${episodeId}` +
      qs.stringify({ server }, { addQueryPrefix: true });

    const response = await fetch(url);

    if (response.status === 404) {
      throw new Error("Stream links not found");
    } else if (response.status === 500) {
      throw new Error("Internal server error");
    }

    const data = await response.json();

    return data as AnimeStreamLinksData;
  },
  getAvailableServers: async (episodeId: string) => {
    // eg: servers/spy-x-family-episode-1
    const url = baseUrl + `/servers/${episodeId}`;

    const response = await fetch(url);

    if (response.status === 404) {
      throw new Error("Servers not found");
    } else if (response.status === 500) {
      throw new Error("Internal server error");
    }

    const data = await response.json();

    return data as AnimeServersAvailableData;
  },
};
