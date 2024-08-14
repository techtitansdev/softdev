import Link from "next/link";
import { LuCalendarDays } from "react-icons/lu";
import Image from "next/image";

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
  if (!blogData?.created) {
    return null;
  }

  const createdDate = new Date(blogData.created).toLocaleDateString();

  return (
    <div>
      <ul>
        <li
          key={blogData.id}
          className="hover:scale-102 transform rounded-lg pb-4 shadow transition duration-500 ease-in-out hover:-translate-y-1"
        >
          <Link href={`/blogs/${encodeURIComponent(blogData.id)}`}>
            <Image
              className="h-56 rounded-t-lg object-cover xl:h-80"
              src={blogData.image}
              alt="blog-image"
              width={420}
              height={300}
            />
          </Link>

          <div className="my-2 ml-1">
            <div className="ml-1 text-lg font-medium tracking-tight text-gray-900 lg:text-xl">
              {blogData.title}
            </div>

            {createdDate && (
              <div className="my-2 ml-1 flex max-w-[92px] items-center justify-center rounded-sm bg-gray-100 text-xs font-light text-gray-700 lg:text-sm dark:text-gray-500">
                <div className="mr-1">
                  <LuCalendarDays />
                </div>
                {createdDate}
              </div>
            )}

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
