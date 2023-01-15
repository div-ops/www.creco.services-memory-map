import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMemory } from "../resources/useMemory";
import { Button } from "./Button";
import { Container } from "./Container";

interface MemoryViewProps {
  id: string;
  editMemory: (resource: any) => Promise<void>;
}

export function MemoryEditor({ id, editMemory }: MemoryViewProps) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [memory, , isLoading] = useMemory({ id });

  useEffect(() => {
    if (memory != null && memory.content != null) {
      setContent(memory.content);
    }
  }, [memory]);

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
            padding: 1rem;
          `}
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
            await editMemory({ content });
            setLoading(false);
            router.back();
          }}
          disabled={loading}
        >
          {loading ? "제출 중" : "제출"}
        </Button>
      </section>
    </Container>
  );
}
