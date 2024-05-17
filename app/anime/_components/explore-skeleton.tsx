import { Skeleton } from "@/components/ui/skeleton";

export const ExploreSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="h-80 w-52 rounded-2xl" />
      ))}
    </div>
  );
};
