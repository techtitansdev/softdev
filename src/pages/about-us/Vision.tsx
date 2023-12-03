import React from "react";

export const Vision = () => {
  return (
    <div className=" my-4 mt-12 bg-gray-100 py-12">
      <div className="mx-auto max-w-[1230px]">
        <div className="flex flex-col items-center md:flex-row">
          <div className="w-full px-6 md:w-1/2 md:max-w-[530px] xl:px-0">
            <img
              src="vision.png"
              alt="About FundImpact"
              className="w-full rounded-lg h-80"
            />
          </div>
          <div className="mx-auto w-full flex-col items-center justify-center px-6 md:w-1/2 lg:max-w-[580px] xl:ml-28 xl:px-0">
            <p className="mb-2 mt-6 text-2xl font-semibold text-gray-800 sm:text-3xl lg:mb-2 lg:mt-1 lg:text-4xl">
              Our Vision
            </p>
            <p className="mb-4 mr-6 text-sm font-light text-gray-800  sm:text-base lg:text-lg xl:px-0">
              We envision an Iloilo City and Province where the youth’s
              creativity and entrepreneurial spirit can thrive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
