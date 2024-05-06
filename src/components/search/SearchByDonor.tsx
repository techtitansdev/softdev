import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

type SearchBarProps = {
  data: Array<{
    fullName: string;
    date: string;
    projectName: string;
    email: string;
    contact: string;
    donatedAs: string;
    amount: number;
  }>;
  onSearch: (
    filteredData: Array<{
      fullName: string;
      date: string;
      projectName: string;
      email: string;
      contact: string;
      donatedAs: string;
      amount: number;
    }>,
  ) => void;
  selectedProject: string;
};

const SearchByDonor: React.FC<SearchBarProps> = ({
  data,
  onSearch,
  selectedProject,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const filteredData = data.filter(
      (item) =>
        item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedProject === "All" || item.projectName === selectedProject),
    );
    onSearch(filteredData);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative ml-auto flex items-center">
      <RiSearchLine className="absolute left-3 text-gray-500" size={20} />
      <input
        type="text"
        placeholder="Search donors"
        className="w-[250px] rounded-md border border-gray-500 py-2 pl-9 pr-4 outline-gray-400"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default SearchByDonor;
