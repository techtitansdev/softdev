import React from "react";

const AboutUsSection = () => {
  return (
    <div className="z-10 flex h-44 flex-col items-center bg-gray-50 bg-cover bg-center shadow md:h-52">
      <div className="mb-12 flex flex-col items-center justify-center">
        <div className="mb-2 mt-[65px] text-3xl  font-medium text-gray-800 sm:text-4xl md:mt-[100px] lg:text-5xl">
          About Us
        </div>
        <div className="text:lg mx-4 mb-20 text-center font-light text-gray-700 sm:text-xl md:text-xl">
          Explore our mission, vision, values and meet the team driving our
          initiatives.
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
