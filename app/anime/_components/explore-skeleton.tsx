import { Skeleton } from "@/components/ui/skeleton";

export const ExploreSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="h-80 w-52 rounded-2xl" />
      ))}
    </div>
  );
};
