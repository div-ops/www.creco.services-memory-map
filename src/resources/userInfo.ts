import { useEffect, useState } from "react";

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

function createAuthHeaders() {
  const Authorization = localStorage.getItem("authorization");
  if (Authorization != null) {
    return { Authorization } as const;
  } else {
    return {} as any;
  }
}
