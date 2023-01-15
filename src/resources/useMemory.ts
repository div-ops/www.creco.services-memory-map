import { useQuery } from "@tanstack/react-query";
import { fetchMemory } from "../api/fetchMemory";

export function useMemory({ id }: { id: string }) {
  if (id === undefined) {
    return [null, null, true];
  }

  const {
    data: memory,
    refetch,
    isLoading,
  } = useQuery(["fetchMemory", `${id}`], () =>
    fetchMemory({ id }).then((x) => x.data)
  );

  return [memory, refetch, isLoading] as const;
}
