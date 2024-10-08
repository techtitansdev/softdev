import React from "react";

const HowItWorks = () => {
  return (
    <>
      <div className="mt-8 w-full sm:mt-10 xl:mt-16">
        <p className="text-center text-2xl font-normal text-gray-800 sm:text-3xl lg:text-4xl">
          How Fund Impact Works
        </p>

        <p className="sm:text-medium mt-1 px-2 text-center text-sm font-light text-gray-700 lg:text-lg">
          Explore the dynamic synergy of Fund Impact, where every contribution
          powers impactful global projects.
        </p>
      </div>
      <div className="mx-auto mb-10 mt-3 flex w-full items-center justify-center px-4 sm:mb-20 sm:px-6">
        <video
          controls
          className="min-w-[200px] max-w-[1400px]"
          poster="/poster-image.png"
        >
          <source src="/fundimpact.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default HowItWorks;
