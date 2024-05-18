"use client";

import { useAnimeByGenre, useGenreList } from "@/hooks/use-anime-fetch";
import React, { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  CaretLeftIcon,
  CaretRightIcon,
  CaretSortIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { ExploreCard } from "./explore-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExploreSkeleton } from "./explore-skeleton";

export const AnimeGenre = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("action");
  const [page, setPage] = useState(1);
  const genreList = useGenreList();
  const animesByGenre = useAnimeByGenre(value, page);

  return (
    <div className="py-12 px-6 md:px-16">
      <p className="uppercase whitespace-nowrap tracking-widest">Genre</p>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        #
        {genreList.data?.find((genre) => genre.id === value)?.title || "Action"}
      </h3>

      <div className="flex justify-between">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value && genreList?.data
                ? genreList?.data?.find((genre) => genre.id === value)?.title
                : "Action"}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Genre..." />
              <CommandEmpty>No genre found.</CommandEmpty>
              <CommandGroup className="max-h-96 overflow-auto">
                {genreList?.data?.map((genre) => (
                  <CommandItem
                    key={genre.id}
                    value={genre.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === genre.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {genre.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setPage(page === 1 ? 1 : page - 1)}
                  disabled={page === 1}
                >
                  <CaretLeftIcon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Previous Page ({page})</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setPage(page + 1)}
                  disabled={!animesByGenre?.data?.hasNextPage}
                >
                  <CaretRightIcon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Next Page ({page})</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap justify-center p-4">
        {animesByGenre?.data?.results.map((anime) => (
          <ExploreCard
            id={anime.id}
            key={anime.id}
            image={anime.image}
            releaseDate={anime.released}
            title={anime.title}
            type="anime"
          />
        ))}
      </div>
      {animesByGenre.isLoading && <ExploreSkeleton />}
    </div>
  );
};
