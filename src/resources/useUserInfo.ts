import { UserAPI } from "@divops/github-oauth-sdk";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const UserInfoKey = ["fetchUserInfo"];

interface User {
  login: string;
}

useUserInfo.key = UserInfoKey;

function useUserInfo() {
  const [isLoading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);

    return () => clearTimeout(timer);
  }, []);

  const { data: user, refetch } = useQuery<{ data: User }>(
    [...UserInfoKey, isLoading],
    UserAPI.of().fetchUser,
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );

  const logout = () => {
    queryClient.invalidateQueries(UserInfoKey);
    localStorage.removeItem("authorization");
    refetch();
  };

  return [user?.data, isLoading, UserAPI.of().loginUser, logout] as const;
}

export { useUserInfo };
