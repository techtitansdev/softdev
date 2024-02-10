import { useState } from "react";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import DeleteModal from "~/components/DeleteModal";

interface ProjectCardProps {
  projectData: any;
  handleDelete: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectData,
  handleDelete,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <ul>
        <li
          key={projectData.id}
          className="hover:scale-104 transform pb-6 shadow-lg transition duration-500 ease-in-out hover:-translate-y-1"
        >
          <Link href={`/projects/${encodeURIComponent(projectData.title)}`}>
            <img
              className="h-64 w-[280px] rounded-sm lg:w-[300px]"
              src={projectData.image}
              alt="project-image"
            />
          </Link>

          <div className="my-2 ml-2">
            <h5 className="text-lg tracking-tight text-gray-900">
              {projectData.title}
            </h5>
            <p className="flex flex-row items-center font-normal text-gray-700 dark:text-gray-500">
              <IoLocationSharp size={15} /> {projectData.hub}
            </p>
          </div>

          <Link href={`/admin/projects/edit`}>
            <button className="ml-2 mt-2 border border-gray-500 px-8 py-1 text-gray-800 shadow-md hover:bg-gray-200">
              Edit
            </button>
          </Link>

          <button
            className="ml-2 mt-2 border bg-red-600 px-8 py-1 text-white shadow-md hover:bg-red-700"
            onClick={openModal}
          >
            Delete
          </button>
        </li>
      </ul>

      {isModalOpen && (
        <DeleteModal
          subject={projectData.title}
          handleDelete={handleDelete}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default ProjectCard;
