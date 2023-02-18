import { ResourceAPI } from "@divops/github-oauth-sdk";
import { useQuery } from "@tanstack/react-query";
import { useUserInfo } from "./useUserInfo";

export function useMemoryList() {
  const [user] = useUserInfo();
  const {
    data: memoryList,
    refetch,
    isLoading,
    isFetching,
  } = useQuery(
    ["fetchMemoryList", user?.login],
    async () =>
      user?.login == null
        ? []
        : (await ResourceAPI.of("memory").readList()).data,
    { initialData: [] }
  );

  return [memoryList, refetch, isLoading, isFetching] as const;
}
