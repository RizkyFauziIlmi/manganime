"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

interface HeaderTitleProps {
  title: string;
  link?: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TitleHeader = ({ title, link, setOpen }: HeaderTitleProps) => {
  const router = useRouter();

  const onClick = () => {
    if (link) {
      router.push(link);
    }

    if (setOpen) {
      setOpen(false);
    }
  };

  return (
    <h3
      className={cn(
        link && "cursor-pointer",
        "scroll-m-20 text-xl font-semibold tracking-tight",
      )}
      onClick={onClick}
    >
      {title}
    </h3>
  );
};
