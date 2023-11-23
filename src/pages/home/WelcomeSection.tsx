import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export const WelcomeSection = () => {
  const textVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 1.5 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 160 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
  };

  return (
    <div
      className="flex max-h-[800px] flex-col items-center bg-gray-50 xl:h-screen xl:flex-row-reverse"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/474x/f2/7c/23/f27c2356e1943df4875ed932707e9931.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto flex min-w-[200px] max-w-[1240px] flex-col items-center justify-between xl:flex-row-reverse">
        <motion.img
          src="/sample-pic5.png"
          className="mt-28 h-64 rounded-lg xl:mt-20 xl:h-[510px] xl:w-1/2 "
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        />

        <div className="w-full xl:w-1/2 xl:px-1">
          <motion.div
            className="text-4xl font-medium md:mb-2 md:text-4xl xl:mb-4 xl:mt-36 xl:text-6xl xl:font-normal"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <div className="text-center text-gray-800 xl:text-left">
              <div className="hidden xl:block">
                Welcome to
                <br />
                Shapers Iloilo
              </div>

              <div className="mb-3 block text-2xl sm:text-3xl xl:hidden">
                Welcome to Shapers Iloilo
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mx-auto max-w-[500px] px-8 text-center text-sm font-normal text-gray-700 md:max-w-[600px] xl:max-w-[800px] xl:px-0 xl:pr-28 xl:text-left xl:text-base"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            The Global Shapers Iloilo Hub is one of the 456 city-based hubs in
            the Global Shapers Community - a network of inspiring young people
            working together to address local, regional, and global challenges.
            We believe in a world where young people are central to solution
            building, policy-making and lasting change.
          </motion.div>

          <Link href="/funded-projects">
            <motion.div
              className="mb-8 flex items-center justify-center xl:mb-12 xl:items-start xl:justify-start"
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              <button className="mt-6 block w-80 rounded-2xl bg-blue-800 py-2 text-lg font-semibold text-white hover:bg-blue-900 md:py-3 xl:mb-6">
                Fund Impact
              </button>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
};
