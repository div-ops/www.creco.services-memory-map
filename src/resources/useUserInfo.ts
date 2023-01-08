import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserInfo } from "../api/fetchUserInfo";
import { login } from "../api/login";

const UserInfoKey = ["fetchUserInfo"];

interface User {
  login: string;
}

useUserInfo.key = UserInfoKey;
function useUserInfo() {
  const queryClient = useQueryClient();
  const { data: user, refetch } = useQuery<{ data: User }>(
    UserInfoKey,
    fetchUserInfo
  );

  const logout = () => {
    queryClient.invalidateQueries(UserInfoKey);
    localStorage.removeItem("authorization");
    refetch();
  };

  return [user?.data, login, logout] as const;
}

export { useUserInfo };
