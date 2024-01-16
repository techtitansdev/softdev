import React from "react";

const Vision = () => {
  return (
    <div
      className="bg-gray-100 bg-contain py-12 md:py-12"
      style={{
        backgroundImage: " url('vision-bg.png')",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="mx-auto max-w-[1230px]">
        <div className="flex flex-col items-center md:flex-row">
          <div className="w-full px-6 md:w-1/2 md:max-w-[530px] xl:px-0">
            <img
              src="vision.png"
              alt="About FundImpact"
              className="h-96 w-full rounded-lg"
            />
          </div>
          <div className="mx-auto w-full flex-col items-center justify-center px-6 md:w-1/2 lg:max-w-[580px] xl:ml-28 xl:px-0">
            <p className="mb-2 mt-6 text-2xl font-medium text-white  sm:text-3xl md:text-4xl lg:mb-2 lg:mt-1 lg:text-5xl">
              Our Vision
            </p>
            <p className="mb-4 mr-6 max-w-[520px] text-sm font-light text-white  sm:text-base lg:text-lg xl:px-0">
              We envision an Iloilo City and Province where the youth’s
              creativity and entrepreneurial spirit can thrive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision;
