import React from "react";
import { useUserInfo } from "../resources/useUserInfo";
import { Button } from "./Button";
import { Styled } from "./types";

export function TopNav() {
  const [user, login, logout] = useUserInfo();

  if (user == null) {
    return (
      <Container>
        <div>
          <h2>MemoryMap</h2>
        </div>
        <Flex.Row>
          <h4 css={{ marginRight: "8px" }}>로그인하기</h4>
          <Button onClick={login}>로그아웃</Button>
        </Flex.Row>
      </Container>
    );
  }

  return (
    <Container>
      <div>
        <h2>MemoryMap</h2>
      </div>
      <Flex.Row>
        <h4 css={{ marginRight: "8px" }}>{`${user.login}`}</h4>
        <Button onClick={logout}>로그아웃</Button>
      </Flex.Row>
    </Container>
  );
}

const FlexRow: Styled = ({ children }) => (
  <div
    children={children}
    css={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  />
);

const FlexCol: Styled = ({ children }) => (
  <div
    children={children}
    css={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  />
);

const Flex = {
  Row: FlexRow,
  Col: FlexCol,
};

const Container: Styled = ({ children }) => (
  <div
    css={{
      padding: "16px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
    children={children}
  />
);
