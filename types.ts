export type AnimeSearchData = {
  currentPage: number;
  hasNextPage: boolean;
  results: AnimeSearch[];
};

export type AnimeRecentEpisodesData = {
  currentPage: number;
  hasNextPage: boolean;
  results: AnimeRecentEpisode[];
};

export type AnimeTopAiringData = {
  currentPage: number;
  hasNextPage: boolean;
  results: AnimeTopAiring[];
};

export type AnimeInfoData = {
  id: string;
  title: string;
  url: string;
  image: string;
  releaseDate: string | null;
  description: string | null;
  genres: string[];
  subOrDub: string;
  type: string | null;
  status: string;
  otherName: string | null;
  totalEpisodes: 0;
  episodes: AnimeEpisode[];
};

export type AnimeStreamLinksData = {
  headers: {
    Referer: string;
    watchsb: string | null;
    UserAgent: string | null;
  };
  sources: StreamLink[];
  download: string;
};

export type AnimeServersAvailableData = ServersAvailable[];

export type ErrorType = {
  message: Object;
};

export type AnimePopularData = {
  currentPage: number;
  hasNextPage: boolean;
  results: PopularAnime[];
};

export type PopularAnime = {
  id: string;
  title: string;
  releaseDate: string;
  image: string;
  url: string;
};

type ServersAvailable = {
  name: string;
  url: string;
};

type StreamLink = {
  url: string;
  quality: string;
  isM3U8: boolean;
};

export type AnimeEpisode = {
  id: string;
  number: number;
  url: string;
};

type AnimeTopAiring = {
  id: string;
  title: string;
  image: string;
  description?: string | null;
  status?: string | null;
  url: string;
  genres: string[];
};

type AnimeRecentEpisode = {
  id: string;
  episodeId: string;
  episodeNumber: number;
  title: string;
  image: string;
  url: string;
};

type AnimeSearch = {
  id: string;
  title: string;
  url: string;
  image: string;
  releaseDate: string | null;
  subOrDub: string;
};
