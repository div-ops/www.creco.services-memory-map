import { Styled } from "./types";

export function Title({ children, className }: Parameters<Styled>[0]) {
  return (
    <h3 className={className} css={{ padding: "16px 0" }}>
      {children}
    </h3>
  );
}
