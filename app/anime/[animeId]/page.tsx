import { animeService } from "@/services/animeService";
import { AnimeHeader } from "./_components/anime-header";
import { AnimeDetail } from "./_components/anime-detail";
import { EpisodeList } from "./_components/episode-list";

export default async function AnimeIdPage({
  params,
}: {
  params: { animeId: string };
}) {
  const anime = await animeService.getAnimeInfo(params.animeId);

  return (
    <div>
      <AnimeHeader data={anime} />
      <div className="flex flex-col p-4 md:p-0 md:flex-row gap-4 justify-center">
        <AnimeDetail data={anime} />
        <EpisodeList data={anime} />
      </div>
    </div>
  );
}
