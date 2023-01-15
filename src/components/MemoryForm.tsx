import { useState } from "react";
import { Button } from "./Button";
import { Container } from "./Container";

interface MemoryFormProps {
  onSubmit: (resource: any) => Promise<void>;
}

export function MemoryForm({ onSubmit }: MemoryFormProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Container>
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
            await onSubmit({ content });
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
