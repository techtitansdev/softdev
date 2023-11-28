import React from "react";

export const Vision = () => {
  return (
    <div className=" my-4 mt-12 bg-gray-100 py-12">
      <div className="mx-auto max-w-[1230px]">
        <div className="flex flex-col items-center md:flex-row">
          <div className="w-full px-6 md:w-1/2 md:max-w-[530px] xl:px-0">
            <img
              src="https://i.pinimg.com/564x/00/ab/75/00ab757ff30b878581a234b7eed1dbe7.jpg"
              alt="About FundImpact"
              className="w-full shadow-lg"
            />
          </div>
          <div className="mx-auto w-full flex-col items-center justify-center px-6 md:w-1/2 lg:max-w-[580px] xl:ml-28 xl:px-0">
            <p className="mb-2 mt-6 text-2xl sm:text-3xl font-semibold text-gray-800 lg:mb-5 lg:mt-1 lg:text-4xl">
              Our Vision
            </p>
            <p className="mb-4 mr-6 text-sm sm:text-base font-light  text-gray-800 lg:text-lg xl:px-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              varius vehicula nisl in venenatis. Integer non ultricies nisi, et
              pretium mi. In sed dui leo. Sed non congue lacus.
            </p>
            <p className="mr-6 text-sm sm:text-base font-light  text-gray-800 lg:text-lg xl:px-0">
              Morbi facilisis lacus vitae velit euismod, et scelerisque ex
              tincidunt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
