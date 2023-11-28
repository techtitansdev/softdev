import React from "react";

export const Mission = () => {
  return (
    <div className="mx-8 mb-12 lg:mx-8 xl:mx-24">
      <div className="mx-auto flex flex-col-reverse items-center justify-between md:flex-row">
        <div className="ml-8 w-full flex-col items-center justify-center px-2 md:w-1/2">
          <p className="mb-2 mt-6 text-3xl font-semibold text-gray-800 lg:mb-5 lg:mt-1 lg:text-4xl">
            Our Mission
          </p>
          <p className="mb-4 mr-6 text-base font-light text-gray-800  lg:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius
            vehicula nisl in venenatis. Integer non ultricies nisi, et pretium
            mi. In sed dui leo. Sed non congue lacus.
          </p>
          <p className="mr-6 text-base font-light text-gray-800  lg:text-lg">
            Morbi facilisis lacus vitae velit euismod, et scelerisque ex
            tincidunt.
          </p>
        </div>
        <div className="w-full px-6 md:w-1/2">
          <img
            src="https://i.pinimg.com/474x/35/82/b9/3582b9e4fa770269f044a110be7e609a.jpg"
            alt="About FundImpact"
            className="w-full shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};
