import qs from "qs";

export function updateUrl(
  baseUrl: URL,
  additionalPath: string,
  queryParams: Object,
) {
  // Clone the baseUrl to avoid mutating the original URL object
  const url = new URL(baseUrl);

  // Add the additional path to the base URL
  url.pathname = `${url.pathname.replace(/\/$/, "")}/${additionalPath.replace(/^\//, "")}`;

  // Check if queryParams is provided and not null or undefined
  if (queryParams) {
    // Stringify the query parameters
    const queryString = qs.stringify(queryParams);

    // Set the search query of the URL
    url.search = queryString;
  }

  // Return the updated URL as a string
  return url.toString();
}
