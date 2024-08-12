import React, { useState } from "react";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import DeleteModal from "~/components/DeleteModal";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { api } from "~/utils/api";
import { Modal } from "~/components/Modal";

interface ProjectCardProps {
  projectData: any;
  handleDelete: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectData,
  handleDelete,
}) => {
  if (
    !projectData ||
    !projectData.id ||
    !projectData.title ||
    !projectData.image ||
    !projectData.hub
  ) {
    return null;
  }

  const [isModalOpen, setModalOpen] = useState(false);
  const [featured, setFeatured] = useState(projectData.featured || false);
  const [maxFeaturedReached, setMaxFeaturedReached] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const editProjectFeaturedMutation =
    api.project.editProjectFeatured.useMutation();
  const featuredProjectsQuery = api.project.getFeaturedCount.useQuery();

  const toggleFeatured = async () => {
    const newFeaturedStatus = !featured;

    const confirmation = window.confirm(
      `Are you sure you want to ${
        newFeaturedStatus ? "feature" : "unfeature"
      } ${projectData.title}?`,
    );

    if (!confirmation) {
      return;
    }

    try {
      if (newFeaturedStatus && featuredProjectsQuery.isSuccess) {
        const featuredProjectsCount = featuredProjectsQuery.data;
        if (featuredProjectsCount >= 4) {
          setMaxFeaturedReached(true);
          setTimeout(() => setMaxFeaturedReached(false), 3000);
          return;
        }
      } else if (featuredProjectsQuery.isError) {
        console.error(
          "Error fetching featured projects count:",
          featuredProjectsQuery.error,
        );
        return;
      }

      await editProjectFeaturedMutation.mutateAsync({
        id: projectData.id,
        featured: newFeaturedStatus,
      });

      setFeatured(newFeaturedStatus);
    } catch (error) {
      console.error("Error updating featured status:", error);
      setFeatured(!newFeaturedStatus);
    }
  };

  const cardBackgroundColor = projectData.published
    ? "bg-gray-100"
    : "bg-white";

  return (
    <div className="relative">
      <ul>
        <li
          key={projectData.id}
          className={`relative rounded-lg pb-4 shadow ${cardBackgroundColor}`}
        >
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
              alt={projectData.title}
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

      <Modal
        isOpen={maxFeaturedReached}
        onClose={() => setMaxFeaturedReached(false)}
        message="Maximum number of featured projects has been reached."
        bgColor="bg-red-500"
      />
    </div>
  );
};

export default ProjectCard;
