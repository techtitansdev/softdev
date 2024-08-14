import Head from "next/head";
import { useState, useEffect } from "react";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import { partners } from "~/data/partners";

const Partners = () => {
  const [showBackgroundImage, setShowBackgroundImage] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowBackgroundImage(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Head>
        <title>Global Shapers Iloilo</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div
          className={`${
            showBackgroundImage ? "md:mt-[100px]" : ""
          } mt-[65px] flex-grow bg-contain pb-10 pt-10 md:pb-20 md:pt-20`}
          style={{
            backgroundImage: showBackgroundImage
              ? "url('partner-bg.png')"
              : "url('bg-1.png')",
            backgroundSize: "100% 100%",
          }}
        >
          <div className="mx-auto flex max-w-[340px] flex-col items-center rounded-xl bg-white p-8 shadow sm:max-w-[600px] md:max-w-[720px] lg:max-w-[960px]">
            <div className="mb-8 text-center text-2xl md:text-3xl">
              In collaboration with:
            </div>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2 md:gap-12 lg:grid-cols-3 xl:grid-cols-3">
              {partners.map((partner, index) => (
                <div key={index} className="rounded-md">
                  <img
                    src={partner.image}
                    alt="Partners"
                    className="h-32 w-60 object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="mb-8 mt-12 text-center text-2xl md:mb-6 md:mt-2 md:text-3xl">
              Supported by:
            </div>
            <div className="items-center justify-center md:flex">
              <img
                src="city-of-iloilo.jpeg"
                className="mb-10 h-36 w-56 object-contain md:mb-0"
                alt="City-Of-Iloilo"
              />
              <img
                src="doe-iloilo.jpeg"
                className="h-36 w-56 object-contain"
                alt="Doe-Iloilo"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Partners;
