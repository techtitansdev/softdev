import React from "react";
import { teamImages } from "~/data/teamImages";

export const TeamCards = () => {
  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="mb-10 mt-10 text-4xl font-medium text-gray-700 md:text-5xl">
        Meet Our Team
      </div>
      <div className="mb-12 flex items-center justify-center">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {teamImages.map((member, index) => (
            <li
              key={index}
              className="duration-400 group relative h-96 w-64 transform items-center justify-center transition ease-in-out hover:-translate-y-1 hover:scale-105"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <img
                  src={member.image}
                  className="h-96 w-full rounded-lg shadow-lg"
                  alt={member.name}
                />
                <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-60 p-1 opacity-0 group-hover:opacity-100">
                  <div className="ml-2 text-center text-lg font-medium tracking-tight text-white">
                    {member.name}
                  </div>
                  <div className="text-normal ml-2 text-center font-light tracking-tight text-yellow-300">
                    {member.position}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
