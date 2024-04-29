import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { IoFilterOutline } from "react-icons/io5";
import { FilteredCategoriesProps } from "~/types/filter";
import { api } from "~/utils/api";

interface Category {
  label: string;
  value: string;
}

const FilterByCategory = ({
  selectedCategory,
  handleCategorySelect,
}: FilteredCategoriesProps) => {
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const { data: categoriesOption } =
    api.categories.getAllCategories.useQuery<Category[]>();

  const toggleCategoryList = () => {
    setIsCategoryListOpen(!isCategoryListOpen);
  };

  const sortedCategories = categoriesOption
    ? [...categoriesOption].sort((a, b) => a.label.localeCompare(b.label))
    : [];

  return (
    <div className="relative z-10">
      <div className="mx-1 ml-2 lg:mx-2 lg:hidden">
        <IoFilterOutline
          size={26}
          onClick={toggleCategoryList}
          className="cursor-pointer"
        />
      </div>
      <div
        className={`hidden w-[300px] cursor-pointer items-center justify-between rounded-md border border-gray-500 bg-white p-2 lg:flex ${
          isCategoryListOpen ? "z-10" : "z-0"
        }`}
        onClick={toggleCategoryList}
      >
        {selectedCategory}
        <BiChevronDown size={20} />
      </div>
      {isCategoryListOpen && (
        <div className="absolute right-0 mt-7 max-h-56 w-[280px] overflow-y-auto border border-gray-500 bg-white md:right-[-8px] lg:left-0 lg:mt-2 lg:w-[300px] rounded-lg">
          {sortedCategories.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => {
                handleCategorySelect(option.value);
                toggleCategoryList();
              }}
            >
              {option.label}
              <hr className="border-t-1 my-2 border-dashed border-gray-500"></hr>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterByCategory;
