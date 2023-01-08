import React, { ReactNode, useState } from "react";

interface MemorySummaryProps {
  content: string;
  created: string;
  onClick: () => void;
}

export function MemorySummary({
  content,
  created,
  onClick,
}: MemorySummaryProps) {
  return (
    <Container onClick={onClick}>
      <div css={{ fontSize: "2rem" }}>{content}</div>
      <div css={{ textAlign: "right" }}>
        <span>{new Date(created).toLocaleString()}</span>
      </div>
    </Container>
  );
}

const Container = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      css={{
        width: "720px",
        margin: "32px auto",
        padding: "16px 24px 12px",
        cursor: "pointer",
        borderRadius: "10px",
        background: `${hover ? "#c8c8c8" : "unset"}`,
        boxShadow:
          "rgb(0 0 0 / 20%) 0px 4px 8px 0px, rgb(0 0 0 / 19%) 0px 6px 20px 0px",
      }}
    >
      {children}
    </div>
  );
};
