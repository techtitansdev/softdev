import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { api } from "~/utils/api";
import Image from "next/image";

const FeaturedProjects = () => {
  const [projectData, setProjectData] = useState<any>([]);
  const getProjects = api.project.getAll.useQuery();

  useEffect(() => {
    if (getProjects.data) {
      setProjectData(getProjects.data);
    }
  }, [getProjects.data]);

  const featuredProjects = projectData.filter(
    (project: { featured: boolean; published: boolean }) =>
      project.featured === true && project.published === true,
  );

  return (
    <div className="bg-gray-50 bg-cover bg-center shadow">
      <div className="mx-auto max-w-screen-xl py-6 pb-10 lg:p-6 lg:py-6 xl:pb-12">
        <div className="mx-auto mt-1 text-center text-2xl font-normal text-gray-800 sm:mt-4 sm:max-w-[610px] sm:text-left sm:text-3xl md:font-medium xl:mx-0 xl:max-w-[900px]">
          FEATURED PROJECTS
        </div>

        <div className="mx-auto px-6 pb-5 text-center text-sm font-light text-gray-700 sm:max-w-[610px] sm:px-0 sm:text-left xl:mx-0 xl:max-w-[900px] xl:text-base">
          Shaping Iloilo through our new hub projects by implementing innovative
          solutions that foster positive social change.
        </div>

        <div className="mb-2 flex items-center justify-center">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
            {featuredProjects.map((card: any) => (
              <div key={card.id}>
                <Link href={`/projects/${card.id}`}>
                  <div className="w-full transform cursor-pointer justify-self-start rounded-lg font-medium shadow transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 dark:bg-white">
                    <div className="relative h-52 w-72">
                      <Image
                        src={card.image}
                        alt={card.title}
                        layout="fill"
                        className="rounded-t-lg object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="card-title">
                        <div className="mb-1 max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap text-xl tracking-tight text-gray-900">
                          {card.title}
                        </div>
                      </div>

                      <div className="flex items-center font-normal text-gray-800 dark:text-gray-500">
                        <IoLocationSharp size={15} />
                        <span className="ml-1 max-w-[235px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {card.hub}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects;
