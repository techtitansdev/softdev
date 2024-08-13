import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Head from "next/head";
import Loading from "~/components/Loading";
import Unauthorized from "~/components/Unauthorized";
import { useUser } from "@clerk/nextjs";
import { Sidebar } from "~/components/Sidebar";
import Image from "next/image";

const BlogDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: blogData,
    isLoading,
    error,
  } = api.blog.getById.useQuery({ id: id as string });

  const { user, isLoaded } = useUser();
  const user_role = user?.publicMetadata.admin;

  if (!isLoaded || isLoading) {
    return <Loading />;
  }
  if (user_role !== "admin") {
    return <Unauthorized />;
  }
  if (error) {
    return <div>Error loading project data: {error.message}</div>;
  }

  const blog = blogData;

  return (
    <div className="flex">
      <Head>
        <title> Blog | Global Shapers Iloilo</title>
        <meta name="description" content="Project details page" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <Sidebar />

      <div className="mx-auto px-2 lg:max-w-[1200px]">
        <div className="mb-4 flex items-center px-2 pt-20 text-2xl font-medium md:pt-20 md:text-3xl lg:max-w-[980px] lg:text-4xl">
          {blog.blogTitle}
        </div>

        <div className="mb-6 flex items-center  px-2 text-sm md:text-base lg:max-w-[980px]">
          {blog.blogDescription}
        </div>

        <Image
          src={blog.blogImage}
          alt="blog-image"
          width={1200}
          height={200}
        />

        <div className="flex flex-col-reverse items-center px-2 pt-4 lg:flex-row lg:pt-16">
          <div className="w-full flex-col items-center justify-center lg:w-1/2">
            <Image
              src={blog.blogImage1}
              alt="blog-image1"
              className="mx-auto w-full"
              width={600}
              height={300}
            />
          </div>

          <div className="mt-2 w-full rounded-md  lg:w-1/2 lg:max-w-[650px] lg:pr-6 xl:ml-12 xl:px-0">
            <p className={` mb-4 text-sm sm:mb-8 sm:mt-8 md:text-lg`}>
              {blog.blogDescription1}
            </p>
          </div>
        </div>

        <div className="mb-12 flex flex-col items-center px-2 pt-4 lg:flex-row lg:pt-16">
          <div className="w-full flex-col items-center justify-center lg:w-1/2">
            <p className={` mb-4 text-sm sm:mb-8 sm:mt-8 md:text-lg`}>
              {blog.blogDescription2}
            </p>
          </div>

          <div className="mt-2 w-full rounded-md  lg:w-1/2 lg:max-w-[650px] lg:pr-6 xl:ml-12 xl:px-0">
            <Image
              src={blog.blogImage2}
              alt="blog-image2"
              className="mx-auto w-full"
              width={600}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
