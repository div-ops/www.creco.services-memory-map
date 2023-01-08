import { useQuery } from "@tanstack/react-query";
import { useUserInfo } from "./useUserInfo";
import { createAuthHeaders, getBaseUrl } from "./utils";

interface Memory {
  id: string;
  content: string;
}

export function useMemoryList() {
  const [user] = useUserInfo();
  const { data: memoryList, refetch } = useQuery(
    ["fetchMemoryList", user?.login],
    async () => {
      if (user?.login == null) {
        return [];
      }

      const { data } = await fetchMemoryList();

      return data;
    },
    {
      initialData: [],
    }
  );

  return [memoryList, refetch] as const;
}

async function fetchMemoryList({ pageNo = 1 }: { pageNo?: number } = {}) {
  const response = await fetch(
    `${getBaseUrl()}/github-api/api/resource/readList?model=memory&pageNo=${pageNo}`,
    {
      method: "GET",
      headers: {
        ...createAuthHeaders(),
      },
    }
  );

  return await response.json();
}
