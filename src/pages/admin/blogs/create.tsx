import Head from "next/head";
import { Editor } from "@tinymce/tinymce-react";
import { Sidebar } from "~/components/Sidebar";
import { api } from "~/utils/api";
import Image from "next/image";
import { Modal } from "~/components/Modal";
import { useRouter } from "next/router";
import { BlogData } from "~/types/blogData";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import { ChangeEvent, MutableRefObject, useRef, useState } from "react";
import { NewEditor } from "../projects/components/editor";

function CreateBlogs() {
  const createBlog = api.blog.create.useMutation();
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [editorData, setEditorData] = useState(null);
  const [blogData, setBlogData] = useState<BlogData>({
    title: "",
    excerpt: "",
    image: "",
    content: "",
    published: false,
    featured: false,
  });

  const editorRef: MutableRefObject<any> = useRef(null);
  const handleEditorChange = (data: any) => {
    // Update state with the new data from the editor
    setEditorData(data);

    
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleImageUpload = (result: CldUploadWidgetResults) => {
    console.log("result: ", result);
    const info = result.info as object;

    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;
      setImageUrl(url);
      setPublicId(public_id);
      console.log("url: ", url);
      console.log("public_id: ", public_id);
    }
  };

  const removeImage = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for removing the image
  };

  const handleSubmit = async (isPublished: boolean) => {
    try {
      const result = await createBlog.mutateAsync({
        ...blogData,
        content: JSON.stringify(editorData, null, 2),
        image: imageUrl,
        published: isPublished,
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

  return (
    <div>
      <Head>
        <title> Create Blog | Global shapers</title>
        <meta name="description" content="Generated by create-next-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <div className="flex">
        <Sidebar />

        <div className="mx-auto p-10">
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
                className="mt-1 w-full rounded-md border p-2 shadow-sm"
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
                className="mt-1 h-56 w-full rounded-md border p-2 shadow-sm"
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
                  imageUrl && "pointer-events-none"
                }`}
                onUpload={handleImageUpload}
                data-testid="blog-image-input"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>

                {imageUrl && (
                  <Image
                    src={imageUrl}
                    fill
                    sizes="72"
                    className="absolute inset-0 object-cover"
                    alt={blogData.title}
                  />
                )}
              </CldUploadButton>

              {publicId && (
                <button
                  onClick={removeImage}
                  className="mb-4 mt-2 w-fit rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
                >
                  Remove Image
                </button>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="content" className="font-medium text-gray-700">
                About
              </label>
            </div>

            <NewEditor onChanges={handleEditorChange }/>

            
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
