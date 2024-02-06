import { useState } from "react";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";

interface ProjectCardProps {
  projectData: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projectData}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = () => {
    // Handle the delete logic here
    // You can call an API or perform any other actions
    closeModal();
  };

  return (
    <div>
      <ul>
        <li
          key={projectData.id}
          className="hover:scale-104 w-84 h-96 transform shadow-lg transition duration-500 ease-in-out hover:-translate-y-1"
        >
          <Link
            href={`/projects/${encodeURIComponent(projectData.title)}`}
          >
            <img  
              className="h-64 w-full rounded-lg"
              src={projectData.projectImage}
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
            className="ml-2 mt-2 border bg-blue-800 px-8 py-1 text-white shadow-md hover:bg-blue-600"
            onClick={openModal}
          >
            Delete
          </button>
        </li>
      </ul>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex h-screen w-screen items-center justify-center">
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                          className="h-6 w-6 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                          />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3
                          className="text-base font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          Delete Project
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this project?
                            All of the project data will be permanently removed. This
                            action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="fixed inset-0 h-full w-full cursor-default bg-gray-500 bg-opacity-75"
            onClick={closeModal}
          ></button>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
