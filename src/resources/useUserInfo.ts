import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchUserInfo } from "../api/fetchUserInfo";
import { login } from "../api/login";

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
    fetchUserInfo,
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

  return [user?.data, isLoading, login, logout] as const;
}

export { useUserInfo };
