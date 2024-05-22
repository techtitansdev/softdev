import { useState, useEffect, SetStateAction } from "react";
import Link from "next/link";
import ProjectCard from "./components/ProjectCard";
import { Sidebar } from "~/components/Sidebar";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { Modal } from "~/components/Modal";
import Head from "next/head";
import { RiSearchLine } from "react-icons/ri";
import SearchByProject from "~/components/search/SearchByProject";
import FilterByCategory from "~/components/filter/FilterByCategory";
import FilterByStatus from "~/components/filter/FilterByStatus";
import Unauthorized from "~/components/Unauthorized";
import Loading from "~/components/Loading";

const AdminProjectPage = () => {
  const [projectData, setProjectData] = useState<any>([]);
  const getProjects = api.project.getAll.useQuery();
  const deleteProject = api.project.delete.useMutation();
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [selectedPublishedOption, setSelectedPublishedOption] =
    useState("Status");
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);

  useEffect(() => {
    if (getProjects.data) {
      const sortedProjects = getProjects.data.sort((a: any, b: any) =>
        a.featured === b.featured ? 0 : a.featured ? -1 : 1,
      );
      setProjectData(sortedProjects);
    }
  }, [getProjects.data]);

  const toggleCategoryList = () => {
    setIsCategoryListOpen(!isCategoryListOpen);
  };

  const handleCategorySelect = (category: SetStateAction<string>) => {
    setSelectedCategory(category);
    setIsCategoryListOpen(false);
    setFilteredProjects(projectData);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    if (value !== "") {
      const filteredByCategory = filterProjects.filter((project: any) =>
        project.title.toLowerCase().includes(value.toLowerCase()),
      );

      const suggestions = filteredByCategory.map(
        (project: any) => project.title,
      );
      setSearchSuggestions(
        suggestions.length > 0 ? suggestions : ["No results found"],
      );
    } else {
      setSearchSuggestions([]);
      setFilteredProjects(projectData);
    }
  };

  const handleEnterPress = () => {
    if (searchQuery !== "") {
      const filtered = projectData.filter((project: any) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projectData);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      deleteProject.mutate({ id });
      console.log("Project deleted successfully.");
      setSuccessModalOpen(true);
      setProjectData((prevProjects: any[]) =>
        prevProjects.filter((project: { id: string }) => project.id !== id),
      );

      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);

    const filtered = projectData.filter((project: any) =>
      project.title.toLowerCase().includes(suggestion.toLowerCase()),
    );
    setFilteredProjects(filtered);
    setSearchSuggestions([]);
  };

  const filterProjects = (
    searchQuery !== "" ? filteredProjects : projectData
  ).filter((project: any) => {
    const matchesCategory =
      selectedCategory === "All" ||
      selectedCategory === "Categories" ||
      project.category
        .split(",")
        .map((category: string) => category.trim())
        .includes(selectedCategory);

    const matchesPublished =
      selectedPublishedOption === "All" ||
      selectedPublishedOption === "Status" ||
      (selectedPublishedOption === "Published" && project.published) ||
      (selectedPublishedOption === "Draft" && !project.published);

    return matchesCategory && matchesPublished;
  });

  const { user, isLoaded } = useUser();
  const user_role = user?.publicMetadata.admin;

  useEffect(() => {}, [isLoaded, user_role]);
  if (!isLoaded) {
    return <Loading />;
  }
  if (user_role !== "admin") {
    return <Unauthorized />;
  }

  return (
    <>
      <Head>
        <title>Projects | Global Shapers Iloilo</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <div className="flex">
        <Sidebar />

        <div className="mx-auto mt-14 p-10">
          <div className="flex items-center justify-between">
            <div className="font-medium md:text-3xl">PROJECTS</div>

            <Link href={`/admin/projects/create`}>
              <button className="w-[278px] rounded-lg bg-blue-800 py-2 text-lg font-light text-white hover:bg-blue-900">
                Create Project
              </button>
            </Link>
          </div>

          <div className="mb-14 border-b-2 border-black pb-4 text-2xl text-gray-800"></div>

          <div className="mx-auto flex max-w-[280px] flex-row-reverse items-center justify-between md:max-w-[570px] lg:max-w-[950px] lg:flex-row xl:max-w-[1275px]">
            <div className="relative flex items-center">
              <FilterByCategory
                selectedCategory={selectedCategory}
                isCategoryListOpen={isCategoryListOpen}
                toggleCategoryList={toggleCategoryList}
                handleCategorySelect={handleCategorySelect}
              />
              <div className="relative ml-6 flex items-center">
                <FilterByStatus
                  selectedOption={selectedPublishedOption}
                  handleOptionSelect={setSelectedPublishedOption}
                />
              </div>
            </div>

            <div className="relative ml-auto">
              <div className="flex items-center">
                <SearchByProject
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onEnter={handleEnterPress}
                />
              </div>

              {searchSuggestions.length > 0 && (
                <ul className="absolute z-10 mt-1 max-h-[210px] w-[240px] overflow-scroll rounded border border-gray-300 bg-white md:w-[540px] lg:w-[300px]">
                  {searchSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="cursor-pointer px-2 py-2 hover:bg-gray-200"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex items-center">
                        <RiSearchLine size={15} className="ml-2 mr-2" />
                        {suggestion}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mb-12 mt-1 flex items-center justify-center">
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filterProjects.map((project: any) => (
                <div key={project.id}>
                  <ProjectCard
                    projectData={project}
                    handleDelete={() => handleDelete(project.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Modal
          isOpen={isSuccessModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          message="Project Deleted Successfully."
          bgColor="bg-red-500"
        />
      </div>
    </>
  );
};

export default AdminProjectPage;
