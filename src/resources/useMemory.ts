import { ResourceAPI } from "@divops/github-oauth-sdk";
import { useQuery } from "@tanstack/react-query";

export function useMemory({ id }: { id: string }) {
  const {
    data: memory,
    refetch,
    isLoading,
  } = useQuery(["fetchMemory", `${id}`], async () => {
    if (id === undefined) {
      return null;
    }

    return (await ResourceAPI.of("memory").read({ id })).data;
  });

  return [memory, refetch, isLoading] as const;
}
