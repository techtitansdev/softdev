import Head from "next/head";
import { SetStateAction, useEffect, useState } from "react";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import { api } from "~/utils/api";
import ProjectCard from "./ProjectCard";
import FilterByCategory from "~/components/filter/FilterByCategory";
import { RiSearchLine } from "react-icons/ri";
import SearchInput from "~/components/search/SearchByProject";

const Projects = () => {
  const [projectData, setProjectData] = useState<any>([]);
  const getProjects = api.project.getAll.useQuery();

  useEffect(() => {
    if (getProjects.data) {
      setProjectData(getProjects.data);
      setFilteredProjects(getProjects.data);
    }
  }, [getProjects.data]);

  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);

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

    return matchesCategory && project.published;
  });

  return (
    <>
      <Head>
        <title>Projects | Global shapers</title>
        <meta name="description" content="Generated by create-next-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <Navbar />

      <div className="mx-auto mt-24 flex max-w-[280px] flex-row-reverse items-center justify-between md:mt-32 md:max-w-[570px] lg:mt-36 lg:max-w-[950px] lg:flex-row xl:max-w-[1275px]">
        <div className="relative flex items-center">
          <FilterByCategory
            selectedCategory={selectedCategory}
            isCategoryListOpen={isCategoryListOpen}
            toggleCategoryList={toggleCategoryList}
            handleCategorySelect={handleCategorySelect}
          />
        </div>

        <div className="relative ml-auto">
          <div className="flex items-center">
            <SearchInput
              value={searchQuery}
              onChange={handleSearchChange}
              onEnter={handleEnterPress}
            />
          </div>

          {searchSuggestions.length > 0 && (
            <ul className="absolute z-10 mt-2 max-h-[210px] w-[240px] overflow-scroll rounded-lg border border-gray-300 bg-white md:w-[540px] lg:w-[300px]">
              {searchSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="cursor-pointer px-2 py-2 hover:bg-gray-200"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-center">
                    <RiSearchLine size={15} className="mr-2" />
                    {suggestion}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mb-16 mt-1 flex items-center justify-center">
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filterProjects.map((project: any) => (
            <div key={project.id}>
              <ProjectCard projectData={project} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Projects;
