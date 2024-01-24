import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const textVariants = {
    hidden: { opacity: 0, y: 120 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <div className="bg-gray-50 py-10">
      <div className="mx-auto flex min-w-[200px] max-w-[1241px] flex-col items-center justify-between sm:flex-row">
        <div className="w-full md:w-1/2 md:pl-4 lg:pr-6 xl:pl-0">
          <img
            src="/about-img.jpeg"
            alt="About FundImpact"
            className="h-64 w-full px-2 sm:h-80 sm:px-3 md:px-8 lg:px-0"
          />
        </div>

        <motion.div
          className="w-full flex-col items-center justify-center px-4 md:w-1/2 xl:px-0 xl:pl-6"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={textVariants}
          ref={ref}
        >
          <p className="mt-3 text-2xl font-medium text-gray-700 sm:text-3xl xl:text-5xl xl:font-normal">
            About Fund Impact
          </p>
          <p className="mb-3 text-sm font-medium text-gray-600 sm:text-base lg:mb-5 xl:text-lg">
            Why are we so excited? Need a little background?
          </p>

          <p className="text-sm font-light text-gray-800 sm:text-sm xl:text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
