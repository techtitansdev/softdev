import Head from "next/head";
import React from "react";
import { Sidebar } from "~/components/Sidebar";

const Admin = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Global shapers</title>
        <meta name="description" content="Generated by create-next-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <div className="flex">
        <Sidebar />

        <div className="mx-auto mt-72 text-5xl"> Dashboard </div>
      </div>
    </>
  );
};

export default Admin;