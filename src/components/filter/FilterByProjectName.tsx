import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { IoFilterOutline } from "react-icons/io5";
import { Donors } from "~/types/donors";
import { api } from "~/utils/api";

export type FilteredProjectProps = {
  selectedProject: string;
  isProjectListOpen: boolean;
  toggleProjectList: () => void;
  handleProjectSelect: (status: string) => void;
};

const FilterByProjectName = ({
  selectedProject,
  isProjectListOpen,
  toggleProjectList,
  handleProjectSelect,
}: FilteredProjectProps) => {
  const [data, setData] = useState<Donors[]>([]);

  const donors = api.funding.getAll.useQuery();

  useEffect(() => {
    if (donors.data) {
      const transformedData = donors.data.map((item) => ({
        name: item.name,
        email: item.email || "",
        contact: item.contact || "",
        date: new Date(item.date).toISOString(),
        projectName: item.projectName || "",
        paymentMethod: item.paymentMethod || "",
        amount: item.amount,
      }));
      setData(transformedData);
    }
  }, [donors.data]);

  const uniqueProjects = Array.from(
    new Set(data.map((item) => item.projectName)),
  ).sort((a, b) => a.localeCompare(b));

  const projectOptions = ["All", ...uniqueProjects];

  return (
    <div className="relative z-10">
      <div className="mx-1 ml-2 lg:mx-2 lg:hidden">
        <IoFilterOutline
          size={26}
          onClick={toggleProjectList}
          className="cursor-pointer"
        />
      </div>
      <div
        className={`hidden w-[250px] cursor-pointer items-center justify-between rounded-md border border-gray-500 bg-white p-2 lg:flex ${
          isProjectListOpen ? "z-10" : "z-0"
        }`}
        onClick={toggleProjectList}
      >
        {selectedProject}
        <BiChevronDown size={20} />
      </div>
      {isProjectListOpen && (
        <div className="absolute right-0 mt-7 max-h-[210px] w-[250px] overflow-y-auto rounded-lg border border-gray-500 bg-white md:right-[-8px] lg:left-0 lg:mt-2">
          {projectOptions.map((projectName, index) => (
            <div
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => {
                handleProjectSelect(projectName);
                toggleProjectList();
              }}
            >
              {projectName}
              <hr className="border-t-1 my-2 border-dashed border-gray-500"></hr>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterByProjectName;
