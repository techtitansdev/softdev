import React from "react";

export const Mission = () => {
  return (
    <div className="mx-auto mt-6 max-w-[1230px]">
      <div className="flex flex-col-reverse items-center md:flex-row">
        <div className=" w-full flex-col items-center justify-center md:w-1/2">
          <p className="mb-2 mt-4 px-6 text-2xl font-semibold text-gray-800 sm:text-3xl md:mt-0 lg:text-4xl xl:px-0">
            Our Mission
          </p>
          <p className="mb-4 px-6 text-sm font-light text-gray-800 sm:text-base md:max-w-[530px] lg:text-lg xl:px-0">
            The Global Shapers Community - Iloilo Hub (GSI) is composed of young
            dynamic leaders from the city and province of Iloilo, Philippines
            who are passionate about amplifying the voice of the youth in
            shaping Iloilo for the future.
          </p>
        </div>
        <div className="w-full px-6 md:w-1/2 md:max-w-[540px] xl:ml-8 xl:px-0">
          <img
            src="mission.jpg"
            alt="Mission"
            className="w-full rounded-lg h-80"
          />
        </div>
      </div>
    </div>
  );
};
