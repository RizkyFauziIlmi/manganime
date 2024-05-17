"use client";

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CaretLeftIcon,
  CaretRightIcon,
  CountdownTimerIcon,
  MagnifyingGlassIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { TopAiringTab } from "./top-airing-tab";
import { RecentEpisodesTab } from "./recent-episodes-tab";
import { Button } from "@/components/ui/button";
import { useSeachAnime } from "@/hooks/use-anime-fetch";
import { useDebounceValue } from "usehooks-ts";
import { ExploreSkeleton } from "./explore-skeleton";
import { ExploreCard } from "./explore-card";

export const AnimeExplore = () => {
  const [input, setInput] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [type, setType] = React.useState(1);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [debouncedValue, setValue] = useDebounceValue(input, 500);
  const [currentTab, setCurrentTab] = React.useState<
    "top-airing" | "recent-episodes" | "search"
  >("top-airing");
  const { data, isLoading } = useSeachAnime(debouncedValue, page);

  return (
    <div>
      <div className="text-center pt-4 pb-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Discover the Trendsetters
        </h4>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight bg-gradient-to-b from-primary via-primary/80 to-background text-transparent inline-block bg-clip-text">
          Explore our Collection
        </h4>
      </div>
      <div>
        <Tabs
          defaultValue="recent-episodes"
          className="w-screen"
          value={currentTab}
          onValueChange={(e) => {
            setCurrentTab(e as "top-airing" | "recent-episodes" | "search");
            setPage(1);
            setHasNextPage(true);
            setInput("");
            setValue("");
          }}
        >
          <div className="w-full">
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center w-full justify-around">
              <div>
                <div className="flex gap-2">
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
                  <TabsList>
                    <TabsTrigger value="top-airing">
                      <StarFilledIcon className="w-4 h-4 mr-2" /> Top Airing
                    </TabsTrigger>
                    <TabsTrigger value="recent-episodes">
                      <CountdownTimerIcon className="w-4 h-4 mr-2" /> Recent
                      Episodes
                    </TabsTrigger>
                  </TabsList>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="secondary"
                          onClick={() => setPage(page + 1)}
                          disabled={!hasNextPage}
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
                {currentTab === "recent-episodes" && (
                  <Select
                    defaultValue="1"
                    onValueChange={(e) => {
                      setPage(1);
                      setHasNextPage(true);
                      setType(parseInt(e));
                    }}
                  >
                    <SelectTrigger
                      id="model"
                      className="items-start [&_[data-description]]:hidden mt-3"
                    >
                      <SelectValue placeholder="Select a language preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          {/* <Rabbit className="size-5" /> */}
                          <div className="grid gap-0.5">
                            <p>
                              1:{" "}
                              <span className="font-medium text-foreground">
                                JDES
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Japanese Dub, English Sub
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="2">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          {/* <Bird className="size-5" /> */}
                          <div className="grid gap-0.5">
                            <p>
                              2:{" "}
                              <span className="font-medium text-foreground">
                                EDNS
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              English Dub, No Sub
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="3">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          {/* <Turtle className="size-5" /> */}
                          <div className="grid gap-0.5">
                            <p>
                              3:{" "}
                              <span className="font-medium text-foreground">
                                CDES
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Chinese Dub, English Sub
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute mt-2 ml-2" />
                <Input
                  className="pl-8"
                  value={input}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value !== "") {
                      setCurrentTab("search");
                    } else {
                      setPage(1);
                      setHasNextPage(true);
                      setType(1);
                      setCurrentTab("top-airing");
                    }

                    setInput(e.target.value);
                  }}
                  placeholder="Search for anime"
                />
              </div>
            </div>
            <div className="flex items-center justify-around py-4">
              <TabsContent value="top-airing">
                {debouncedValue === "" && (
                  <TopAiringTab page={page} setHasNextPage={setHasNextPage} />
                )}
              </TabsContent>
              <TabsContent value="recent-episodes">
                {debouncedValue === "" && (
                  <RecentEpisodesTab
                    page={page}
                    type={type}
                    setHasNextPage={setHasNextPage}
                  />
                )}
              </TabsContent>
              <TabsContent value="search">
                {debouncedValue !== "" && data?.results.length !== 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
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
                {debouncedValue !== "" &&
                  data?.results.length === 0 &&
                  !isLoading && (
                    <div className="text-center w-full">
                      <h4 className="text-lg font-semibold">
                        No results found for {debouncedValue}
                      </h4>
                    </div>
                  )}
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
