import { useState } from "react";
import Link from "next/link";
import DeleteModal from "~/components/DeleteModal";
import { api } from "~/utils/api";
import { Modal } from "~/components/Modal";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { LuCalendarDays } from "react-icons/lu";

interface BlogCardProps {
  blogData: any;
  handleDelete: () => void;
}

const FeaturedBlogCard: React.FC<BlogCardProps> = ({
  blogData,
  handleDelete,
}) => {
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [featured, setFeatured] = useState(blogData.featured || false);
  const [maxFeaturedReached, setMaxFeaturedReached] = useState(false);
  const blogDate = new Date(blogData.date).toLocaleDateString();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const editBlogFeaturedMutation = api.blog.editBlogFeatured.useMutation();
  const featuredBlogsQuery = api.blog.getFeaturedCount.useQuery();

  const toggleFeatured = async () => {
    const newFeaturedStatus = !featured;

    const confirmation = window.confirm(
      `Are you sure you want to ${
        newFeaturedStatus ? "feature" : "unfeature"
      } ${blogData.title}?`,
    );

    if (!confirmation) {
      return;
    }

    try {
      if (newFeaturedStatus && featuredBlogsQuery.isSuccess) {
        const featuredProjectsCount = featuredBlogsQuery.data;
        if (featuredProjectsCount >= 4) {
          setMaxFeaturedReached(true);
          setTimeout(() => setMaxFeaturedReached(false), 3000);
          return;
        }
      } else if (featuredBlogsQuery.isError) {
        console.error(
          "Error fetching featured projects count:",
          featuredBlogsQuery.error,
        );
        return;
      }

      await editBlogFeaturedMutation.mutateAsync({
        id: blogData.id,
        featured: newFeaturedStatus,
      });

      setFeatured(newFeaturedStatus);
    } catch (error) {
      console.error("Error updating featured status:", error);
      setFeatured(!newFeaturedStatus);
    }
  };

  const cardBackgroundColor = blogData.published ? "bg-gray-100" : "bg-white";

  return (
    <div className="relative">
      <ul>
        <li
          key={blogData.id}
          className={`relative rounded-lg pb-4 shadow ${cardBackgroundColor}`}
        >
          <button
            className="absolute right-2 top-2 text-yellow-500 focus:outline-none"
            onClick={toggleFeatured}
          >
            {featured ? <AiFillStar size={22} /> : <AiOutlineStar size={22} />}
          </button>

          <Link href={`/admin/blogs/${encodeURIComponent(blogData.id)}`}>
            <img
              className="h-56 w-[280px] rounded-t-lg object-cover lg:h-[300px] lg:w-[420px]"
              src={blogData.image}
              alt="blog-image"
            />
          </Link>

          <div className="my-2 ml-1">
            <div className="ml-1 max-w-[350px] overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium tracking-tight text-gray-900 lg:text-xl">
              {blogData.title}
            </div>

            <div className="my-2 ml-1 flex max-w-[92px] items-center justify-center rounded-sm bg-gray-100 text-xs font-light text-gray-700 lg:text-sm dark:text-gray-500">
              <div className="mr-1">
                <LuCalendarDays />
              </div>
              {blogDate}
            </div>

            <div
              className="mx-1 items-center text-xs font-light text-gray-700 lg:text-sm dark:text-gray-500"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
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

      <Modal
        isOpen={maxFeaturedReached}
        onClose={() => setMaxFeaturedReached(false)}
        message="Maximum number of featured blogs has been reached."
        bgColor="bg-red-500"
      />
    </div>
  );
};

export default FeaturedBlogCard;
