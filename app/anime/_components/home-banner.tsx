"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { AnimeTopAiringData } from "@/types";
import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

interface HomeBannerProps {
  data: AnimeTopAiringData;
}

export const HomeBanner = ({ data }: HomeBannerProps) => {
  const router = useRouter();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full py-6">
      <Carousel
        setApi={setApi}
        className="w-4/5 flex items-center mx-auto"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        opts={{ align: "center", loop: true }}
      >
        <CarouselContent>
          {data.results.map((value) => (
            <CarouselItem key={value.id}>
              <Card className="relative h-[60vh] overflow-hidden rounded-3xl group">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-40"></div>
                <Image
                  src={value.image}
                  alt={value.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="absolute inset-0 object-cover object-center"
                />
                <div className="h-full w-full flex flex-col gap-4 justify-center pl-4 md:pl-24">
                  <h4 className="scroll-m-20 text-2xl font-semibold text-white tracking-tight z-50">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground md:w-96 line-clamp-2 md:line-clamp-3 z-50">
                    {value.description}
                  </p>
                  <div className="flex flex-col gap-2">
                    <Button
                      className="z-50 w-fit rounded-full hover:bg-background cursor-text"
                      variant="outline"
                      size="sm"
                    >
                      <span
                        className={cn(
                          isDark ? "text-blue-300" : "text-blue-500",
                          "pr-2",
                        )}
                      >
                        Genre:{" "}
                      </span>
                      <div className="gap-1 flex md:flex-nowrap flex-wrap">
                        {value.genres.map((genre, index) => (
                          <>
                            {index === 0 ? " " : <span>&bull;</span>}
                            <span key={genre}>{genre}</span>
                          </>
                        ))}
                      </div>
                    </Button>
                    <Button
                      className="z-50 w-fit"
                      onClick={() => router.push(`/anime/${value.id}`)}
                    >
                      Watch Now
                    </Button>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
      <div className="py-2 text-center space-x-[3px] text-muted-foreground">
        {Array.from({ length: count }).map((_, index) => (
          <span
            key={"span_in_ap" + index}
            className={cn(
              index === current - 1 ? "text-primary" : "",
              "text-xl cursor-pointer",
            )}
            onClick={() => api?.scrollTo(index)}
          >
            &#8213;
          </span>
        ))}
      </div>
    </div>
  );
};
