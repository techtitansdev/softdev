import React from "react";

export const AboutUsSection = () => {
  return (
    <div
      className="mb-12 flex h-72 flex-col items-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/564x/e1/75/bd/e175bdcd71ab6f24105916ffd6c6ab6f.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mb-12 flex flex-col items-center justify-center">
        <div className="mb-2 mt-32 text-3xl font-medium text-gray-800 sm:text-4xl md:text-5xl">
          About Us
        </div>
        <div className="text:lg mx-4 mb-20 text-center font-light text-gray-700 sm:text-xl md:text-2xl">
          Explore our mission, vision, and meet the team driving our
          initiatives.
        </div>
      </div>
    </div>
  );
};
