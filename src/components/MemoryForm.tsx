import { useState } from "react";

interface MemoryFormProps {
  onSubmit: (resource: any, summary: any) => Promise<void>;
}

export function MemoryForm({ onSubmit }: MemoryFormProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <h3>📝 메모리 기록하기</h3>
      <section>
        <textarea
          css={{ minHeight: "200px", minWidth: "300px", resize: "none" }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </section>
      <button
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          await onSubmit({ content }, { content: content.split("\n")[0] });
          setContent("");
          setLoading(false);
        }}
      >
        {loading ? "로딩" : "작성"}
      </button>
    </div>
  );
}
