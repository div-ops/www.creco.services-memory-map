import { useQuery } from "@tanstack/react-query";
import { MemoryAPI } from "../api/index";

export function useMemory({ id }: { id: string }) {
  const {
    data: memory,
    refetch,
    isLoading,
  } = useQuery(["fetchMemory", `${id}`], async () => {
    if (id === undefined) {
      return null;
    }

    return (await MemoryAPI.read({ id })).data;
  });

  return [memory, refetch, isLoading] as const;
}
