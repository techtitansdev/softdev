import Head from "next/head";
import { useState, SetStateAction } from "react";
import Link from "next/link";
import ProjectCard from "./components/ProjectCard";
import { projectData } from "~/data/ProjectData";
import Header from "./components/Header";
import { Sidebar } from "~/components/Sidebar";

const AdminProjectPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Categories");


  return (
    <>
   <Head>
        <title>Projects | Global shapers</title>
        <meta name="description" content="Generated by create-next-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>
      <div className="border-4px flex">
      <Sidebar/>
        <div className="flex-1 bg-gray-100 p-10">
          <Header> PROJECTS</Header>
          <div className="  mt-12 items-center justify-between overflow-hidden md:flex">
            <div className="py-2 md:ml-2 md:flex md:px-2">
              <Link href={`/admin/projects/create`}>
                <button className="w-72 rounded-lg bg-blue-800 px-16 py-2 text-lg font-light text-white hover:bg-blue-900">
                  Create Project
                </button>
              </Link>
            </div>
          </div>

          <div
            className="
          mb-12
           mt-4 
           flex 
           items-center 
           justify-center
          "
          >
            <div
              className="
          mt-4
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          md:grid-cols-2
          lg:grid-cols-2
          xl:grid-cols-4
            "
            >
              {projectData
                .filter(
                  (card: { category: string; }) =>
                    selectedCategory === "Categories" ||
                    card.category === selectedCategory,
                )
                .filter((card: { projectTitle: string; }) =>
                  card.projectTitle
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
                )
                .map((card: any, index: any) => (
                  <div className=" hover:bg-neutral-400/10">
                    <ProjectCard projectData={card} index={index} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProjectPage;