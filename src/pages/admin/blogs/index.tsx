import Head from "next/head";
import { Sidebar } from "~/components/Sidebar";

const AdminBlog = () => {
  return (
    <>
      <Head>
        <title>Blogs | Global shapers</title>
        <meta name="description" content="Generated by create-next-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <div className="flex">
        <Sidebar />

        <div className="mx-auto mt-72 text-5xl"> Blogs </div>
      </div>
    </>
  );
};

export default AdminBlog;