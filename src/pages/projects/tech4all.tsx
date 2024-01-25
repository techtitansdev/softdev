import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";

const Tech4all = () => {
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

      <Navbar />

      <div
        className={`${
          showBackgroundImage ? "md:-h-[1000px]" : ""
        } mt-[65px] bg-contain md:mt-[100px] lg:h-[644px]`}
        style={{
          backgroundImage: showBackgroundImage
            ? "url('/tech4all-bg.png')"
            : "url('/tech4all-bg2.png')",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="mx-auto lg:max-w-[1200px] xl:max-w-[1230px] ">
          <div className="flex flex-col-reverse items-center sm:pt-16 lg:flex-row lg:pt-28 ">
            <div className="w-full flex-col items-center justify-center lg:w-1/2">
              <p className="mb-2 mt-2 px-4 text-xl font-medium text-[#227135] sm:mb-4 sm:mt-8 sm:px-6 sm:text-2xl lg:mt-4 lg:text-3xl xl:px-0 xl:text-4xl">
                What is Tech For All?
              </p>
              <p className="mb-2 px-4 text-xs font-light text-gray-800 sm:max-w-[700px] sm:px-6 sm:text-base md:max-w-[750px] lg:max-w-[530px] xl:px-0 xl:text-lg">
                Tech For All is an initiative by Global Shapers Iloilo Hub,
                dedicated to bridging the digital divide, enhancing digital
                literacy, advocating for equitable tech opportunities, and
                ensuring that the benefits of technology are accessible to a
                broad and diverse audience.
              </p>
              <p className="mb-2 px-4 text-xs font-light text-gray-800 sm:max-w-[700px] sm:px-6 sm:text-base md:max-w-[750px] lg:max-w-[530px] xl:px-0 xl:text-lg">
                We ensure that everyone, regardless of their background or
                circumstances, has equal access to the opportunities and
                benefits that technology offers, fostering inclusive growth for
                all.
              </p>

              <p className="mb-8 px-4 text-xs font-light text-gray-800 sm:px-6 sm:text-base md:mb-44 md:max-w-[530px] lg:mb-0 lg:text-lg xl:px-0">
                Connect with us:
                <Link
                  href={"https://www.facebook.com/techforall.ph"}
                  className="ml-2 font-medium text-green-700 underline"
                >
                  Tech4All
                </Link>
              </p>
            </div>

            <div className="mt-2 w-full rounded-md px-4 sm:px-6 lg:w-1/2 lg:max-w-[650px] lg:pr-6 xl:ml-12 xl:px-0">
              <video
                controls
                autoPlay
                className="min-h-[260px] min-w-[200px] rounded-md sm:min-h-[350px]"
              >
                <source src="/tech4all-vid.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center text-2xl font-medium text-[#227135] sm:text-3xl lg:mt-24 xl:text-4xl">
        Project Objectives
      </div>

      <div className="mx-auto mb-1 mt-1 px-4 text-center text-xs font-light sm:text-base md:mt-3 md:max-w-[720px] lg:mb-10 lg:max-w-[950px] xl:text-lg">
        Delve into the project objectives that aims to empower individuals and
        communities through digital literacy and skills development, inclusive
        innovation, and socioeconomic empowerment.
      </div>

      <div className="mx-auto mb-12 grid  max-w-[1300px] grid-cols-1 gap-2 md:gap-4 lg:mb-24 lg:grid-cols-2">
        <div className="flex items-center justify-center">
          <img
            src="/tech4all-1.png"
            className="h-36 w-36"
            alt="First Objective"
          />
          <div className="ml-1 md:ml-4">
            <div className="text-sm font-medium sm:text-base xl:text-lg">
              DIGITAL LITERACY
              <div> & SKILLS DEVELOPMENT</div>
            </div>
            <div className="max-w-[420px] pr-4 text-xs font-light sm:text-sm xl:text-base">
              Promotes digital literacy through comprehensive training programs,
              workshops, and resources.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src="/tech4all-2.png"
            className="h-36 w-36"
            alt="Second Objective"
          />
          <div className="ml-1 lg:ml-4">
            <div className="text-sm font-medium sm:text-base xl:text-lg">
              YOUTH-CENTRIC EDUCATION
              <div> AND ENGAGEMENT </div>
            </div>
            <div className="max-w-[420px] pr-4 text-xs font-light sm:text-sm xl:text-base">
              Fostering a child-friendly environment that nurtures curiosity,
              creativity, and digital literacy.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center lg:mt-14">
          <img
            src="/tech4all-3.png"
            className="h-36 w-36"
            alt="Third Objective"
          />
          <div className="ml-1 lg:ml-4">
            <div className="text-sm font-medium sm:text-base xl:text-lg">
              INCLUSIVE INNOVATION
              <div>AND COLLABORATION</div>
            </div>
            <div className="max-w-[420px] pr-4 text-xs font-light sm:text-sm xl:text-base">
              It encourages diverse participation in the innovation ecosystem by
              promoting inclusive innovation, diversity in tech fields, and
              creating platforms for collaboration.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center lg:mt-14">
          <img
            src="/tech4all-4.png"
            className="w- h-36"
            alt="Fourth Objective"
          />
          <div className="ml-1 lg:ml-4">
            <div className="text-sm font-medium sm:text-base xl:text-lg">
              SOCIOECONOMIC EMPOWERMENT
            </div>
            <div className="max-w-[420px] pr-4 text-xs font-light sm:text-sm xl:text-base">
              We aim to use technology to bridge socioeconomic gaps, uplift
              underserved communities, and provide equal access to education,
              healthcare, financial services, and economic opportunities.
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mb-10 grid max-w-[1360px] grid-cols-1 items-center justify-center md:mb-16 lg:grid-cols-2">
        <div className="flex-col">
          <div className="mb-1 text-center text-2xl font-medium text-[#227135] md:text-3xl">
            ROBOTOPIA
          </div>
          <div className="mb-3 text-center text-sm font-light md:text-base">
            Forging Future Innovators Through Early Technology Immersion{" "}
          </div>
          <img
            src="/robotopia.png"
            className="mx-auto h-[560px] w-[680px] border-[#227135] lg:border-r-4 lg:pr-10"
            alt="robotopia"
          ></img>
        </div>

        <div className="flex-col lg:pl-8">
          <div className="mb-1 mt-12 text-center text-2xl font-medium text-[#227135] md:mt-16 md:text-3xl lg:mt-0">
            GAME ON
          </div>
          <div className="mb-3 text-center text-sm font-light md:text-base">
            Empowering Creators for a More Inclusive Gaming
          </div>

          <img src="/gameon.png" className="mx-auto h-[560px] w-[680px]" alt="gameon"></img>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Tech4all;
