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

interface BlogCardProps {
  blogData: BlogData;
}

const BlogCard: React.FC<BlogCardProps> = ({ blogData }) => {
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
              className="h-56 rounded-t-lg object-cover"
              src={blogData.image}
              alt="Blog Image"
              width={300}
              height={224}
            />
          </Link>

          <div className="my-2 ml-1">
            <div className="ml-1 max-w-[280px] overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium tracking-tight text-gray-900">
              {blogData.title}
            </div>

            {createdDate && (
              <div className="my-1 flex max-w-[82px] items-center justify-center rounded-sm bg-gray-100 text-xs font-light text-gray-700 dark:text-gray-500">
                <div className="mr-1">
                  <LuCalendarDays />
                </div>
                {createdDate}
              </div>
            )}

            <div className="mx-1 max-w-[330px] items-center truncate text-xs font-light text-gray-700 dark:text-gray-500">
              {blogData.excerpt}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default BlogCard;
