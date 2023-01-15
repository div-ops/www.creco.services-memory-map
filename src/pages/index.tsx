import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createMemory } from "../api/createMemory";
import { Container } from "../components/Container";
import { MemoryForm } from "../components/MemoryForm";
import { MemorySummary } from "../components/MemorySummary";
import { Title } from "../components/Title";
import { TopNav } from "../components/TopNav";
import { useResetQueryParam } from "../hooks/useResetQueryParam";
import { useMemoryList } from "../resources/useMemoryList";

const Home: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [memoryList, refetch] = useMemoryList();
  const { resetQueryParam } = useResetQueryParam();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const code = router.query.code;

    if (code == null || Array.isArray(code)) {
      setLoading(false);
      return;
    }

    setLoading(true);

    localStorage.setItem("authorization", code);

    resetQueryParam("code");
  }, [router]);

  if (loading) {
    return <div>로그인 중</div>;
  }

  return (
    <div>
      <TopNav />

      <Title css={{ margin: "0 auto", width: "720px" }}>
        📝 메모리 기록하기
      </Title>

      <MemoryForm
        onSubmit={async (resource: any, summary: any) => {
          await createMemory(resource, summary);
          await refetch();
        }}
      />

      <br />

      <Container>
        {memoryList.map((memory: any) => (
          <MemorySummary
            key={memory.id}
            {...memory}
            onClick={() => {
              router.push(`/memo/${memory.id}`);
            }}
          />
        ))}
      </Container>
    </div>
  );
};

export default Home;
