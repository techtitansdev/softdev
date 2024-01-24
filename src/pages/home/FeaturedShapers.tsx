import Link from "next/link";
import React from "react";
import { featuredShapers } from "~/data/featuredShapers";
import Image from 'next/image'

const FeaturedShapers = () => {
  return (
    <div
      className="mt-1 bg-contain"
      style={{
        backgroundImage: " url('bg-1.png')",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="mx-auto max-w-screen-xl py-6 pb-10 lg:p-6 lg:py-6 xl:pb-16">
        <div className="flex items-center justify-center xl:justify-between">
          <div className="flex-col">
            <div className="mx-auto mt-1 text-center text-2xl font-normal md:font-medium text-gray-800 sm:mt-4 sm:max-w-[610px] sm:text-left sm:text-3xl xl:mx-0 xl:max-w-[900px]">
              FEATURED SHAPERS
            </div>

            <div className="mx-auto px-10 pb-5 text-center text-sm font-light text-gray-700 sm:max-w-[610px] sm:px-0 sm:text-left xl:mx-0 xl:max-w-[920px] xl:text-base">
              Delve into the reflection of Global Shapers Iloilo as they share
              their insights they have gleaned from their time at hub.
            </div>
          </div>

          <Link
            href="/shapers"
            className="mr-1 hidden rounded-md border border-gray-800 bg-gray-50 px-5 py-1 font-medium hover:bg-gray-200 xl:block"
          >
            See All
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
            {featuredShapers.map((shaper, index) => (
              <div
                key={index}
                className="group relative mb-1 cursor-pointer items-center justify-center overflow-hidden rounded-md transition-shadow hover:shadow-xl hover:shadow-black/30"
              >
                <div className="h-96 w-72">
                  <Image
                    className="object-obtain h-full w-full transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105"
                    src={shaper.imageUrl}
                    alt="shaperImg"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-5 text-center transition-all duration-500 group-hover:translate-y-0">
                  <div className="w-56 rounded-t-sm bg-gradient-to-r from-blue-500 to-blue-900 px-1 text-xl font-medium text-white">
                    {shaper.title}
                  </div>
                  <div className="mb-5 w-56 rounded-b-sm bg-white px-1 text-left text-xs">
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
            className="mt-5 rounded-md border border-gray-800 bg-gray-50 px-16 py-1 font-medium hover:bg-gray-200 xl:hidden"
          >
            See All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedShapers;
