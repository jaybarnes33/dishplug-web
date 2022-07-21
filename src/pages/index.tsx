import CTA from "@/components/App/Main/Cards/CTA";
import Join from "@/components/App/Main/Join/Join";
import Intro from "@/components/App/Main/Intro";
import Header from "@/components/Layout/Header";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Featured from "@/components/App/Main/Featured/Featured";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dishplug || Have your food delivered in minutes.</title>
        <meta name="description" content="Your meal is just a click away." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Intro />
        <Featured />
        <Join />
      </main>
    </div>
  );
}
