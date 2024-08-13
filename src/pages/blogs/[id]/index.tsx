import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Head from "next/head";
import Image from "next/image";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";

interface Blog {
  blogTitle: string;
  blogDescription: string;
  blogImage?: string;
  blogImage1?: string;
  blogImage2?: string;
  blogDescription1?: string;
  blogDescription2?: string;
}

const SpecificBlogDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: blogData, error } = api.blog.getById.useQuery({
    id: id as string,
  });

  if (error) {
    return <div>Error loading blog data: {error.message}</div>;
  }

  const blog: Blog = blogData ?? {
    blogTitle: "",
    blogDescription: "",
    blogImage: "",
    blogImage1: "",
    blogImage2: "",
    blogDescription1: "",
    blogDescription2: "",
  };

  return (
    <>
      <Head>
        <title> Blog | Global Shapers Iloilo</title>
        <meta name="description" content="Project details page" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <Navbar />

      <div className="mx-auto px-2 lg:max-w-[1200px]">
        <div className="mb-4 flex items-center px-2 pt-20 text-2xl font-medium md:pt-32 md:text-3xl lg:max-w-[980px] lg:text-4xl">
          {blog.blogTitle}
        </div>

        <div className="mb-6 flex items-center px-2 text-sm md:text-base lg:max-w-[980px]">
          {blog.blogDescription}
        </div>

        {blog.blogImage ? (
          <Image
            src={blog.blogImage}
            alt="blog-image"
            width={1200}
            height={200}
          />
        ) : (
          <div>No image available</div>
        )}

        <div className="flex flex-col-reverse items-center px-2 pt-4 lg:flex-row lg:pt-16">
          <div className="w-full flex-col items-center justify-center lg:w-1/2">
            {blog.blogImage1 ? (
              <Image
                src={blog.blogImage1}
                alt="blog-image1"
                className="mx-auto w-full"
                width={600}
                height={300}
              />
            ) : (
              <div>No image available</div>
            )}
          </div>

          <div className="mt-2 w-full rounded-md lg:w-1/2 lg:max-w-[650px] lg:pr-6 xl:ml-12 xl:px-0">
            <p className={`mb-4 text-sm sm:mb-8 sm:mt-8 md:text-lg`}>
              {blog.blogDescription1}
            </p>
          </div>
        </div>

        <div className="mb-12 flex flex-col items-center px-2 pt-4 lg:flex-row lg:pt-16">
          <div className="w-full flex-col items-center justify-center lg:w-1/2">
            <p className={`mb-4 text-sm sm:mb-8 sm:mt-8 md:text-lg`}>
              {blog.blogDescription2}
            </p>
          </div>

          <div className="mt-2 w-full rounded-md lg:w-1/2 lg:max-w-[650px] lg:pr-6 xl:ml-12 xl:px-0">
            {blog.blogImage2 ? (
              <Image
                src={blog.blogImage2}
                alt="blog-image2"
                className="mx-auto w-full"
                width={600}
                height={300}
              />
            ) : (
              <div>No image available</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SpecificBlogDetailsPage;
