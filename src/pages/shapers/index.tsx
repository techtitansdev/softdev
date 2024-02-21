import Head from "next/head";
import { ComingSoon } from "~/components/ComingSoon";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";

const Shapers = () => {
  return (
    <>
      
      <Head>
        <title>Global Shapers Iloilo</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <Navbar />
      <ComingSoon />
      <Footer />
    </>
  );
};

export default Shapers;
