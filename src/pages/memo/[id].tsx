import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Container } from "../../components/Container";
import { TopNav } from "../../components/TopNav";

const Memo: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <TopNav />
      <Container>{id}</Container>
    </div>
  );
};

export default Memo;
