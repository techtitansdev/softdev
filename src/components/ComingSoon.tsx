export const ComingSoon = () => {
  return (
    <>
      <div
        className="flex max-h-[800px] flex-col items-center bg-gray-50 xl:h-screen"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/474x/f2/7c/23/f27c2356e1943df4875ed932707e9931.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex h-screen items-center justify-center">
          <div>
            <div className="mb-4 text-center text-5xl font-medium sm:text-6xl lg:text-7xl">
              COMING SOON
            </div>
            <div className="max-w-[400px] px-2 text-center text-xl font-light sm:max-w-[600px] lg:max-w-[880px]">
              Our new website is currently under construction and will soon be
              your hub for impactful initiatives and collaborative projects. Get
              ready to be part of a global community making a difference!"
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

