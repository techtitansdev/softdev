import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sidebar } from "~/components/Sidebar";
import AboutComponent from "../components/AboutComponent";
import MilestoneComponent from "../components/MilestoneComponent";
import CommentComponent from "../components/CommentComponent";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const FundingPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [fundingData, setFundingData] = useState<any>(null);

  const getFunding = api.fundraiser.getById.useQuery({ id: id as string });

  useEffect(() => {
    if (getFunding.data && !fundingData && getFunding.data !== fundingData) {
      setFundingData(getFunding.data);
    }
  }, [getFunding.data, fundingData]);

  const [content, setContent] = useState("about");

  const changeContent = (newContent: string) => {
    setContent(newContent);
  };

  const calculateDaysLeft = (targetDate: string): number => {
    // Convert target date string to Date object
    const target = new Date(targetDate);

    const currentDate = new Date();

    // Calculate the difference in milliseconds between the target date and the current date
    const differenceMs = target.getTime() - currentDate.getTime();

    // Calculate the difference in days by dividing the difference in milliseconds by the number of milliseconds in a day
    const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    return differenceDays;
  };

  return (
    <div>
      <Head>
        <title> Funding | Global shapers</title>
        <meta name="description" content="Generated by create-next-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <div className="flex">
        <Sidebar />

        <div className="flex-col mx-aut">
          <div className="mx-auto mt-16 flex flex-col-reverse items-center justify-between px-6 pb-10 sm:px-10 lg:flex-row lg:px-12 lg:pt-20 xl:px-20">
            {fundingData && (
              <div key={fundingData.id} className="w-full lg:w-1/2">
                <p className="mb-2 text-2xl font-semibold text-gray-700 sm:text-3xl md:mb-5 md:text-4xl lg:text-5xl xl:text-6xl">
                  {fundingData.project?.title}
                </p>

                <p className="mb-4 text-xs font-light sm:text-sm md:text-base">
                  {fundingData.project?.description}
                </p>

                <Link
                  href={{
                    pathname: "/funding/payment",
                  }}
                >
                  <button className="w-72 rounded-lg bg-blue-800 py-2 text-xl text-white hover:bg-blue-900 md:text-2xl">
                    Donate
                  </button>
                </Link>

                <div className="mt-4 flex space-x-24 lg:mt-8">
                  <div className="ml-4 flex flex-col items-center justify-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEFFSZ_dBp2zPiic_c1HLX5eZrDqmNG2pdCA&usqp=CAU"
                      className="h-10 w-10"
                      alt="Donors Icon"
                    />
                    <p className="text-sm font-medium sm:text-base lg:text-lg">
                      {fundingData.donors}
                    </p>
                    <p className="text-xs font-light sm:text-sm lg:text-base">
                      Donors
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src="https://clipart-library.com/images/8cGbXEaxi.png"
                      className="h-10 w-10"
                      alt="Beneficiaries Icon"
                    />
                    <p className="text-sm font-medium sm:text-base lg:text-lg">
                      {fundingData.project.beneficiaries}
                    </p>
                    <p className="text-xs font-light sm:text-sm lg:text-base">
                      Beneficiaries
                    </p>
                  </div>
                </div>
              </div>
            )}

            {fundingData && fundingData.project && (
              <div className="w-full items-center justify-center lg:ml-12 lg:w-1/2 xl:ml-20">
                <img
                  src={fundingData.project.image}
                  alt="Project Image"
                  className="w-full rounded-3xl md:h-96"
                />
                <div className="mt-4 h-2.5 w-full rounded-full bg-gray-200 lg:mt-8 dark:bg-gray-400">
                  <div
                    className="h-2.5 rounded-full bg-blue-800"
                    style={{
                      width: `${(fundingData.funds / fundingData.goal) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="mb-4 mt-1 flex justify-between md:mt-4">
                  <p className="text-xs font-medium md:text-sm">
                    Days Left: {calculateDaysLeft(fundingData.targetDate)}
                  </p>
                  <p className="text-xs font-medium md:text-sm">
                    Goal: ₱{fundingData.goal}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="ml-10 space-x-4 text-sm font-medium sm:space-x-16 md:ml-24 md:space-x-24 md:text-base lg:space-x-32">
              <button
                onClick={() => changeContent("about")}
                className={`font-semibold text-gray-800 ${
                  content === "about"
                    ? "border-b-4 border-blue-900 px-2 py-2"
                    : ""
                }`}
              >
                ABOUT
              </button>
              <button
                onClick={() => changeContent("milestone")}
                className={`font-semibold text-gray-800 ${
                  content === "milestone"
                    ? "border-b-4 border-blue-900 px-2 py-2"
                    : ""
                }`}
              >
                MILESTONE
              </button>
              <button
                onClick={() => changeContent("comment")}
                className={`font-semibold text-gray-800 ${
                  content === "comment"
                    ? "border-b-4 border-blue-900 px-2 py-2"
                    : ""
                }`}
              >
                COMMENT
              </button>
            </div>
          </div>

          <hr className="mx-6 my-4 h-px border-0 bg-gray-700 py-0.5 sm:mx-10"></hr>

          <div className="mx-6 mb-12 mt-6 sm:mx-10 lg:mx-24 lg:mt-12">
            {content === "about" && fundingData?.project && (
              <AboutComponent about={fundingData.project.about} />
            )}
            {content === "milestone" && <MilestoneComponent />}
            {content === "comment" && <CommentComponent />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingPage;
