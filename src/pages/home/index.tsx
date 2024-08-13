import Head from "next/head";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import AboutSection from "./AboutSection";
import FeaturedProjects from "./FeaturedProjects";
import FeaturedShapers from "./FeaturedShapers";
import HowItWorks from "./HowItWorks";
import WelcomeSection from "./WelcomeSection";
import Carousel from "./Carousel";
import { carouselImages } from "~/data/carouselmages";

const Home = () => {
  return (
    <>
      <Head>
        <title>Global Shapers Iloilo</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <Navbar />
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
