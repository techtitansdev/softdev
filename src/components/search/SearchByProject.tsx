import React from "react";
import { RiSearchLine } from "react-icons/ri";

interface SearchByProjectProps {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
}

const SearchByProject: React.FC<SearchByProjectProps> = ({
  value,
  onChange,
  onEnter,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnter(); 
    }
  };

  return (
    <div className="relative ml-auto flex items-center">
      <RiSearchLine className="absolute left-3 text-gray-500" size={20} />
      <input
        type="text"
        placeholder="Search"
        className="w-[240px] rounded-md border border-gray-500 py-2 pl-9 pr-4 outline-gray-400 md:w-[540px] lg:w-[300px]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchByProject;
