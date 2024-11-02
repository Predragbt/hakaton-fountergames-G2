import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import { DataProvider } from "@/context/DataContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DataProvider>
        <Header />
        <Component {...pageProps} />
      </DataProvider>
    </>
  );
}
