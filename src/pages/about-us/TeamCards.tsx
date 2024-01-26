import React from "react";
import { teamImages } from "~/data/teamImages";

const TeamCards = () => {
  return (
    <div
      style={{
        backgroundImage: " url('bg-1.png')",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="mb-8 mt-1 md:mt-8 text-3xl font-medium text-gray-700 sm:text-4xl lg:text-5xl">
          Meet Our Team
        </div>
        <div className="mb-12 flex items-center justify-center">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {teamImages.map((member, index) => (
              <li
                key={index}
                className="duration-400 group relative mb-4 transform items-center justify-center transition ease-in-out hover:-translate-y-1 hover:scale-110"
              >
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={member.image}
                    className="h-52 w-52 rounded-full shadow-lg"
                    alt={member.name}
                  />
                  <div className="w-full p-1 group-hover:opacity-100">
                    <div className="ml-2 rounded-t-md bg-white bg-gradient-to-r from-blue-500 to-blue-900 px-1 text-center text-lg font-medium tracking-tight text-white">
                      {member.name}
                    </div>
                    <div className="text-normal boder-black ml-2 rounded-b-md border bg-white text-center font-light tracking-tight text-blue-800">
                      {member.position}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamCards
