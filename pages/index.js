import Head from "next/head";
import Header from "../components/Header";
import Main from "../components/Main";
import Modal from "../components/Modal";

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>IG Web v2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
      <Modal />
    </div>
  );
}
