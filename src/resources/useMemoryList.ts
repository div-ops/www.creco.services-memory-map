import { useQuery } from "@tanstack/react-query";
import { fetchMemoryList } from "../api/fetchMemoryList";
import { useUserInfo } from "./useUserInfo";

export function useMemoryList() {
  const [user] = useUserInfo();
  const { data: memoryList, refetch } = useQuery(
    ["fetchMemoryList", user?.login],
    async () => (user?.login == null ? [] : (await fetchMemoryList()).data),
    { initialData: [] }
  );

  return [memoryList, refetch] as const;
}
