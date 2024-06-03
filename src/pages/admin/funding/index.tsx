import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { SetStateAction, useEffect, useState } from "react";
import { Sidebar } from "~/components/Sidebar";
import { api } from "~/utils/api";
import Link from "next/link";
import { Modal } from "~/components/Modal";
import Loading from "~/components/Loading";
import Unauthorized from "~/components/Unauthorized";
import FilterByCategory from "~/components/filter/FilterByCategory";
import FilterByStatus from "~/components/filter/FilterByStatus";
import SearchByProject from "~/components/search/SearchByProject";
import { RiSearchLine } from "react-icons/ri";
import FundingCardComponent from "./components/FundingCardComponent";

const AdminFunding = () => {
  const [fundingData, setFundingData] = useState<any>([]);
  const getFunding = api.fundraiser.getAll.useQuery();
  const deleteProject = api.fundraiser.delete.useMutation();

  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [selectedPublishedOption, setSelectedPublishedOption] =
    useState("Status");
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);

  useEffect(() => {
    if (getFunding.data) {
      const sortedFunding = getFunding.data.sort((a: any, b: any) =>
        a.featured === b.featured ? 0 : a.featured ? -1 : 1,
      );
      setFundingData(sortedFunding);
    }
  }, [getFunding.data]);

  const toggleCategoryList = () => {
    setIsCategoryListOpen(!isCategoryListOpen);
  };

  const handleCategorySelect = (category: SetStateAction<string>) => {
    setSelectedCategory(category);
    setIsCategoryListOpen(false);
    setFilteredProjects(fundingData);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    if (value !== "") {
      const filteredByCategory = filterProjects.filter((funding: any) =>
        funding.project.title.toLowerCase().includes(value.toLowerCase()),
      );

      const suggestions = filteredByCategory.map(
        (funding: any) => funding.project.title,
      );
      setSearchSuggestions(
        suggestions.length > 0 ? suggestions : ["No results found"],
      );
    } else {
      setSearchSuggestions([]);
      setFilteredProjects(fundingData);
    }
  };

  const handleEnterPress = () => {
    if (searchQuery !== "") {
      const filtered = fundingData.filter((funding: any) =>
        funding.project.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(fundingData);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);

    const filtered = fundingData.filter((funding: any) =>
      funding.project.title.toLowerCase().includes(suggestion.toLowerCase()),
    );
    setFilteredProjects(filtered);
    setSearchSuggestions([]);
  };

  const filterProjects = (
    searchQuery !== "" ? filteredProjects : fundingData
  ).filter((funding: any) => {
    const matchesCategory =
      selectedCategory === "All" ||
      selectedCategory === "Categories" ||
      funding.project.category
        .split(",")
        .map((category: string) => category.trim())
        .includes(selectedCategory);

    const matchesPublished =
      selectedPublishedOption === "All" ||
      selectedPublishedOption === "Status" ||
      (selectedPublishedOption === "Published" && funding.published) ||
      (selectedPublishedOption === "Draft" && !funding.published);

    return matchesCategory && matchesPublished;
  });

  const handleDelete = async (id: string) => {
    try {
      deleteProject.mutate({ id });
      console.log("Fundraiser deleted successfully.");
      setSuccessModalOpen(true);
      setFundingData((prevProjects: any[]) =>
        prevProjects.filter((funding: { id: string }) => funding.id !== id),
      );
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting fundraiser:", error);
    }
  };

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
        <title>Funding | Global shapers</title>
        <meta name="description" content="Generated by create-next-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <div className="flex">
        <Sidebar />

        <div className="mx-auto mt-14 p-10">
          <div className="flex items-center justify-between">
            <div className="font-medium md:text-3xl">FUNDING</div>

            <Link href={`/admin/funding/create`}>
              <button className="w-[278px] rounded-lg bg-blue-800 py-2 text-lg font-light text-white hover:bg-blue-900">
                Create Funding
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
            <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {filterProjects.map((project: any) => (
                <div key={project.id}>
                  <FundingCardComponent
                    fundingData={project}
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
          message="Funding Deleted Successfully."
          bgColor="bg-red-500"
        />
      </div>
    </>
  );
};

export default AdminFunding;
