import React, { ChangeEvent } from "react";
import { RiSearchLine } from "react-icons/ri";

type SearchByNameProps = {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
};

const SearchByName: React.FC<SearchByNameProps> = ({
  value,
  onChange,
  onEnter,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="relative ml-auto flex items-center">
      <RiSearchLine className="absolute left-3 text-gray-500" size={20} />
      <input
        type="text"
        placeholder="Search by name"
        className="w-[250px] rounded-md border border-gray-500 py-2 pl-9 pr-4 text-sm outline-gray-400"
        value={value}
        onChange={handleChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onEnter();
          }
        }}
      />
    </div>
  );
};

export default SearchByName;
