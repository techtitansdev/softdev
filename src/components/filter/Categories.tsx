import React from "react";
import { BiChevronDown } from "react-icons/bi";

type FilteredCategoriesProps = {
  selectedCategory: string;
  isCategoryListOpen: boolean;
  toggleCategoryList: () => void;
  handleCategorySelect: (status: string) => void;
};

const categoryOptions = [
  "Arts & Culture",
  "Cities & Urbanization",
  "Civic Participation",
  "Climate Change",
  "COVID-19 Response",
  "Entrepreneurship",
  "Fourth Industrial Revolution",
  "Gender Equality",
  "Global Health",
  "Migration",
  "Shaping My City's Future",
  "Sustainable Development",
  "Values",
  "Water",
  "#WeSeeEqual",
  "Workforce and Employment",
];

const FilterByCategory = ({
  selectedCategory,
  isCategoryListOpen,
  toggleCategoryList,
  handleCategorySelect,
}: FilteredCategoriesProps) => {
  return (
    <div className="relative z-10">
      <div
        className={`flex w-60 cursor-pointer items-center justify-between rounded-md border border-gray-500 bg-white p-2 ${
          isCategoryListOpen ? "z-10" : "z-0"
        }`}
        onClick={toggleCategoryList}
      >
        {selectedCategory}
        <BiChevronDown size={20} />
      </div>
      {isCategoryListOpen && (
        <div className="absolute left-0 mt-2 max-h-52 w-60 overflow-y-auto border border-gray-500 bg-white">
          {categoryOptions.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => handleCategorySelect(option)}
            >
              {option}
              <hr className="border-t-1 mt-2 border-dashed border-gray-500"></hr>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterByCategory;
