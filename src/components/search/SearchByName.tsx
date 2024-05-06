import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

type SearchBarProps = {
  data: Array<{
    name: string;
    date: string;
    comment: string;
    projectName: string;
    email: string;
  }>;
  onSearch: (
    filteredData: Array<{
      name: string;
      date: string;
      comment: string;
      projectName: string;
      email: string;
    }>,
  ) => void;
  selectedProject: string; 
};

const SearchByName: React.FC<SearchBarProps> = ({
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
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
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
        placeholder="Search users"
        className="w-[250px] rounded-md border border-gray-500 py-2 pl-9 pr-4 outline-gray-400"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default SearchByName;
