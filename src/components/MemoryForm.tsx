import { useState } from "react";

interface MemoryFormProps {
  onSubmit: (resource: any) => Promise<void>;
}

export function MemoryForm({ onSubmit }: MemoryFormProps) {
  const [content, setContent] = useState("");

  return (
    <>
      <div>MemoryForm</div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={() => onSubmit({ content })}>작성</button>
    </>
  );
}
