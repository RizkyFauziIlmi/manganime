import { ExploreCard } from "./explore-card";
import { ExploreSkeleton } from "./explore-skeleton";
import React from "react";
import { useSeachAnime } from "@/hooks/use-anime-fetch";

interface SearchTabProps {
  debouncedValue: string;
  page: number;
  setHasNextPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchTab = ({
  debouncedValue,
  page,
  setHasNextPage,
}: SearchTabProps) => {
  const { data, isLoading } = useSeachAnime(debouncedValue, page);

  React.useEffect(() => {
    if (data?.hasNextPage) {
      setHasNextPage(data.hasNextPage);
    }
  }, [data, setHasNextPage]);

  return (
    <React.Fragment>
      {debouncedValue !== "" && data?.results.length !== 0 && (
        <div className="flex flex-wrap gap-4 justify-center">
          {data?.results.map((anime) => (
            <ExploreCard
              key={anime.id}
              id={anime.id}
              title={anime.title}
              image={anime.image}
              subOrDub={anime.subOrDub}
              type="anime"
            />
          ))}
        </div>
      )}
      {isLoading && debouncedValue !== "" && <ExploreSkeleton />}
      {debouncedValue !== "" && data?.results.length === 0 && !isLoading && (
        <div className="text-center w-full">
          <h4 className="text-lg font-semibold">
            No results found for {debouncedValue}
          </h4>
        </div>
      )}
    </React.Fragment>
  );
};
