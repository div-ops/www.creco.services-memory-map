import { getBaseUrl, createAuthHeaders } from "./utils";

export async function createMemory(resource: any, summary: any) {
  await fetch(`${getBaseUrl()}/github-api/api/resource/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...createAuthHeaders(),
    },
    body: JSON.stringify({
      model: "memory",
      resource,
      summary,
    }),
  });
}
