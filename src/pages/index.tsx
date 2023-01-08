import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MemoryForm } from "../components/MemoryForm";
import { TopNav } from "../components/TopNav";
import { useMemoryList } from "../resources/useMemoryList";
import { createAuthHeaders, getBaseUrl } from "../resources/utils";

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

      <MemoryForm
        onSubmit={async (resource: any, summary: any) => {
          await requestCreateResource(resource, summary);
          await refetch();
        }}
      />

      <br />

      {memoryList.map((memory: any) => {
        return <div key={memory.id}>{JSON.stringify(memory)}</div>;
      })}
    </div>
  );
};

export default Home;

function useResetQueryParam() {
  const router = useRouter();

  return {
    resetQueryParam: (key: string) => {
      const query = { ...router.query };

      delete query[key];

      router.replace({ pathname: router.pathname, query });
    },
  } as const;
}

async function requestCreateResource(resource: any, summary: any) {
  await fetch(`${getBaseUrl()}/github-api/api/resource/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...createAuthHeaders(),
    },
    body: JSON.stringify({
      model: "memory",
      resource,
      summary,
    }),
  });
}
