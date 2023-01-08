import { getBaseUrl, createAuthHeaders } from "./utils";

export async function fetchMemoryList({
  pageNo = 1,
}: { pageNo?: number } = {}) {
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
