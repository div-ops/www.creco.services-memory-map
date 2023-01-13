import { css } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useUserInfo } from "../resources/useUserInfo";
import { Button } from "./Button";
import { Styled } from "./types";

export function TopNav() {
  const [user, isLoading, login, logout] = useUserInfo();
  const router = useRouter();

  if (user == null) {
    return (
      <Container>
        <Logo />
        {router.pathname === "/" && (
          <Flex.Row>
            <h4 css={{ marginRight: "8px" }}>
              {isLoading ? "..." : "로그인하기"}
            </h4>
            <Button onClick={login}>{isLoading ? "..." : "로그인"}</Button>
          </Flex.Row>
        )}
      </Container>
    );
  }

  return (
    <Container>
      <Logo />
      <Flex.Row>
        <h4 css={{ marginRight: "8px" }}>{`${user.login}`}</h4>
        <Button onClick={logout}>로그아웃</Button>
      </Flex.Row>
    </Container>
  );
}

const Logo = () => {
  return (
    <Link href="/">
      <h2
        css={css`
          cursor: pointer;
        `}
      >
        MemoryMap
      </h2>
    </Link>
  );
};

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
