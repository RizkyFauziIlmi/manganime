"use client";

import { TitleHeader } from "./title-header";
import { ModeToggle } from "./mode-toggle";
import { ItemsHeader } from "./items-header";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { useEpisodeStore } from "@/hooks/use-episode-store";

export const MainHeader = () => {
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const { resetData } = useEpisodeStore();
  const location = usePathname();

  const isSecondRoutePath = location.split("/")[2] === undefined;

  React.useEffect(() => {
    if (isSecondRoutePath) {
      resetData();
    }
  }, [resetData, isSecondRoutePath]);

  return (
    <header className="border-[1px] bg-background border-x-primary/20 border-t-primary/30 w-11/12 md:w-2/3 mx-auto px-3 py-1 md:py-3 md:px-6 rounded-full mt-4 flex justify-between items-center">
      <div className="md:flex items-center gap-3 hidden">
        <TitleHeader title="Manganime" link="/" />
        <ItemsHeader />
      </div>
      <div className="md:hidden block">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="secondary">
              <HamburgerMenuIcon className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <TitleHeader setOpen={setSheetOpen} title="Manganime" link="/" />
              <ItemsHeader setOpen={setSheetOpen} />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
      </div>
    </header>
  );
};
