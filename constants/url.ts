export const baseUrl = new URL("/", "http://0.0.0.0:3000");
export const serviceUrl = {
  BASE_ANIME_URL: baseUrl.origin + "/anime/gogoanime",
  BASE_MANGA_URL: baseUrl.origin + "/manga/mangadex",
  BASE_MOVIE_URL: baseUrl.origin + "/movies/dramacool",
};
