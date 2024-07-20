import { values } from "~/data/values";

const Values = () => {
  return (
    <>
      <div className="mb-2 mt-12 flex items-center justify-center text-3xl font-medium text-gray-700 sm:text-4xl lg:mt-20 lg:text-5xl">
        Our Values
      </div>

      <hr className="dark-bg-gray-800 mx-auto my-4 mb-6 h-[2px] max-w-[300px] border-0 bg-gray-800 md:max-w-[400px]"></hr>

      <div className="mx-auto mb-12 grid max-w-[1300px] grid-cols-1 justify-items-center gap-4 lg:grid-cols-2 ">
        {values.map((value, index) => (
          <div
            key={index}
            className={`flex items-center ${index > 1 ? "lg:mt-12" : ""}`}
          >
            <img src={value.imageSrc} alt={value.title} className="h-32 w-32" />

            <div className="ml-2 lg:ml-4">
              <div className="text-sm font-medium sm:text-base xl:text-lg">
                {value.title}
              </div>
              <div className="max-w-[200px] pr-2  text-xs font-light sm:text-sm md:max-w-[330px] xl:max-w-[360px] xl:text-base">
                {value.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Values;
