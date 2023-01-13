import { Styled } from "./types";

export function Container({ children }: Parameters<Styled>[0]) {
  return <div css={{ margin: "0 auto", width: "720px" }}>{children}</div>;
}
