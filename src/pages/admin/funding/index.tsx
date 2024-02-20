import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Sidebar } from "~/components/Sidebar";
import { api } from "~/utils/api";
import FundingCard from "./components/fundinCard";
import Link from "next/link";

const AdminFunding = () => {
  const { user, isLoaded } = useUser();
  const user_role = user?.publicMetadata.admin;
  const router = useRouter();
  useEffect(() => {
    if (isLoaded && user_role !== "admin") {
      router.push("/home");
    }
  }, [isLoaded, user_role]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (isLoaded && user_role !== "admin") {
    return <div>UNAUTHORIZED</div>;
  }

  const mockFundingData = [
    {
      about: "<p>aasdasdasd</p>",
      beneficiaries: "ALl",
      category: "Air Pollution,Ageing,Justice",
      description: "this is a new Project",
      hub: "Iloilo",
      id: "clss7s8zg0000woh4g0hbzugm",
      image:
        "https://res.cloudinary.com/dzpghgd8d/image/upload/v1708303458/iua56fiskfmcxbjcrs2n.jpg",
      published: false,
      title: "New Project",
      type: "Project",
      goal: "150000",
      donors: "35",
      raised: "30500"
    },
    {
      about: "<p>aasdasdasd</p>",
      beneficiaries: "ALl",
      category: "Air Pollution,Ageing,Justice",
      description: "this is a new Project",
      hub: "Iloilo",
      id: "clss7s8zg0000woh4g0hbzugm",
      image:
        "https://res.cloudinary.com/dzpghgd8d/image/upload/v1708303458/iua56fiskfmcxbjcrs2n.jpg",
      published: false,
      title: "New Project 2",
      type: "Project",
      goal: "150000",
      donors: "35",
      raised: "30500"
    }
  ];
  const [projectData, setProjectData] = useState<any>([]);

  const getProjects = api.project.getAll.useQuery();
  const deleteProject = api.project.delete.useMutation();
  console.log(getProjects.data);
  useEffect(() => {
    if (getProjects.data) {
      setProjectData(mockFundingData);
    }
  }, [getProjects.data]);

  const handleDelete = async (id: string) => {
    try {
      deleteProject.mutate({ id });
      console.log("Project deleted successfully.");
      setProjectData((prevProjects: any[]) =>
        prevProjects.filter((project: { id: string }) => project.id !== id),
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Projects | Global shapers</title>
        <meta name="description" content="Generated by create-next-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <div className="flex">
        <Sidebar />

        <div className="mx-auto p-10">
          <div className="mt-16 border-b-2 border-black pb-4 text-2xl font-medium text-gray-800 md:text-3xl">
            FUNDING
          </div>

          <div className="mt-10 py-2 md:flex">
            <Link href={`/admin/projects/create`}>
              <button className="w-72 rounded-lg bg-blue-800 py-2 text-lg font-light text-white hover:bg-blue-900">
                Create Project
              </button>
            </Link>
          </div>

          <div className="mb-12 mt-4 flex items-center justify-center">
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {projectData.map((project: any) => (
                <div key={project.id} className="hover:bg-neutral-400/10">
                  <FundingCard
                    fundingData={project}
                    handleDelete={() => handleDelete(project.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminFunding;
