import { useEffect, useState } from "react";
import { createAuthHeaders } from "./utils";

export function useUserInfo() {
  const [user, setUser] = useState<null | string>(null);

  useEffect(() => {
    fetchUserInfo().then(({ data }) => {
      if (data == null) {
        return;
      }
      setUser(data.login);
    });
  }, []);

  return {
    user,
    clear: () => {
      setUser(null);
    },
  } as const;
}

async function fetchUserInfo() {
  const response = await fetch(
    `https://app.divops.kr/github-api/api/user/info`,
    {
      method: "GET",
      headers: {
        ...createAuthHeaders(),
      },
    }
  );

  return await response.json();
}
