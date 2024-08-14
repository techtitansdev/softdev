import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import LoadingSpinner from "~/components/LoadingSpinner";
import Unauthorized from "~/components/Unauthorized";
import { api } from "~/utils/api";

const AboutComponent: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: projectData,
    isLoading,
    error,
  } = api.fundraiser.getById.useQuery({ id: id as string });

  const { user, isLoaded } = useUser();
  const user_role = user?.publicMetadata.admin;

  if (!isLoaded || isLoading) {
    return <LoadingSpinner />;
  }

  if (user_role !== "admin") {
    return <Unauthorized />;
  }

  if (error) {
    return <div>Error loading project data: {error.message}</div>;
  }

  const project = projectData?.project?.about[0];

  return (
    <div className="flex">
      <div className="mx-auto lg:max-w-[1200px] xl:max-w-[1230px]">
        <div className="flex flex-col-reverse items-center sm:pt-16 lg:flex-row lg:pt-6">
          <div className="w-full flex-col items-center justify-center lg:w-1/2">
            <p
              className="mb-2 mt-2 px-2 text-xl font-medium sm:mb-4 sm:mt-8 sm:px-6 sm:text-2xl lg:mt-4 lg:text-3xl xl:px-0 xl:text-4xl"
              style={{ color: project?.theme }}
            >
              {project?.projectTitle}
            </p>

            <p className="mb-2 px-2 text-xs font-light text-gray-800 sm:max-w-[700px] sm:px-6 sm:text-base md:max-w-[750px] lg:max-w-[530px] xl:px-0 xl:text-lg">
              {project?.projectDescription}
            </p>
            <p className="mb-8 px-2 text-xs font-light text-gray-800 sm:px-6 sm:text-base md:mb-44 md:max-w-[530px] lg:mb-0 lg:text-lg xl:px-0">
              Connect with us:
              <Link
                href={`${project?.projectLink}`}
                className={`ml-2 font-medium underline`}
                style={{ color: project?.theme }}
              >
                {project?.projectLink}
              </Link>
            </p>
          </div>

          <div className="mt-2 w-full rounded-md px-2 sm:px-6 lg:w-1/2 lg:max-w-[650px] lg:pr-6 xl:ml-12 xl:px-0">
            <img
              src={project?.projectImage}
              className="min-h-[200px] min-w-[200px] rounded-md object-cover sm:min-h-[350px] md:min-h-[260px]"
              alt="Project Image"
            />
          </div>
        </div>

        <div
          className={`mb:mt-10 mt-2 flex items-center justify-center text-2xl font-medium sm:text-3xl lg:mt-24 xl:text-4xl`}
          style={{ color: project?.theme }}
        >
          Project Objectives
        </div>

        <div className="mx-auto mb-1 mt-1 px-2 text-center text-xs font-light sm:text-base md:mt-3 md:max-w-[720px] lg:mb-10 lg:max-w-[950px] xl:text-lg">
          {project?.projectObjDescription}
        </div>

        <div className="">
          <img
            src={project?.projectObjImage}
            className="mx-auto mb-10 h-auto max-w-full"
            alt="Project Objectives"
          />
        </div>

        <div className="mx-auto mb-10 grid max-w-[1360px] grid-cols-1 items-center justify-center md:mb-16 lg:grid-cols-2">
          <div className="flex-col">
            <div
              className={`mb-1 text-center text-2xl font-medium md:text-3xl`}
              style={{ color: project?.theme }}
            >
              {project?.projectName1}
            </div>
            <div className="mb-3 text-center text-sm font-light md:text-base">
              {project?.projectName1Description}
            </div>
            <img
              src={project?.projectName1Image}
              className={`mx-auto w-[680px] md:h-[560px] lg:border-r-4 lg:pr-10`}
              style={{ borderColor: project?.theme }}
              alt="projectImage1"
            ></img>
          </div>

          <div className="flex-col lg:pl-8">
            <div
              className={`mb-1 mt-12 text-center text-2xl font-medium md:mt-16 md:text-3xl lg:mt-0`}
              style={{ color: project?.theme }}
            >
              {project?.projectName2}
            </div>
            <div className="mb-3 text-center text-sm font-light md:text-base">
              {project?.projectName2Description}
            </div>

            <img
              src={project?.projectName2Image}
              className="mx-auto w-[680px] md:h-[560px]"
              alt="projectImage2"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
