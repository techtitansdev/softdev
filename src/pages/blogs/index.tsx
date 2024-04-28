import Head from "next/head";
import { useEffect, useState } from "react";
import { Navbar } from "~/components/Navbar";
import { api } from "~/utils/api";
import BlogCard from "./components/BlogCard";
import { Footer } from "~/components/Footer";
import FeaturedBlogCard from "./components/FeaturedBlogCard";


const Blogs = () => {
  const [blogData, setBlogData] = useState<any>([]);
  const getBlogs = api.blog.getAll.useQuery();

  useEffect(() => {
    if (getBlogs.data) {
      setBlogData(getBlogs.data);
    }
  }, [getBlogs.data]);

  const featuredBlogs = blogData.filter((blog: { featured: boolean, published: boolean }) => blog.featured === true  && blog.published === true);
  const unfeaturedBlogs = blogData.filter((blog: { featured: boolean, published: boolean }) => blog.featured === false && blog.published === true);

  return (
    <>
      <Head>
        <title>Blogs | Global shapers</title>
        <meta name="description" content="Generated by create-next-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <div className="flex">
        <Navbar />

        <div className="mx-auto mt-24  max-w-[280px] items-center justify-between md:mt-32 md:max-w-[570px] lg:mt-36 lg:max-w-[950px] lg:flex-row xl:max-w-[1275px]">
          <div className="mb-4 mt-1 flex items-center justify-center">
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {featuredBlogs.map((blog: any) => (
                <div key={blog.id}>
                  <FeaturedBlogCard blogData={blog} />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16 mt-1 flex items-center justify-center">
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {unfeaturedBlogs.map((blog: any) => (
                <div key={blog.id}>
                  <BlogCard blogData={blog} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Blogs;
