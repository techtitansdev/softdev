import { useState } from "react";
import Link from "next/link";
import DeleteModal from "~/components/DeleteModal";

interface BlogCardProps {
  blogData: any;
  handleDelete: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blogData, handleDelete }) => {
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
          key={blogData.id}
          className="transform rounded-lg pb-4 shadow transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105"
        >
          <Link href={`/admin/projects/${encodeURIComponent(blogData.id)}`}>
            <img
              className="object-obtain h-56 w-[280px] rounded-sm lg:w-[300px]"
              src={blogData.image}
              alt={blogData.image}
            />
          </Link>

          <div className="mx-2 my-2">
            <div className="truncate text-lg font-medium tracking-tight text-gray-900">
              {blogData.title}
            </div>

            <div className="max-w-[330px] items-center truncate text-xs font-light text-gray-700 dark:text-gray-500">
              {blogData.excerpt}
            </div>
          </div>

          <Link href={`/admin/blogs/edit/${blogData.id}`}>
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
          subject={blogData.title}
          handleDelete={handleDelete}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default BlogCard;
