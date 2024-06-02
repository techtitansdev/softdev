import React, { useEffect, useState } from "react";
import { Sidebar } from "~/components/Sidebar";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import SearchByDonor from "~/components/search/SearchByDonor";
import Loading from "~/components/Loading";
import Unauthorized from "~/components/Unauthorized";
import { api } from "~/utils/api";
import FilterByProjectName from "~/components/filter/FilterByProjectName";

type Donor = {
  fullName: string;
  date: string;
  email: string;
  contact: string;
  projectName: string;
  paymentMethod: string;
  amount: number;
};

const Donors = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [tableData, setTableData] = useState<Donor[]>([]);
  const [selectedProject, setSelectedProject] = useState("All");
  const [isNameSortedAscending, setIsNameSortedAscending] = useState(true);
  const [isProjectListOpen, setIsProjectListOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState(tableData);
  const [searchInteraction, setSearchInteraction] = useState(false);
  const [confirmedSearchQuery, setConfirmedSearchQuery] = useState("");

  useEffect(() => {
    filterData();
    setCurrentPage(1);
  }, [selectedProject, confirmedSearchQuery]);

  const donors = api.funding.getAll.useQuery();

  useEffect(() => {
    if (donors.data) {
      const transformedData = donors.data.map((item) => ({
        fullName: item.fullName,
        date: new Date(item.date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        email: item.email || "",
        contact: item.contact,
        projectName: item.projectName || "",
        paymentMethod: item.paymentMethod || "",
        amount: item.amount,
      }));
      setTableData(transformedData);
      setCurrentPage(1);
    }
  }, [donors.data]);

  const filterData = () => {
    const filtered = tableData.filter((item) => {
      const matchesProject =
        selectedProject === "All" || item.projectName.includes(selectedProject);
      const matchesSearchQuery =
        confirmedSearchQuery === "" ||
        item.fullName
          .toLowerCase()
          .includes(confirmedSearchQuery.toLowerCase());
      return matchesProject && matchesSearchQuery;
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    if (searchQuery === "") {
      setConfirmedSearchQuery("");
    }
  }, [searchQuery]);

  useEffect(() => {
    filterData();
  }, [selectedProject, confirmedSearchQuery, tableData]);

  useEffect(() => {
    filterData();
    setCurrentPage(1);
  }, [selectedProject, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const sortedData = filteredData.slice().sort((a, b) => {
    const fullNameComparison = isNameSortedAscending
      ? a.fullName.localeCompare(b.fullName)
      : b.fullName.localeCompare(a.fullName);
    return fullNameComparison;
  });

  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const toggleNameSortOrder = () => {
    setIsNameSortedAscending(!isNameSortedAscending);
  };

  const handleProjectSelect = (project: string) => {
    setSelectedProject(project);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    const suggestions = tableData
      .filter((item) => {
        const matchesProject =
          selectedProject === "All" ||
          item.projectName.includes(selectedProject);
        const matchesName = item.fullName
          .toLowerCase()
          .includes(value.toLowerCase());
        return matchesProject && matchesName;
      })
      .map((item) => item.fullName);

    const uniqueSuggestions = Array.from(new Set(suggestions));

    setSearchSuggestions(uniqueSuggestions);
  };

  const handleEnterPress = () => {
    if (searchQuery) {
      setConfirmedSearchQuery(searchQuery);
      setSearchSuggestions([]);
      setSearchInteraction(true);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setConfirmedSearchQuery(suggestion);
    setSearchQuery(suggestion);
    setSearchSuggestions([]);
    setSearchInteraction(true);
  };

  const renderPageNumbers = () => {
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > 5) {
      if (currentPage <= 3) {
        endPage = 5;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`mx-1 rounded-md border border-gray-300 px-3 py-1 text-gray-600 ${
            currentPage === i ? "bg-gray-200" : ""
          }`}
        >
          {i}
        </button>,
      );
    }
    return pages;
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
        <title>Donors | Global shapers</title>
        <meta name="description" content="Generated by create-next-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <div className="flex">
        <Sidebar />
        <div className="mx-auto w-full max-w-[1350px] p-10">
          <div className="mt-16 border-b border-black pb-4 text-2xl font-normal text-gray-800 md:text-3xl">
            DONORS
          </div>
          <div className="relative mb-3 mt-10 flex items-center">
            <div className="mr-5 text-sm">
              <FilterByProjectName
                selectedProject={selectedProject}
                isProjectListOpen={isProjectListOpen}
                toggleProjectList={() =>
                  setIsProjectListOpen(!isProjectListOpen)
                }
                handleProjectSelect={handleProjectSelect}
              />
            </div>
            <div className="relative ml-auto">
              <div className="flex items-center">
                <SearchByDonor
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onEnter={handleEnterPress}
                />
                {searchQuery && searchSuggestions.length > 0 && (
                  <ul className="absolute top-full z-10 mt-1 max-h-[188px] w-[250px] overflow-y-auto rounded-md border border-gray-300 bg-white text-sm shadow-lg">
                    {searchSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <table className="w-full rounded-t-lg border-2">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-700 border-r-gray-100 py-3 pl-8 text-left text-sm font-medium text-gray-700">
                    <div
                      className="flex cursor-pointer items-center"
                      onClick={toggleNameSortOrder}
                    >
                      {isNameSortedAscending ? (
                        <span>
                          <AiOutlineSortAscending size={17} />
                        </span>
                      ) : (
                        <span>
                          <AiOutlineSortDescending size={17} />
                        </span>
                      )}
                      <span className="ml-1">Full Name</span>
                    </div>
                  </th>
                  <th className="border border-gray-700 border-r-gray-100 py-3 pl-8 text-left text-sm font-medium text-gray-700">
                    Email
                  </th>
                  <th className="border border-gray-700 border-r-gray-100 py-3 pl-8 text-left text-sm font-medium text-gray-700">
                    Contact
                  </th>
                  <th className="border border-gray-700 border-r-gray-100 py-3 pl-8 text-left text-sm font-medium text-gray-700">
                    Date
                  </th>
                  <th className="border border-gray-700 border-r-gray-100 py-3 pl-8 text-left text-sm font-medium text-gray-700">
                    Project Name
                  </th>
                  <th className="border border-gray-700 border-r-gray-100 py-3 pl-8 text-left text-sm font-medium text-gray-700">
                    Payment Method
                  </th>
                  <th className="border border-gray-700 border-r-gray-100 py-3 pl-8 text-left text-sm font-medium text-gray-700">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border-2 border-r-white py-4 pl-8 text-left text-sm font-light text-gray-700">
                      {item.fullName}
                    </td>
                    <td className="border-2 border-r-white py-4 pl-8 text-left text-sm font-light text-gray-700">
                      {item.email}
                    </td>
                    <td className="border-2 border-r-white py-4 pl-8 text-left text-sm font-light text-gray-700">
                      {item.contact}
                    </td>
                    <td className="border-2 border-r-white py-4 pl-8 text-left text-sm font-light text-gray-700">
                      {item.date}
                    </td>
                    <td className="border-2 border-r-white py-4 pl-8 text-left text-sm font-light text-gray-700">
                      {item.projectName}
                    </td>
                    <td className="border-2 border-r-white py-4 pl-8 text-left text-sm font-light text-gray-700">
                      {item.paymentMethod}
                    </td>
                    <td className="border-2 py-4 pl-8 text-left text-sm font-light text-gray-700">
                      {item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-2 border-t-white py-3">
            <button
              onClick={() => {
                if (currentPage !== 1) {
                  paginate(currentPage - 1);
                }
              }}
              disabled={currentPage === 1}
              className={`ml-5 flex items-center rounded-md border bg-gray-50 px-3 py-1 text-gray-600 ${
                currentPage !== 1 ? "cursor-pointer hover:bg-gray-200" : ""
              }`}
            >
              <GrFormPreviousLink size={22} />
              <span className="text-sm">Previous</span>
            </button>
            <div className="flex">{renderPageNumbers()}</div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastItem >= filteredData.length}
              className={`mr-5 flex items-center rounded-md border bg-gray-50 px-3 py-1 text-gray-600 ${
                indexOfLastItem < filteredData.length
                  ? "cursor-pointer hover:bg-gray-200"
                  : ""
              }`}
            >
              <span className="text-sm">Next</span>
              <GrFormNextLink size={22} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donors;
