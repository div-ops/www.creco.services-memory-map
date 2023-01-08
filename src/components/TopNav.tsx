import React, { ReactNode } from "react";
import { useUserInfo } from "../resources/useUserInfo";

export function TopNav() {
  const [user, login, logout] = useUserInfo();

  if (user == null) {
    return (
      <Container>
        <h2>로그인하기</h2>
        <button onClick={login}>로그인</button>
      </Container>
    );
  }

  return (
    <Container>
      <h2>{`환영합니다, ${user.login}님!`}</h2>
      <button onClick={logout}>로그아웃</button>
    </Container>
  );
}

type Styled = ({ children }: { children: ReactNode }) => JSX.Element;

const Container: Styled = (props) => (
  <div
    css={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    {props.children}
  </div>
);
