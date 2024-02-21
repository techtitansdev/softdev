import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Sidebar } from "~/components/Sidebar";
import { api } from "~/utils/api";

const Admin = () => {
  const { user, isLoaded } = useUser();
  const user_role = user?.publicMetadata.admin;
  const router = useRouter();
  console.log(user_role)

  useEffect(() => {
    if (isLoaded && user_role !== 'admin') {
      router.push('/home');
    }
  }, [isLoaded, user_role]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (isLoaded && user_role !== 'admin'){
    return <div>UNAUTHORIZED</div>;
  }

export const Admin = () => {
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
  function useUser(): { user: any; isLoaded: any; } {
    throw new Error("Function not implemented.");
  }

  function useEffect(arg0: () => void, arg1: any[]) {
    throw new Error("Function not implemented.");
  }

