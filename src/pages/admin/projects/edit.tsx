import Head from "next/head";
import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Sidebar } from "~/components/Sidebar";
import Select from "react-select";
import { useRouter } from "next/router";

function EditProjects() {
  const router = useRouter();
  const { projectId } = router.query;

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    image: "",
    hub: "",
    category: "",
    type: "",
    beneficiaries: "",
    about: "",
  });

  const categoriesOption = [
    { label: "Education", value: "Education" },
    { label: "Civic Participation", value: "Civic Participation" },
    { label: "Entrepreneurship", value: "Entrepreneurship" },
  ];

  const type = [
    { label: "Project", value: "Project" },
    { label: "Activity", value: "Activity" },
  ];

  useEffect(() => {
    // Fetch project data based on projectId and update the state
  }, [projectId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Updated Form data:", projectData);
  };

  return (
    <div>
      <Head>
        <title>Edit Project | Global shapers</title>
        <meta name="description" content="Generated by create-next-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">
          <div className="mt-10 text-4xl font-normal text-gray-800">
            Edit Project
          </div>

          <hr className="dark-bg-gray-800 my-4 h-px border-0 bg-gray-800"></hr>

          <form onSubmit={handleSubmit}>
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

              <input
                type="text"
                id="description"
                name="description"
                value={projectData.description}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border p-2 shadow-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="font-medium text-gray-700">
                Featured Image
              </label>

              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="w-full bg-white py-1 shadow"
                required
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
              <label htmlFor="categories" className="font-medium text-gray-700">
                Categories
              </label>

              <Select
                options={categoriesOption}
                value={
                  categoriesOption.find(
                    (option) => option.value === projectData.category,
                  ) || null
                }
                onChange={(selectedOption) => {
                  setProjectData({
                    ...projectData,
                    category: selectedOption ? selectedOption.value : "",
                  });
                }}
                className="z-20"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="categories" className="font-medium text-gray-700">
                Type
              </label>

              <Select
                options={type}
                value={
                  type.find((option) => option.value === projectData.type) ||
                  null
                }
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
              <label htmlFor="about" className="font-medium text-gray-700">
                About
              </label>
            </div>

            <Editor
              apiKey="fzxkrfx87iwnxv1apdgkca9xsai3dyq8iipq78om26tuyb1f"
              init={{
                width: "100%",
                height: 600,
                plugins: [
                  "advlist",
                  "link",
                  "image",
                  "lists",
                  "preview",
                  "pagebreak",
                  "wordcount",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "emoticons",
                  "image code",
                ],
                toolbar:
                  "undo redo |fontfamily fontsize | bold italic underline | alignleft aligncenter alignright alignjustify |" +
                  "bullist numlist outdent indent | link image | preview media fullscreen | " +
                  "forecolor backcolor emoticons",

                menubar: "file edit insert view  format table tools",
                content_style:
                  "body{font-family:Helvetica,Arial,sans-serif; font-size:16px}",
                images_upload_url: "http://localhost:8000/server.php",
              }}
            />

            <button
              type="submit"
              className="mt-4 rounded-lg bg-blue-800 px-4 py-2 font-medium text-white"
            >
              PUBLISH
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProjects;
