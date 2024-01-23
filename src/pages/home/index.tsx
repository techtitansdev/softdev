import Head from "next/head";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import { AboutSection } from "./AboutSection";
import { Carousel } from "./Carousel";
import { FeaturedProjects } from "./FeaturedProjects";
import { FeaturedShapers } from "./FeaturedShapers";
import { HowItWorks } from "./HowItWorks";
import { WelcomeSection } from "./WelcomeSection";
import { carouselImages } from "~/data/carouselmages";
import { api } from "~/utils/api";
import router from "next/router";
import { getServerSession } from "next-auth/next";

import { WithSession} from "@clerk/nextjs";

const Home = () => {
  console.log('User');
  console.log(WithSession.name);
  return (
    <>
      <Head>
        <title>Global Shapers Iloilo</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/gsi-logo.jpeg" />
      </Head>

      <Navbar  />
      <WelcomeSection />
      <Carousel slides={carouselImages} />
      <AboutSection />
      <HowItWorks />
      <FeaturedProjects />
      <FeaturedShapers />
      <Footer />
    </>
  );
};

export default Home;
