import { Head } from "$fresh/runtime.ts";

import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";

import FirstMate from "../islands/FirstMate.tsx";
import Battlefield from "../islands/Battlefield.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>BATTLESHIP</title>
      </Head>
      <div class="flex flex-col min-h-screen">
        <Header />
        <main class="p-4 py-16 mx-auto max-w-screen-lg flex-1 flex gap-16">
          <Battlefield />
          <FirstMate />
        </main>
        <Footer />
      </div>
    </>
  );
}
