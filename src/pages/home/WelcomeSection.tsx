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
      className="flex max-h-[800px] flex-col items-center bg-gray-50 bg-contain md:h-screen md:flex-row-reverse"
      style={{
        backgroundImage: "url('/home-bg.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto flex min-w-[200px] max-w-[1260px] flex-col items-center justify-between md:flex-row-reverse">
        <motion.img
          src="welcome.png"
          className="mt-28 h-64 max-h-[400px] rounded-lg md:mt-20 md:h-[510px] md:w-1/2 xl:mr-3"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        />

        <div className="w-full md:w-1/2 md:px-1">
          <motion.div
            className="text-4xl font-medium md:mb-2 md:mt-40 md:text-5xl md:font-normal lg:text-6xl xl:mb-4"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <div className="px-8 text-center text-gray-800 md:text-left xl:px-0">
              <div className="hidden md:block">
                Welcome to
                <br />
                Shaping Iloilo
              </div>

              <div className="mb-2 mt-3 block text-2xl md:hidden">
                Welcome to Shaping Iloilo
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mx-auto max-w-[500px] px-8 text-center text-sm font-light text-gray-700 md:px-8 md:text-left md:text-base lg:max-w-[680px] lg:text-lg xl:max-w-[800px] xl:px-0 xl:pr-[125px]"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            In a rapidly changing world, a community of young, passionate, and
            dedicated individuals has emerged, ready to make a difference on
            both a local and global scale. Welcome to the Global Shapers
            Community, where the power of youth meets the urgency of our times.
          </motion.div>

          <Link href="/funded-projects">
            <motion.div
              className="mb-8 flex items-center justify-center px-8 md:mb-12 md:items-start md:justify-start xl:px-0"
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              <button className="mt-6 block md:w-80 w-72 rounded-2xl bg-blue-800 py-2 text-lg font-semibold text-white hover:bg-blue-900 md:mb-6 md:py-3">
                Fund Impact
              </button>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
};
