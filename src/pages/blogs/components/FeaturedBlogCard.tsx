import Link from "next/link";
import { LuCalendarDays } from "react-icons/lu";

interface BlogData {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  featured: boolean;
  created: Date;
}

interface FeaturedBlogCardProps {
  blogData: BlogData;
}

const FeaturedBlogCard: React.FC<FeaturedBlogCardProps> = ({ blogData }) => {
  const createdDate = new Date(blogData.created).toLocaleDateString();

  return (
    <div>
      <ul>
        <li
          key={blogData.id}
          className="transform rounded-lg pb-4 shadow transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105"
        >
          <Link href={`/blogs/${encodeURIComponent(blogData.id)}`}>
            <img
              className="h-56 w-[280px] rounded-t-lg object-cover lg:h-[320px] lg:w-[420px]"
              src={blogData.image}
              alt="blog-image"
            />
          </Link>

          <div className="my-2 ml-1">
            <div className="ml-1 text-lg font-medium tracking-tight text-gray-900 lg:text-xl">
              {blogData.title}
            </div>

            <div className="my-2 ml-1 flex max-w-[82px] items-center justify-center rounded-sm bg-gray-100 text-xs font-light text-gray-700 lg:text-sm dark:text-gray-500">
              <div className="mr-1">
                <LuCalendarDays />
              </div>
              {createdDate}
            </div>

            <div
              className="mx-1 items-center text-xs font-light text-gray-700 lg:text-sm dark:text-gray-500"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {blogData.excerpt}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FeaturedBlogCard;
