import Head from "next/head";
import styles from "../styles/Home.module.css";

import registerForm from "../components/registerForm.js";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blockchain Election Voting</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the blockchain voting platform
        </h1>

        <p className={styles.description}>
          You can get started by registering your Ethereum address
        </p>

        <div className={styles.grid}>
          <a className={styles.card} onClick={() => registerForm()}>
            <h2>Register</h2>
            <p>Click here to Register your ETH address</p>
          </a>
          <a className={styles.card} onClick={() => alert("Hello from here")}>
            <h2>See the result</h2>
            <p>See the result right here.</p>
          </a>
        </div>
      </main>
    </div>
  );
}
