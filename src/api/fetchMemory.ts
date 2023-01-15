import { getBaseUrl, createAuthHeaders } from "./utils";

export async function fetchMemory({ id }: { id: string }) {
  const response = await fetch(
    `${getBaseUrl()}/github-api/api/resource/read?model=memory&id=${id}`,
    {
      method: "GET",
      headers: {
        ...createAuthHeaders(),
      },
    }
  );

  return await response.json();
}
