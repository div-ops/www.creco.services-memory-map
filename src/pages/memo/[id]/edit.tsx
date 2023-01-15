import type { NextPage } from "next";
import { useRouter } from "next/router";
import { updateMemory } from "../../../api/updateMemory";
import { Container } from "../../../components/Container";
import { MemoryEditor } from "../../../components/MemoryEditor";
import { Title } from "../../../components/Title";
import { TopNav } from "../../../components/TopNav";

const Memo: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <TopNav />

      <Title css={{ margin: "0 auto", width: "720px" }}>
        📝 메모리 수정하기
      </Title>

      <Container>
        <MemoryEditor
          id={id as string}
          editMemory={async ({ content }) => {
            if (id == null || Array.isArray(id)) {
              return;
            }

            await updateMemory(
              id,
              { content },
              { content: content.split("\n")[0] }
            );
            router.back();
          }}
        />
      </Container>
    </div>
  );
};

export default Memo;
