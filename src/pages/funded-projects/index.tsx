import Head from "next/head";
import { SetStateAction, useEffect, useState } from "react";
import { Navbar } from "~/components/Navbar";
import { api } from "~/utils/api";
import FundingCard from "./components/FundingCard";
import { RiSearchLine } from "react-icons/ri";
import FilterByCategory from "~/components/FilterByCategory";
import { Footer } from "~/components/Footer";
import FundraiserSearchInput from "~/components/FundraiserSearch";

const FundedProjects = () => {
  const [fundingData, setFundingData] = useState<any>([]);
  const getFunding = api.fundraiser.getAll.useQuery();

  useEffect(() => {
    if (getFunding.data) {
      setFundingData(getFunding.data);
      setFilteredFunding(getFunding.data);
    }
  }, [getFunding.data]);

  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [filteredFunding, setFilteredFunding] = useState<any[]>([]);

  const toggleCategoryList = () => {
    setIsCategoryListOpen(!isCategoryListOpen);
  };

  const handleCategorySelect = (category: SetStateAction<string>) => {
    setSelectedCategory(category);
    setIsCategoryListOpen(false);
    setFilteredFunding(fundingData);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    if (value !== "") {
      const suggestions = fundingData
        .filter((funding: any) =>
          funding.project.title.toLowerCase().includes(value.toLowerCase()),
        )
        .map((funding: any) => funding.project.title);
      setSearchSuggestions(
        suggestions.length > 0 ? suggestions : ["No results found"],
      );
    } else {
      setSearchSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSearchSuggestions([]);
  };

  const handleSearchButtonClick = () => {
    const filtered = fundingData.filter((funding: any) =>
      funding.project.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredFunding(filtered);
  };

  const filterFunding = (
    searchQuery !== "" ? filteredFunding : fundingData
  ).filter((funding: any) => {
    const matchesCategory =
      selectedCategory === "Categories" ||
      funding.project.category
        .split(",")
        .map((category: string) => category.trim())
        .includes(selectedCategory);

    return matchesCategory && funding.published;
  });

  return (
    <>
      <Head>
        <title>Funded Projects | Global shapers</title>
        <meta name="description" content="Generated by create-next-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <Navbar />

      <div className="mx-auto mt-24 flex max-w-[363px] flex-row-reverse items-center justify-between md:mt-32 lg:mt-36 lg:max-w-[768px] lg:flex-row xl:max-w-[1177px]">
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
            <FundraiserSearchInput
              value={searchQuery}
              onChange={handleSearchChange}
              onSearch={handleSearchButtonClick}
            />
          </div>

          {searchSuggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 max-h-[325px] w-[325px] overflow-scroll rounded border border-gray-300 bg-white lg:w-[360px]">
              {searchSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="cursor-pointer px-2 py-1 hover:bg-gray-400"
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

      <div className="mx-auto">
        <div className="mb-12 mt-1 flex items-center justify-center">
          <div className="mt-4 grid grid-cols-1 gap-12 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {filterFunding.map((project: any) => (
              <div key={project.id}>
                <FundingCard fundingData={project} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FundedProjects;
