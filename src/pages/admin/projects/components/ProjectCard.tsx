import { useState } from "react";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import DeleteModal from "~/components/DeleteModal";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { api } from "~/utils/api";

interface ProjectCardProps {
  projectData: any;
  handleDelete: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectData,
  handleDelete,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [featured, setFeatured] = useState(projectData.featured || false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const editProjectMutation = api.project.edit.useMutation();
  const featuredProjectsQueryResult = api.project.getFeaturedCount.useQuery();

  const toggleFeatured = async () => {
    const newFeaturedStatus = !featured;

    const confirmation = window.confirm(
      `Are you sure you want to ${
        newFeaturedStatus ? "feature" : "unfeature"
      } ${projectData.title}`,
    );

    if (!confirmation) {
      return;
    }

    setFeatured(newFeaturedStatus);

    try {
      if (newFeaturedStatus && featuredProjectsQueryResult.isSuccess) {
        const featuredProjectsCount = featuredProjectsQueryResult.data;
        if (featuredProjectsCount >= 4) {
          setFeatured(!newFeaturedStatus);
          alert("Maximum number of featured projects reached.");
          return;
        }
      } else if (featuredProjectsQueryResult.isError) {
        console.error(
          "Error fetching featured projects count:",
          featuredProjectsQueryResult.error,
        );
        return;
      }

      const updatedProjectData = {
        ...projectData,
        featured: newFeaturedStatus,
      };

      await editProjectMutation.mutateAsync({
        id: projectData.id,
        ...updatedProjectData,
      });

      setFeatured(newFeaturedStatus);
    } catch (error) {
      console.error("Error updating featured status:", error);
      setFeatured(!newFeaturedStatus);
    }
  };

  return (
    <div className="relative">
      <ul>
        <li key={projectData.id} className="relative rounded-lg pb-4 shadow">
          <button
            className="absolute right-2 top-2 text-yellow-500 focus:outline-none"
            onClick={toggleFeatured}
          >
            {featured ? <AiFillStar size={22} /> : <AiOutlineStar size={22} />}
          </button>

          <Link href={`/admin/projects/${encodeURIComponent(projectData.id)}`}>
            <img
              className="object-obtain h-56 w-[280px] rounded-sm lg:w-[300px]"
              src={projectData.image}
              alt={projectData.image}
            />
          </Link>

          <div className="mx-2 my-2">
            <div className="truncate text-lg font-medium tracking-tight text-gray-900">
              {projectData.title}
            </div>
            <div className="flex flex-row items-center overflow-hidden font-normal text-gray-700 dark:text-gray-500">
              <IoLocationSharp size={15} />
              {projectData.hub}
            </div>
          </div>

          <Link href={`/admin/projects/edit/${projectData.id}`}>
            <button className="ml-2 mt-2 rounded-md border border-gray-500 px-8 py-1 text-gray-800 shadow-md hover:bg-gray-200">
              Edit
            </button>
          </Link>

          <button
            className="ml-2 mt-2 rounded-md border bg-red-600 px-8 py-1 text-white shadow-md hover:bg-red-700"
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
