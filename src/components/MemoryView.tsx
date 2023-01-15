import { css } from "@emotion/react";
import { useMemory } from "../resources/useMemory";
import { Button } from "./Button";
import { Container } from "./Container";

interface MemoryViewProps {
  id: string;
}

export function MemoryView({ id }: MemoryViewProps) {
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
    </Container>
  );
}
