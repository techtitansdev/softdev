import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

type FilteredCategoriesProps = {
  selectedProject: string;
  projectOptions: string[];
  handleProjectSelect: (project: string) => void;
};

const FilterByProject = ({
  selectedProject,
  projectOptions,
  handleProjectSelect,
}: FilteredCategoriesProps) => {
  const [isProjectListOpen, setIsProjectListOpen] = useState(false);

  const toggleProjectList = () => {
    setIsProjectListOpen(!isProjectListOpen);
  };

  return (
    <div className="relative z-10">
      <div
        className={`flex w-60 cursor-pointer items-center justify-between rounded-md border border-gray-500 bg-white p-2 ${
          isProjectListOpen ? "z-10" : "z-0"
        }`}
        onClick={toggleProjectList}
      >
        {selectedProject}
        <BiChevronDown size={20} />
      </div>
      {isProjectListOpen && (
        <div className="absolute left-0 mt-2 max-h-52 w-60 overflow-y-auto border border-gray-500 bg-white">
          {projectOptions.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer p-2 hover-bg-gray-200"
              onClick={() => {
                handleProjectSelect(option);
                toggleProjectList();
              }}
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

export default FilterByProject;
