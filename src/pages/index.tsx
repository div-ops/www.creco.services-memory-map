import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MemoryForm } from "../components/MemoryForm";
import { useUserInfo } from "../resources/userInfo";
import { createAuthHeaders } from "../resources/utils";

const getBaseUrl = () => {
  if (typeof window === "undefined") {
    return "https://app.divops.kr";
  }

  if (window.location.hostname === "localhost") {
    return "";
  } else if (window.location.hostname === "www.creco.services") {
    return "https://app.divops.kr";
  }
};

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user, clear } = useUserInfo();

  const { resetQueryParam } = useResetQueryParam();
  const router = useRouter();

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

  if (user != null) {
    return (
      <div>
        <h1>환영합니다, {user}님!</h1>
        <button
          onClick={() => {
            requestLogout();
            clear();
          }}
        >
          로그아웃
        </button>

        <MemoryForm onSubmit={requestCreateResource} />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>로그인</title>
      </Head>

      <main>
        <h1>로그인하기</h1>
        <button
          onClick={() => {
            requestLogin();
          }}
        >
          로그인
        </button>
      </main>
    </div>
  );
};

export default Home;

async function requestLogout() {
  localStorage.removeItem("authorization");
}

function requestLogin() {
  location.assign(
    `${getBaseUrl()}/github-api/request?referrer=${location.href}`
  );
}

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

async function requestCreateResource(resource: any) {
  await fetch(`${getBaseUrl()}/github-api/api/resource/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...createAuthHeaders(),
    },
    body: JSON.stringify({
      model: "memo",
      resource,
    }),
  });
}
