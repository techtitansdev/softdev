import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import LoadingSpinner from "~/components/LoadingSpinner";
import Unauthorized from "~/components/Unauthorized";

export const Admin = () => {
  const { user, isLoaded } = useUser();
  const user_role = user?.publicMetadata.admin;

  useEffect(() => {}, [isLoaded, user_role]);
  if (!isLoaded) {
    return <LoadingSpinner />;
  }
  if (user_role !== "admin") {
    return <Unauthorized />;
  }

  const router = useRouter();

  useEffect(() => {
    const redirect = async () => {
      await router.replace("/admin/administrator",);
    };

    redirect();
  }, [router]);

  return null;
};

export default Admin;
