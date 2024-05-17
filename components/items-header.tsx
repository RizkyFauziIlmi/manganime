"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { useToast } from "./ui/use-toast";

interface ItemsHeaderProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ItemsHeader = ({ setOpen }: ItemsHeaderProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const location = usePathname();

  const isAnimeRoute = location.split("/")[1] === "anime";
  const isMangaRoute = location.split("/")[1] === "manga";
  const isMovieRoute = location.split("/")[1] === "movie";

  const navigatePage = (url: string) => {
    router.push(url);
    if (setOpen) {
      setOpen(false);
    }
  };

  const toastUnderDev = (feature: string) => {
    toast({
      title: "Under Development",
      description: `${feature} is under development, please be patient`,
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2">
      <Button
        variant="ghost"
        className={cn(
          isAnimeRoute
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground",
          "rounded-full",
        )}
        onClick={() => navigatePage("/anime")}
      >
        Anime
      </Button>
      <Button
        variant="ghost"
        className={cn(
          isMangaRoute
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground",
          "rounded-full",
        )}
        onClick={() => toastUnderDev("Manga")}
      >
        Manga
      </Button>
      <Button
        variant="ghost"
        className={cn(
          isMovieRoute
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground",
          "rounded-full",
        )}
        onClick={() => toastUnderDev("Movie")}
      >
        Movie
      </Button>
    </div>
  );
};
