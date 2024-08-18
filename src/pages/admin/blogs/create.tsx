import Head from "next/head";
import { Sidebar } from "~/components/Sidebar";
import { api } from "~/utils/api";
import Image from "next/image";
import { Modal } from "~/components/Modal";
import { useRouter } from "next/router";
import { BlogData } from "~/types/blogData";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import { ChangeEvent, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Unauthorized from "~/components/Unauthorized";
import UploadIcon from "~/components/svg/UploadIcon";
import LoadingSpinner from "~/components/LoadingSpinner";

function CreateBlogs() {
  const createBlog = api.blog.create.useMutation();
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const router = useRouter();

  const [blogData, setBlogData] = useState<BlogData>({
    title: "",
    excerpt: "",
    image: "",
    imageId: "",
    blogTitle: "",
    blogDescription: "",
    blogImage: "",
    blogImageId: "",
    blogDescription1: "",
    blogImage1: "",
    blogImage1Id: "",
    blogDescription2: "",
    blogImage2: "",
    blogImage2Id: "",
    published: false,
    featured: false,
  });

  const [featuredImage, setFeaturedImage] = useState("");
  const [featuredImagePublicId, setFeaturedImagePublicId] = useState("");

  const [blogImage, setBlogImage] = useState("");
  const [blogPublicId, setBlogPublicId] = useState("");

  const [blogImage1, setBlogImage1] = useState("");
  const [blogPublicId1, setBlogPublicId1] = useState("");

  const [blogImage2, setBlogImage2] = useState("");
  const [blogPublicId2, setBlogPublicId2] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleImageUpload = (result: CldUploadWidgetResults, type: string) => {
    console.log("result: ", result);
    const info = result.info as object;

    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;

      switch (type) {
        case "featured":
          setFeaturedImage(url);
          setFeaturedImagePublicId(public_id);
          break;
        case "image":
          setBlogImage(url);
          setBlogPublicId(public_id);
          break;
        case "image1":
          setBlogImage1(url);
          setBlogPublicId1(public_id);
          break;
        case "image2":
          setBlogImage2(url);
          setBlogPublicId2(public_id);
          break;
        default:
          break;
      }
      console.log("url: ", url);
      console.log("public_id: ", public_id);
    }
  };

  const removeImage = async (
    e: React.MouseEvent<HTMLButtonElement>,
    imageType: string,
    publicId: string,
  ) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/deleteImage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      if (response.ok) {
        switch (imageType) {
          case "featured":
            setFeaturedImage("");
            setFeaturedImagePublicId("");
            break;
          case "image":
            setBlogImage("");
            setBlogPublicId("");
            break;
          case "image1":
            setBlogImage1("");
            setBlogPublicId1("");
            break;
          case "image2":
            setBlogImage2("");
            setBlogPublicId2("");
            break;

          default:
            console.error("Unknown image type");
        }
      } else {
        const errorData = await response.json();
        console.error("Error removing image:", errorData.error);
      }
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  const handleSubmit = async (isPublished: boolean) => {
    try {
      const result = await createBlog.mutateAsync({
        ...blogData,
        image: featuredImage,
        blogImage: blogImage,
        blogImage1: blogImage1,
        blogImage2: blogImage2,
        published: isPublished,
        imageId: featuredImagePublicId,
        blogImageId: blogPublicId,
        blogImage1Id: blogPublicId1,
        blogImage2Id: blogPublicId2,
      });
      setSuccessModalOpen(true);

      setTimeout(() => {
        router.push("/admin/blogs");
      }, 2000);
      console.log("Blog created:", result);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const { user, isLoaded } = useUser();
  const user_role = user?.publicMetadata.admin;

  useEffect(() => {}, [isLoaded, user_role]);
  if (!isLoaded) {
    return <LoadingSpinner />;
  }
  if (user_role !== "admin") {
    return <Unauthorized />;
  }

  return (
    <div>
      <Head>
        <title> Create Blog | Global shapers</title>
        <meta name="description" content="Generated by create-next-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <div className="flex">
        <Sidebar />

        <div className="mx-auto p-10 md:min-w-[700px] lg:min-w-[900px] xl:min-w-[1250px]">
          <div className="mb-10 mt-16 border-b-2 border-black pb-4 text-2xl font-medium text-gray-800 md:text-3xl">
            CREATE BLOG
          </div>

          <form>
            <div className="mb-4">
              <label htmlFor="title" className="font-medium text-gray-700">
                Blog Title
              </label>

              <input
                type="text"
                id="title"
                name="title"
                value={blogData.title}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-400 p-2 outline-gray-400"
                required
                data-testid="blog-title-input"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="excerpt" className="font-medium text-gray-700">
                Blog Description
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={blogData.excerpt}
                onChange={handleChange}
                className="mt-1 h-56 w-full rounded-md border border-gray-400 p-2 outline-gray-400"
                required
                data-testid="blog-description-input"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="font-medium text-gray-700">
                Featured Image
              </label>

              <CldUploadButton
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                className={`relative mt-4 grid h-72 w-72 place-items-center rounded-md border-2 border-dotted bg-slate-100 object-cover ${
                  featuredImage && "pointer-events-none"
                }`}
                onUpload={(result) => handleImageUpload(result, "featured")}
                data-testid="blog-image-input"
              >
                <UploadIcon />

                {featuredImage && (
                  <Image
                    src={featuredImage}
                    fill
                    sizes="72"
                    className="absolute inset-0 object-cover"
                    alt={blogData.title}
                  />
                )}
              </CldUploadButton>

              {featuredImagePublicId && (
                <button
                  onClick={(e) =>
                    removeImage(e, "featured", featuredImagePublicId)
                  }
                  className="mb-4 mt-2 w-fit rounded-md bg-red-600 px-2 py-1 font-bold text-white hover:bg-red-700"
                >
                  Remove Image
                </button>
              )}
            </div>

            <div className="mb-2 mt-12 text-xl"> Blog Design</div>

            <div>
              <textarea
                placeholder="Blog Title"
                id="blogTitle"
                name="blogTitle"
                maxLength={500}
                value={blogData.blogTitle}
                onChange={handleChange}
                className="text-bold mb-1 mt-1 h-20 w-[900px] rounded-md border border-gray-400 p-2 text-2xl font-medium outline-gray-400"
                required
              />
            </div>

            <div>
              <textarea
                placeholder="Small Description"
                id="blogDescription"
                name="blogDescription"
                maxLength={1000}
                value={blogData.blogDescription}
                onChange={handleChange}
                className="text-bold mb-1 mt-1 h-24 w-[900px] rounded-md border border-gray-400 p-2 font-medium outline-gray-400"
                required
              />
            </div>

            <CldUploadButton
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              className={`relative mt-4 grid h-[550px] w-[1180px] place-items-center justify-center rounded-md border-2 border-dotted bg-slate-100 object-cover ${
                blogImage && "pointer-events-none"
              }`}
              onUpload={(result) => handleImageUpload(result, "image")}
            >
              <UploadIcon />
              {blogImage && (
                <Image
                  src={blogImage}
                  fill
                  sizes="72"
                  className="absolute inset-0 object-cover"
                  alt={blogData.title}
                />
              )}
            </CldUploadButton>

            {blogPublicId && (
              <button
                onClick={(e) => removeImage(e, "image", blogPublicId)}
                className="mb-4 mt-2 w-fit rounded-md bg-red-600 px-2 py-1 font-bold text-white hover:bg-red-700"
              >
                Remove Image
              </button>
            )}

            <div className="mt-12 flex items-center justify-between">
              <div>
                <CldUploadButton
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
                  className={`relative grid h-[320px] w-[550px] place-items-center rounded-md border-2 border-dotted bg-slate-100 object-cover ${
                    blogImage1 && "pointer-events-none"
                  }`}
                  onUpload={(result) => handleImageUpload(result, "image1")}
                >
                  <UploadIcon />
                  {blogImage1 && (
                    <Image
                      src={blogImage1}
                      fill
                      sizes="72"
                      className="absolute inset-0 object-cover"
                      alt={blogData.blogTitle}
                    />
                  )}
                </CldUploadButton>

                {blogPublicId1 && (
                  <button
                    onClick={(e) => removeImage(e, "image1", blogPublicId1)}
                    className=" mt-1 w-fit rounded-md bg-red-600 px-2 py-1 font-bold text-white hover:bg-red-700"
                  >
                    Remove Image
                  </button>
                )}
              </div>
              <textarea
                id="blogDescription1"
                name="blogDescription1"
                placeholder="Blog Info"
                value={blogData.blogDescription1}
                maxLength={1000}
                onChange={handleChange}
                className="ml-12 mt-1 h-[320px] w-[550px] rounded-md border border-gray-400 p-2 text-base outline-gray-400"
                required
              />
            </div>

            <div className="mt-12 flex items-center justify-between">
              <textarea
                id="blogDescription2"
                name="blogDescription2"
                placeholder="Blog Info"
                value={blogData.blogDescription2}
                maxLength={1000}
                onChange={handleChange}
                className="mt-1 h-[320px] w-[550px] rounded-md border border-gray-400 p-2 text-base outline-gray-400"
                required
              />

              <div>
                <CldUploadButton
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
                  className={`relative ml-12 grid h-[320px] w-[550px] place-items-center rounded-md border-2 border-dotted bg-slate-100 object-cover ${
                    blogImage2 && "pointer-events-none"
                  }`}
                  onUpload={(result) => handleImageUpload(result, "image2")}
                >
                  <UploadIcon />
                  {blogImage2 && (
                    <Image
                      src={blogImage2}
                      fill
                      sizes="72"
                      className="absolute inset-0 object-cover"
                      alt={blogData.blogTitle}
                    />
                  )}
                </CldUploadButton>

                {blogPublicId2 && (
                  <button
                    onClick={(e) => removeImage(e, "image2", blogPublicId2)}
                    className=" mt-1 w-fit rounded-md bg-red-600 px-2 py-1 font-bold text-white hover:bg-red-700"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSubmit(false)} // Save as Draft
              className="mr-2 mt-4 rounded-lg bg-gray-600 px-2 py-2 font-medium text-white hover:bg-gray-800 md:mr-4 md:px-6"
            >
              Save as Draft
            </button>

            <button
              type="button"
              onClick={() => handleSubmit(true)} // Publish
              className="mt-4 rounded-lg bg-blue-800 px-4 py-2 font-medium text-white hover:bg-blue-900 md:px-12"
            >
              Publish
            </button>
          </form>
        </div>

        <Modal
          isOpen={isSuccessModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          message="Blog Created Successfully."
          bgColor="bg-green-700"
        />
      </div>
    </div>
  );
}

export default CreateBlogs;
