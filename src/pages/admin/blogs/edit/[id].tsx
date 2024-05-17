import Head from "next/head";
import { useState, useEffect, ChangeEvent } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Sidebar } from "~/components/Sidebar";
import { api } from "~/utils/api";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import { Modal } from "~/components/Modal";
import { useRouter } from "next/router";
import { BlogData } from "~/types/blogData";
import { NewEditor } from "~/components/editor/Editor";

function EditBlog() {
  const router = useRouter();
  const { id } = router.query;
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const getBlog = api.blog.getById.useQuery({ id: id as string });
  const categories = api.categories.getAllCategories.useQuery();
  const categoriesOption = categories.data || [];
  categoriesOption.sort((a, b) => a.label.localeCompare(b.label));
  const [editorBlocks, setEditorBlocks] = useState([]);
  const [initialEditorData, setinitialEditorData] = useState();
  const deleteImage = api.blog.removeImage.useMutation();

  const [blogData, setBlogData] = useState<BlogData>({
    title: "",
    excerpt: "",
    image: "",
    content: "",
    published: false,
    featured: false,
  });

  const editBlog = api.blog.edit.useMutation({
    onSuccess: () => {
      setSuccessModalOpen(true);
      setTimeout(() => {
        router.push("/admin/blogs");
      }, 2000);
      console.log(blogData);
    },
    onError: (error: any) => {
      console.error("Edit Blog Failed", error);
    },
  });

  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content: any) => {
    setEditorContent(content);
  };

  useEffect(() => {
    setEditorContent(blogData.content);
  }, [blogData.content]);

  useEffect(() => {
    if (getBlog.data) {
      setBlogData((prevData) => ({
        ...prevData,
        about: getBlog.data.content || "",
      }));

      const initialEditorData = JSON.parse(
        getBlog.data.content || '{"blocks":[]}',
      );
      setinitialEditorData(initialEditorData);
      setEditorBlocks(initialEditorData.blocks);
    }
  }, [getBlog.data]);


  useEffect(() => {
    if (getBlog.data) {
      setBlogData((prevData) => {
        if (
          prevData.title !== getBlog.data.title ||
          prevData.excerpt !== getBlog.data.excerpt ||
          prevData.image !== getBlog.data.image ||
          prevData.content !== getBlog.data.content ||
          prevData.published !== getBlog.data.published ||
          prevData.featured !== getBlog.data.featured
        ) {
          return {
            title: getBlog.data.title,
            excerpt: getBlog.data.excerpt,
            image: getBlog.data.image,
            content: getBlog.data.content,
            published: getBlog.data.published,
            featured: getBlog.data.featured,
          };
        } else {
          return prevData;
        }
      });
      setImageUrl(getBlog.data.image);
      const initialEditorData = JSON.parse(getBlog.data.content);
      setinitialEditorData(initialEditorData)
      setEditorBlocks(initialEditorData.blocks)
    }
  }, [getBlog.data]);

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
      blogData.image = url;
      console.log("url: ", url);
      console.log("public_id: ", public_id);
    }
  };

  const removeImage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      deleteImage.mutate({
        id: id as string,
      });
      setImageUrl("");
      setBlogData({
        ...blogData,
        image: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (isPublished: boolean) => {
    const data = {
      ...blogData,
      id: id as string,
      image: imageUrl,
      cotent: JSON.stringify(editorData || initialEditorData || [], null, 2),
      published: isPublished,
      featured: false,
    };

    try {
      const editedBlog = await editBlog.mutateAsync(data);

      setBlogData(editedBlog);
      setSuccessModalOpen(true);
      setTimeout(() => {
        router.push("/admin/blogs");
      }, 2000);
    } catch (error) {
      console.error("Edit Project Failed", error);
    }
  };

  const [editorData, setEditorData] = useState(null);

  const handleChanges = (data: any) => {
    setEditorData(data);

    setBlogData({
      ...blogData,
      content: JSON.stringify(data, null, 2),
    });
  };

  return (
    <>
      <div>
        <Head>
          <title>Edit Blog | Global shapers</title>
          <meta name="description" content="Generated by create-next-app" />
          <link rel="icon" href="/gsi-logo.png" />
        </Head>

        <div className="flex">
          <Sidebar />

          <div className="mx-auto p-10">
            <div className="mb-10 mt-16 border-b-2 border-black pb-4 text-2xl font-medium text-gray-800 md:text-3xl">
              EDIT BLOG
            </div>

            <form onSubmit={() => handleSubmit(false)}>
              <div className="mb-4">
                <label htmlFor="title" className="font-medium text-gray-700">
                  Blog Title
                </label>

                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="title"
                  value={blogData.title}
                  className="mt-1 w-full rounded-md border p-2 shadow-sm"
                  required
                  onChange={handleChange}
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
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
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

                {imageUrl && (
                  <button
                    onClick={removeImage}
                    className="mb-4 mt-2 w-fit rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
                  >
                    Remove Image
                  </button>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="about" className="font-medium text-gray-700">
                  About
                </label>
              </div>

              <div className="min-w-[300px]">
                <NewEditor
                  onChanges={handleChanges}
                  initialData={editorBlocks}
                />
              </div>

              <button
                type="button"
                className="mr-2 mt-4 rounded-lg bg-gray-600 px-2 py-2 font-medium text-white hover:bg-gray-800 md:mr-4 md:px-6"
                onClick={() => {
                  handleSubmit(false); // Pass false for "Save as Draft"
                }}
              >
                Save as Draft
              </button>

              <button
                type="button"
                className="mt-4 rounded-lg bg-blue-800 px-4 py-2 font-medium text-white hover:bg-blue-900 md:px-12"
                onClick={() => {
                  handleSubmit(true); // Pass true for "Publish"
                }}
              >
                Publish
              </button>

            </form>
          </div>
        </div>

        <Modal
          isOpen={isSuccessModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          message="Blog Edited Successfully."
          bgColor="bg-green-700"
        />
      </div>
    </>
  );
}

export default EditBlog;
