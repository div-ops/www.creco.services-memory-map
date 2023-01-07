import { useEffect, useState } from "react";
import { createAuthHeaders } from "./utils";

interface Memory {
  id: string;
  content: string;
}

export function useMemoryList() {
  const [memoryList, setMemoryList] = useState<Memory[]>([]);

  useEffect(() => {
    fetchMemoryList().then(({ data, totalCount }) => {
      console.log({ data, totalCount });

      setMemoryList(data);
    });
  }, []);

  return {
    memoryList,
    clear: () => {
      setMemoryList([]);
    },
  } as const;
}

async function fetchMemoryList({ pageNo = 1 }: { pageNo?: number } = {}) {
  const response = await fetch(
    `https://app.divops.kr/github-api/api/resource/readList?model=memory&pageNo=${pageNo}`,
    {
      method: "GET",
      headers: {
        ...createAuthHeaders(),
      },
    }
  );

  return await response.json();
}
