import React from "react";

export const HowItWorks = () => {
  return (
    <>
      <div className="mt-6 w-full sm:mt-8">
        <p className="text-center text-2xl font-normal text-gray-800 sm:text-3xl lg:text-4xl">
          How Fund Impact Works
        </p>

        <p className="sm:text-medium mt-1 px-6 text-center text-sm font-light text-gray-700 lg:text-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <div className="mx-auto mb-6 mt-6 flex w-full items-center justify-center px-4 sm:mb-12 sm:px-6 lg:mb-12">
        <video controls className="min-w-[200px] max-w-[1235px]">
          <source src="/gsc-vid.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  );
};
