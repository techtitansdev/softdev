import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Sidebar } from "~/components/Sidebar";
import { api } from "~/utils/api";
import FundingCard from "./components/fundingCard";
import Link from "next/link";

const AdminFunding = () => {
  const mockFundingData = [
    {
      about: "<p>aasdasdasd</p>",
      beneficiaries: "ALl",
      category: "Air Pollution,Ageing,Justice",
      description:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aeneaneu ante ac nisi rutrum viverra at eget ligula. Duis egestascondimentum nunc ut egestas.",
      hub: "Iloilo",
      id: "clss7s8zddsdfg0000woh4g0hbzugm",
      image: "/tech4all.png",
      published: false,
      title: "Tech For All",
      type: "Project",
      goal: "10000",
      donors: "35",
      raised: "3000",
    },
    {
      about: "<p>aasdasdasd</p>",
      beneficiaries: "All",
      category: "Air Pollution,Ageing,Justice",
      description: "Lorem ipsum dolor sit amet",
      hub: "Iloilo",
      id: "clss7fsds8zg0000woh4g0hbzugm",
      image: "/lungti.png",
      published: false,
      title: "Lungti",
      type: "Project",
      goal: "10000",
      donors: "25",
      raised: "19500",
    },
    {
      about: "<p>aasdasdasd</p>",
      beneficiaries: "All",
      category: "Air Pollution,Ageing,Justice",
      description: "Lorem ipsum dolor sit amet",
      hub: "Iloilo",
      id: "clss7s5348zg0000woh4g0hbzugm",
      image: "/youvote.png",
      published: false,
      title: "YouVote",
      type: "Project",
      goal: "10000",
      donors: "25",
      raised: "19500",
    },
  ];
  const [projectData, setProjectData] = useState<any>([]);
  
  const getFunding = api.fundraiser.getAll.useQuery();
  const deleteProject = api.project.delete.useMutation();
  console.log(getFunding.data);
  useEffect(() => {
    if (getFunding.data) {
      setProjectData(getFunding.data);
    }
  }, [getFunding.data]);

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

  return (
    <>
      <Head>
        <title>Funding | Global shapers</title>
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
            <Link href={`/admin/funding/createFunding`}>
              <button className="w-72 rounded-lg bg-blue-800 py-2 text-lg font-light text-white hover:bg-blue-900">
                Create Funding
              </button>
            </Link>
          </div>

          <div className="mb-12 mt-1 flex items-center justify-center">
            <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {projectData.map((project: any) => (
                <div key={project.id}>
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