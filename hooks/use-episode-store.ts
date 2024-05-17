import { create } from "zustand";
import { AnimeEpisode } from "@/types";

interface EpisodeState {
  episodeData: AnimeEpisode;
  setData: (data: AnimeEpisode) => void;
  resetData: () => void;
}

export const useEpisodeStore = create<EpisodeState>()((set) => ({
  episodeData: {
    id: "",
    number: 0,
    url: "",
  },
  setData(data) {
    set(() => ({ episodeData: data }));
  },
  resetData() {
    set(() => ({ episodeData: { id: "", number: 0, url: "" } }));
  },
}));
