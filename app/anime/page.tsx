import { animeService } from "@/services/animeService";
import { HomeBanner } from "./_components/home-banner";
import { AnimeExplore } from "./_components/anime-explore";

export default async function AnimePage() {
  const topAiringAnime = await animeService.getTopAiringAnimes(1);

  for (let i = 0; i < topAiringAnime.results.length; i++) {
    const animeInfo = await animeService.getAnimeInfo(
      topAiringAnime.results[i].id
    );

    topAiringAnime.results[i].description = animeInfo.description;
  }

  return (
    <>
      <HomeBanner data={topAiringAnime} />
      <AnimeExplore />
    </>
  );
}
