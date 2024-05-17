"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export const SearchButton = () => {
  return (
    <Button variant="outline" className="rounded-full" size="icon">
      <MagnifyingGlassIcon />
    </Button>
  );
};
