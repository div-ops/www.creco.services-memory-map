import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Styled } from "../components/types";
import Footer from "@divops/component-footer";
import "../styles/index.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Component {...pageProps} />
        <Footer />
      </Container>
    </QueryClientProvider>
  );
}

const Container: Styled = ({ children }) => {
  return (
    <div
      css={{
        margin: "0 auto",
        width: "1200px",
      }}
      children={children}
    />
  );
};
