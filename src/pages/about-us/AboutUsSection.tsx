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
        <div className="mb-2 mt-32 text-4xl font-medium text-gray-800 md:text-5xl">
          About Us
        </div>
        <div className="mx-2 mb-20 text-center text-xl font-light text-gray-700 md:text-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      </div>
    </div>
  );
};
