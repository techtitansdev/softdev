import Head from "next/head";
import {
  ChangeEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { Sidebar } from "~/components/Sidebar";
import { api } from "~/utils/api";
import Select from "react-select";
import { ProjectData } from "~/types/projectData";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import { Modal } from "~/components/Modal";
import { useRouter } from "next/router";
import CreatableSelect from "react-select/creatable";

import { categoriesOption } from "~/data/categories";
import { NewEditor } from "~/components/editor/Editor";
import { useUser } from "@clerk/nextjs";
import Loading from "~/components/Loading";
import Unauthorized from "~/components/Unauthorized";

interface Category {
  label: string;
  value: string;
}

function CreateProjects() {
  const createProject = api.project.create.useMutation();
  const allcategory = api.categories.getAllCategories.useQuery();
  const createCategory = api.categories.create.useMutation();
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [editorData, setEditorData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [newcategory, setNewCategory] = useState<Category[]>([]);
  const editorRef: MutableRefObject<any> = useRef(null);
  const router = useRouter();

  const [projectData, setProjectData] = useState<ProjectData>({
    title: "",
    description: "",
    image: "",
    hub: "",
    category: "",
    type: "",
    beneficiaries: "",
    about: "",
    published: false,
    featured: false,
  });

  const addNewCategory = (input: string) => {
    const newCategories = input.split(",").map((category) => category.trim());

    newCategories.forEach((newCategory) => {
      // Check if the input already exists in categoriesOption
      const existsInCategoriesOption = categoriesOption.some(
        (category) =>
          category.value.toLowerCase() === newCategory.toLowerCase(),
      );

      // Check if the input already exists in newcategory
      const existsInNewCategory = newcategory.some(
        (category) =>
          category.value.toLowerCase() === newCategory.toLowerCase(),
      );

      // If the input is not in categoriesOption and not already in newcategory, add it to newcategory
      if (
        !existsInCategoriesOption &&
        !existsInNewCategory &&
        newCategory.trim() !== ""
      ) {
        setNewCategory((prevNewCategory) => [
          ...prevNewCategory,
          { label: newCategory, value: newCategory },
        ]);
      }
    });
  };

  const type = [
    { label: "Activity", value: "Activity" },
    { label: "Project", value: "Project" },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
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
    try {
      const response = await fetch('/api/deleteImage', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId }),
      });
  
      if (response.ok) {
        setImageUrl('');
        setPublicId('');
      } else {
        const errorData = await response.json();
        console.error('Error removing image:', errorData.error);
      }
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };

  const handleSubmit = async (isPublished: boolean) => {
    try {
      if (newcategory.length > 0) {
        await Promise.all(
          newcategory.map(async (category) => {
            await createCategory.mutateAsync({
              label: category.label,
              value: category.value,
            });
          }),
        );
      }
      const result = await createProject.mutateAsync({
        ...projectData,
        about: JSON.stringify(editorData, null, 2),
        image: imageUrl,
        published: isPublished,
        featured: false,
      });

      setSuccessModalOpen(true);

      setTimeout(() => {
        router.push("/admin/projects");
      }, 2000);
      console.log("Project created:", result);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleChanges = (data: any) => {
    // Update state with the new data from the editor
    setEditorData(data);
  };

  const { user, isLoaded } = useUser();
  const user_role = user?.publicMetadata.admin;

  useEffect(() => {}, [isLoaded, user_role]);
  if (!isLoaded) {
    return <Loading />;
  }
  if (user_role !== "admin") {
    return <Unauthorized />;
  }

  return (
    <div>
      <Head>
        <title>Create Project | Global shapers</title>
        <meta name="description" content="Generated by create-next-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <div className="flex">
        <Sidebar />

        <div className="mx-auto p-10">
          <div className="mb-10 mt-16 border-b-2 border-black pb-4 text-2xl font-medium text-gray-800 md:text-3xl">
            CREATE PROJECT
          </div>

          <form>
            <div className="mb-4">
              <label htmlFor="title" className="font-medium text-gray-700">
                Project Title
              </label>

              <input
                type="text"
                id="title"
                name="title"
                value={projectData.title}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border p-2 shadow-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="font-medium text-gray-700"
              >
                Project Description
              </label>
              <textarea
                id="description"
                name="description"
                value={projectData.description}
                onChange={handleChange}
                className="mt-1 h-56 w-full rounded-md border p-2 shadow-sm"
                required
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
                    alt={projectData.title}
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
              <label htmlFor="hub" className="block font-medium text-gray-700">
                Hub
              </label>

              <input
                type="text"
                id="hub"
                name="hub"
                value={projectData.hub}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border p-2 shadow-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="categories"
                className="font-medium text-gray-700"
                data-testid="category-select"
              >
                Categories
              </label>

              <CreatableSelect
                options={allcategory.data}
                placeholder="select option"
                isMulti
                value={categoriesOption.find(
                  (option) => option.value === projectData.category,
                )}
                onChange={(selectedOption) => {
                  const selectedValues = selectedOption
                    ? selectedOption.map((option) => option.value)
                    : [];
                  setProjectData({
                    ...projectData,
                    category: selectedValues.join(","),
                  });
                  addNewCategory(selectedValues.join(","));
                }}
                className="z-20"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="type" className="font-medium text-gray-700">
                Type
              </label>

              <Select
                options={type}
                value={type.find((option) => option.value === projectData.type)}
                onChange={(selectedOption) => {
                  setProjectData({
                    ...projectData,
                    type: selectedOption ? selectedOption.value : "",
                  });
                }}
                className="z-10"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="beneficiaries"
                className="font-medium text-gray-700"
              >
                Beneficiaries
              </label>

              <input
                type="text"
                id="beneficiaries"
                name="beneficiaries"
                value={projectData.beneficiaries}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border p-2 shadow-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="about" className="font-medium text-gray-700">
                About
              </label>
            </div>
            <div className="min-w-[300px]">
              <NewEditor onChanges={handleChanges} />
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
          message="Project Created Successfully."
          bgColor="bg-green-700"
        />
      </div>
    </div>
  );
}

export default CreateProjects;
