import React from "react";
import { RiSearchLine } from "react-icons/ri";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="relative ml-auto">
      <input
        type="text"
        placeholder="Search"
        className="w-[320px] rounded-md border border-gray-600 py-2 pl-4 pr-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="absolute bottom-0 right-0 top-0 rounded-r-md bg-blue-700 px-3 py-2.5 text-white hover:bg-blue-800"
        onClick={onSearch}
      >
        <RiSearchLine size={20} className="text-white" />
      </button>
    </div>
  );
};

export default SearchInput;
