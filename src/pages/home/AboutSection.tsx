import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const textVariants = {
    hidden: { opacity: 0, y: 120 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <div
      className="bg-blue-800 bg-contain py-8 sm:py-10"
      style={{
        backgroundImage: " url('fundimpact-bg.png')",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="mx-auto flex max-w-[1241px] flex-col items-center justify-between sm:flex-row">
        <div className="w-full sm:pl-6 md:w-1/2 lg:pr-16 xl:pl-0">
          <img
            src="/fund-impact.png"
            alt="about fundimpact"
            className="h-[320px] w-full px-4 sm:px-0 md:h-[390px] xl:h-[400px]"
          />
        </div>

        <motion.div
          className="w-full flex-col items-center justify-center px-4 md:w-1/2 xl:px-0 xl:pl-4"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={textVariants}
          ref={ref}
        >
          <p className="mt-3 text-2xl text-white sm:text-3xl md:text-4xl lg:text-5xl">
            About Fund Impact
          </p>
          <p className="mb-3 text-sm font-normal text-gray-50 sm:text-base lg:mb-5 xl:text-lg">
            Why are we so excited? Need a little background?
          </p>

          <p className="lg: max-w-[590px] text-sm font-light text-gray-50 sm:text-sm xl:text-base">
            Within our website, we act as a vibrant center where Ilonggo
            changemakers come together to transform creative concepts into
            reality. Recognizing that groundbreaking ideas and ambitious
            endeavors frequently demand financial backing to flourish, we offer
            an opportunity. If you're seeking a platform to finance a project
            for a community initiative, you've found the right place!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
