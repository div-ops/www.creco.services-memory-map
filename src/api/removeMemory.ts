import { getBaseUrl, createAuthHeaders } from "./utils";

export async function removeMemory(id: string) {
  await fetch(`${getBaseUrl()}/github-api/api/resource/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...createAuthHeaders(),
    },
    body: JSON.stringify({
      model: "memory",
      id: id,
    }),
  });
}
