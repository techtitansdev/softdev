import Head from "next/head";
import { ComingSoon } from "~/components/ComingSoon";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import { AboutUsSection } from "./AboutUsSection";
import { Mission } from "./Mission";
import { TeamCards } from "./TeamCards";
import { Vision } from "./Vision";
import { Values } from "./Values";

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>About Us | Global Shapers Iloilo</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <Navbar />
      <AboutUsSection />
      <Mission />
      <Vision />
      <Values />
      <TeamCards />

      <Footer />
    </>
  );
};

export default AboutUs;