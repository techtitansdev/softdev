const MilestoneComponent: React.FC = () => {
  return (
    <div className="content mb-12">
      <div className="content mb-12">
        <section className="bg-gray-50 shadow-lg dark:text-gray-800">
          <div className="container mx-auto max-w-5xl px-4 py-12">
            <div className="mx-4 grid gap-16 sm:grid-cols-12">
              <div className="col-span-12 sm:col-span-3">
                <div className="mb-14 text-center">
                  <h3 className="mt-12 text-3xl font-semibold">
                    {/* {fund.projectTitle} */} Title
                  </h3>
                  <span className="tracki text-sm font-light dark:text-gray-600">
                    {/* {fund.projectDescription} */} Description
                  </span>
                </div>
              </div>
              <div className="relative col-span-12 space-y-6 px-4 sm:col-span-9">
                <div className="relative col-span-12 space-y-12 px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:-left-3 sm:before:bottom-0 sm:before:top-2 sm:before:w-0.5 before:dark:bg-gray-700">
                  <div className="flex flex-col sm:relative sm:before:absolute sm:before:left-[-35px] sm:before:top-2 sm:before:z-[1] sm:before:h-4 sm:before:w-4 sm:before:rounded-full before:dark:bg-blue-800">
                    <h3 className="tracki text-xl font-semibold">50 books</h3>
                    <time className="tracki text-xs uppercase dark:text-gray-400">
                      Nov 2023
                    </time>
                    <p className="mt-3 text-gray-800">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                  <div className="flex flex-col sm:relative sm:before:absolute sm:before:left-[-35px] sm:before:top-2 sm:before:z-[1] sm:before:h-4 sm:before:w-4 sm:before:rounded-full before:dark:bg-blue-800">
                    <h3 className="tracki text-xl font-semibold">100 books</h3>
                    <time className="tracki text-xs uppercase dark:text-gray-400">
                      Dec 2023
                    </time>
                    <p className="mt-3 text-gray-800">
                      Morbi vulputate aliquam libero non dictum. Aliquam sit
                      amet nunc ut diam aliquet tincidunt nec nec dui. Donec
                      mollis turpis eget egestas sodales.
                    </p>
                  </div>
                  <div className="flex flex-col sm:relative sm:before:absolute sm:before:left-[-35px] sm:before:top-2 sm:before:z-[1] sm:before:h-4 sm:before:w-4 sm:before:rounded-full before:dark:bg-blue-800">
                    <h3 className="tracki text-xl font-semibold">300 books</h3>
                    <time className="tracki text-xs uppercase dark:text-gray-400">
                      Jan 2023
                    </time>
                    <p className="mt-3 text-gray-800">
                      Suspendisse tincidunt, arcu nec faucibus efficitur, justo
                      velit consectetur nisl, sit amet condimentum lacus orci
                      nec purus. Mauris quis quam suscipit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MilestoneComponent;
