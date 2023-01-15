import { useQueryClient } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { removeMemory } from "../../../api/removeMemory";
import { Container } from "../../../components/Container";
import { MemoryView } from "../../../components/MemoryView";
import { Title } from "../../../components/Title";
import { TopNav } from "../../../components/TopNav";

const Memo: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;

  return (
    <div>
      <TopNav />

      <Title css={{ margin: "0 auto", width: "720px" }}>
        📝 메모리 확인하기
      </Title>

      <Container>
        <MemoryView
          id={id as string}
          removeMemory={async () => {
            if (id == null || Array.isArray(id)) {
              return;
            }

            await queryClient.invalidateQueries(["fetchMemoryList"]);

            await removeMemory(id);
          }}
        />
      </Container>
    </div>
  );
};

export default Memo;
