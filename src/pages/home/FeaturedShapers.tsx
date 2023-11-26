import Link from "next/link";
import React from "react";
import { featuredShapers } from "~/data/featuredShapers";

export const FeaturedShapers = () => {
  return (
    <div>
      <div className="mx-auto max-w-screen-xl py-2 pb-12 sm:p-10 lg:p-6 lg:py-6">
        <div className="flex items-center justify-center lg:justify-between xl:justify-between">
          <div className="flex-col">
            <div className="mt-4 text-center text-2xl font-medium text-gray-800 sm:text-3xl lg:text-left">
              FEATURED SHAPERS
            </div>

            <div className="px-6 pb-5 text-center text-sm font-normal text-gray-700 sm:px-0 md:mx-1 md:text-base lg:text-left">
              Global change makers turning ideas into impactful actions.
            </div>
          </div>
          <Link
            href="/shapers"
            className="mr-1 hidden rounded-md border border-gray-800 px-5 py-1 font-semibold hover:bg-gray-200 lg:block xl:block 2xl:block"
          >
            See All
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {featuredShapers.map((shaper, index) => (
              <div
                key={index}
                className="group relative mb-1 cursor-pointer items-center justify-center overflow-hidden rounded-md transition-shadow hover:shadow-xl hover:shadow-black/30"
              >
                <div className="h-96 w-72">
                  <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105"
                    src={shaper.imageUrl}
                    alt="shaperImg"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-5 text-center transition-all duration-500 group-hover:translate-y-0">
                  <div className="w-56 bg-gradient-to-r from-blue-500 to-blue-900 px-1 text-xl font-medium text-white">
                    {shaper.title}
                  </div>
                  <div className="mb-5 w-56 bg-white px-1 text-left text-xs">
                    {shaper.work}
                  </div>

                  <p className="text-left text-xs font-light text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {shaper.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Link
            href="/shapers"
            className="mt-5 rounded-md border border-gray-800 px-16 py-1 font-semibold hover:bg-gray-200 lg:hidden"
          >
            See All
          </Link>
        </div>
      </div>
    </div>
  );
};
