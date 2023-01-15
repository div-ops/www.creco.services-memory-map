import { useQuery } from "@tanstack/react-query";
import { fetchMemory } from "../api/fetchMemory";

export function useMemory({ id }: { id: string }) {
  const {
    data: memory,
    refetch,
    isLoading,
  } = useQuery(["fetchMemory", `${id}`], async () => {
    if (id === undefined) {
      return null;
    }

    return (await fetchMemory({ id })).data;
  });

  return [memory, refetch, isLoading] as const;
}
