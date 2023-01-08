import { useState } from "react";
import { Button } from "./Button";
import { Styled } from "./types";

interface MemoryFormProps {
  onSubmit: (resource: any, summary: any) => Promise<void>;
}

export function MemoryForm({ onSubmit }: MemoryFormProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Container>
      <Title>📝 메모리 기록하기</Title>
      <section>
        <textarea
          css={{
            minHeight: "200px",
            width: "100%",
            resize: "none",
            outline: "none",
          }}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </section>
      <div css={{ textAlign: "right" }}>
        <Button
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            await onSubmit({ content }, { content: content.split("\n")[0] });
            setContent("");
            setLoading(false);
          }}
        >
          {loading ? "로딩" : "작성"}
        </Button>
      </div>
    </Container>
  );
}

const Title: Styled = ({ children }) => {
  return <h3 css={{ padding: "16px 0" }}>{children}</h3>;
};

const Container: Styled = ({ children }) => {
  return <div css={{ margin: "0 auto", width: "720px" }}>{children}</div>;
};
