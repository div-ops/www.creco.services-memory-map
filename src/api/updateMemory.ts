import { getBaseUrl, createAuthHeaders } from "./utils";

export async function updateMemory(id: string, resource: any, summary: any) {
  await fetch(`${getBaseUrl()}/github-api/api/resource/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...createAuthHeaders(),
    },
    body: JSON.stringify({
      id,
      model: "memory",
      resource,
      summary,
    }),
  });
}
