import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Footer } from "~/components/Footer";
import LoadingSpinner from "~/components/LoadingSpinner";
import { Navbar } from "~/components/Navbar";
import Image from "next/image";
import { api } from "~/utils/api";

const SpecificProjectDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: projectData,
    error,
    isLoading,
  } = api.project.getById.useQuery({
    id: id as string,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error loading project data: {error.message}</div>;
  }

  const project = projectData?.about[0];

  return (
    <>
      <Head>
        <title>{project?.projectTitle} | Global Shapers Iloilo</title>
        <meta name="description" content="Project details page" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <Navbar />

      <div className="mx-auto mt-[80px] lg:max-w-[1200px] xl:max-w-[1230px]">
        <div className="flex flex-col-reverse items-center sm:pt-16 lg:flex-row lg:pt-28">
          <div className="w-full flex-col items-center justify-center lg:w-1/2">
            {project?.projectTitle && (
              <p
                className="mb-2 mt-2 px-4 text-xl font-medium sm:mb-4 sm:mt-8 sm:px-6 sm:text-2xl lg:mt-4 lg:text-3xl xl:px-0 xl:text-4xl"
                style={{ color: project?.theme }}
              >
                {project.projectTitle}
              </p>
            )}

            {project?.projectDescription && (
              <p className="mb-2 px-4 text-xs font-light text-gray-800 sm:max-w-[700px] sm:px-6 sm:text-base md:max-w-[1000px] lg:max-w-[530px] xl:px-0 xl:text-lg">
                {project.projectDescription}
              </p>
            )}

            {project?.projectLink && (
              <p className="mb-8 px-4 text-xs font-light text-gray-800 sm:px-6 sm:text-base md:mb-4 md:max-w-[530px] lg:mb-0 lg:text-lg xl:px-0">
                Connect with us:
                <Link
                  href={`${project.projectLink}`}
                  className={`ml-2 font-medium underline`}
                  style={{ color: project?.theme }}
                >
                  {project.projectLink}
                </Link>
              </p>
            )}
          </div>

          {project?.projectImage && (
            <div className="mt-2 w-full rounded-md px-4 sm:px-6 lg:w-1/2 lg:max-w-[650px] lg:pr-6 xl:ml-12 xl:px-0">
              <div className="relative h-[260px] rounded-md sm:h-[350px]">
                <Image
                  src={project.projectImage}
                  alt="Project Image"
                  layout="fill"
                  className="rounded-md"
                />
              </div>
            </div>
          )}
        </div>

        <div
          className={`mt-2 flex items-center justify-center text-2xl font-medium sm:text-3xl md:mt-10 lg:mt-24 xl:text-4xl`}
          style={{ color: project?.theme }}
        >
          Project Objectives
        </div>

        {project?.projectObjDescription && (
          <div className="mx-auto mb-1 mt-1 px-4 text-center text-xs font-light sm:text-base md:mt-3 md:max-w-[720px] lg:mb-10 lg:max-w-[950px] xl:text-lg">
            {project.projectObjDescription}
          </div>
        )}

        {project?.projectObjImage && (
          <div className="relative mx-auto mb-6 md:mb-10">
            <div className="h-auto w-full">
              <Image
                src={project.projectObjImage}
                alt="Project Objectives"
                layout="responsive"
                width={1200}
                height={675}
                className="rounded-md"
              />
            </div>
          </div>
        )}

        <div className="mx-auto mb-4 grid max-w-[1360px] grid-cols-1 items-center justify-center md:mb-16 lg:grid-cols-2">
          {project?.projectName1 && (
            <div className="flex-col">
              <div
                className={`mb-1 text-center text-2xl font-medium md:text-3xl`}
                style={{ color: project?.theme }}
              >
                {project.projectName1}
              </div>
              {project?.projectName1Description && (
                <div className="mb-3 text-center text-sm font-light md:text-base">
                  {project.projectName1Description}
                </div>
              )}
              {project?.projectName1Image && (
                <img
                  src={project.projectName1Image}
                  className={`mx-auto w-[680px] md:h-[560px] ${project?.theme ? "lg:border-r-4 lg:pr-10" : ""}`}
                  style={{ borderColor: project?.theme }}
                  alt="projectImage1"
                />
              )}
            </div>
          )}

          {project?.projectName2 && (
            <div className="flex-col lg:pl-8">
              <div
                className={`mb-1 mt-10 text-center text-2xl font-medium md:mt-16 md:text-3xl lg:mt-0`}
                style={{ color: project?.theme }}
              >
                {project.projectName2}
              </div>
              {project?.projectName2Description && (
                <div className="mb-3 text-center text-sm font-light md:text-base">
                  {project.projectName2Description}
                </div>
              )}
              {project?.projectName2Image && (
                <img
                  src={project.projectName2Image}
                  className="mx-auto w-[680px] md:h-[560px]"
                  alt="projectImage2"
                />
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SpecificProjectDetails;
