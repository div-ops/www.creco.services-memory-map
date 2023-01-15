import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMemory } from "../resources/useMemory";
import { Button } from "./Button";
import { Container } from "./Container";

interface MemoryViewProps {
  id: string;
  removeMemory: () => Promise<void>;
}

export function MemoryView({ id, removeMemory }: MemoryViewProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [memory, , isLoading] = useMemory({ id });

  if (isLoading) {
    return (
      <Container>
        <div
          css={css`
            display: flex;
            width: 100%;
            min-height: 200px;
            justify-content: center;
            align-items: center;
          `}
        >
          로딩 중
        </div>
      </Container>
    );
  }

  if (memory == null) {
    return (
      <Container>
        <div>잘못된 id 입니다.</div>
      </Container>
    );
  }

  return (
    <Container>
      <section
        css={css`
          display: grid;
        `}
      >
        <span
          css={css`
            text-align: right;
          `}
        >
          {new Date(memory.created).toLocaleString()}
        </span>
      </section>
      <section>
        <textarea
          css={css`
            min-height: 200px;
            width: 100%;
            resize: none;
            outline: none;
            border: none;
            padding: 1rem;
          `}
          disabled={true}
          value={memory.content}
        />
      </section>
      <section
        css={css`
          text-align: right;
        `}
      >
        <Button
          onClick={async () => {
            console.log("제거 버튼 클릭");
            setLoading(true);
            await removeMemory();
            setLoading(false);
            router.back();
          }}
          disabled={loading}
        >
          {loading ? "제거 중" : "제거"}
        </Button>
      </section>
    </Container>
  );
}
