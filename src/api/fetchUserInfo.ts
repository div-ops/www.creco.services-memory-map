import { getBaseUrl, createAuthHeaders } from "./utils";

export async function fetchUserInfo() {
  const response = await fetch(`${getBaseUrl()}/github-api/api/user/info`, {
    method: "GET",
    headers: {
      ...createAuthHeaders(),
    },
  });

  return await response.json();
}
