import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { featuredProjects } from "~/data/featuredProjects";

export const FeaturedProjects = () => {
  return (
    <div className="bg-gray-50 bg-cover">
      <div className="mx-auto max-w-screen-xl py-2 pb-12 sm:p-10 lg:p-6 lg:py-6">
        <div className="mt-4 text-center text-2xl font-medium text-gray-800 sm:text-3xl lg:text-left">
          FEATURED PROJECTS
        </div>

        <div className="px-6 pb-5 text-center text-sm font-normal text-gray-700 sm:px-0 md:text-base lg:text-left">
          Redefining impact through transformative actions.
        </div>

        <div className="mb-2 flex items-center justify-center">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {featuredProjects.map((card, index) => (
              <div
                key={index}
                className="w-full transform justify-self-start rounded-lg border border-gray-200 bg-white font-medium shadow transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 dark:bg-white"
              >
                <img
                  className="h-52 w-72 rounded-t-lg"
                  src={card.image}
                  alt={card.title}
                />

                <div className="p-4">
                  <div className="card-title">
                    <div className="mb-1 text-xl tracking-tight text-gray-900">
                      {card.title}
                    </div>
                  </div>

                  <div className="flex flex-row items-center font-normal text-gray-800 dark:text-gray-500">
                    <IoLocationSharp size={15} /> {card.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
