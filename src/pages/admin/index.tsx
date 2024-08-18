import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "~/components/LoadingSpinner";
import Unauthorized from "~/components/Unauthorized";

export const Admin = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user?.publicMetadata.admin === "admin") {
      router.push("/admin/administrator");
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  if (user?.publicMetadata.admin !== "admin") {
    return <Unauthorized />;
  }

  return null;
};

export default Admin;
