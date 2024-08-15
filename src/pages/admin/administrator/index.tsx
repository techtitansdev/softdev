import React, { useEffect, useState } from "react";
import { clerkClient, useUser } from "@clerk/nextjs";
import Head from "next/head";
import { Sidebar } from "~/components/Sidebar";
import Loading from "~/components/Loading";
import Unauthorized from "~/components/Unauthorized";
import { api } from "~/utils/api";
import AdminModal from "~/components/AddAdminModal";
import { Modal } from "~/components/Modal"; // Import your custom modal

const Administrators = () => {
  const { user, isLoaded } = useUser();
  const user_role = user?.publicMetadata.admin ? "ADMIN" : "USER";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [userDetails, setUserDetails] = useState(null); // State for user details
  const [userId, setUserId] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const {
    data: adminData,
    isLoading: isAdminsLoading,
    refetch,
  } = api.user.getAdmins.useQuery();

  const setRole = api.user.setRole.useMutation({
    onSuccess: () => {
      refetch();
      setIsModalOpen(false); // Close the modal after success
    },
    onError: (error) => {
      setErrorMessage(
        error.message || "An error occurred while updating the role.",
      );
    },
  });

  useEffect(() => {}, [isLoaded, user_role]);

  const handleRemoveAdmin = async (adminEmail: string) => {
    if (confirm("Are you sure you want to remove this administrator?")) {
      await updateRole(adminEmail, "user");
      setRole.mutate({ email: adminEmail, role: "user" });
    }
  };

  const handleAddAdmin = async (adminEmail: string) => {
    if (confirm("Are you sure you want to add this administrator?")) {
      await updateRole(adminEmail, "admin");
      setRole.mutate({ email: adminEmail, role: "admin" });
    }
  };

  const handleGetUserDetails = async (email: string) => {
    console.log("Fetching user details...");
    try {
      const response = await fetch("/api/getUserList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, // Use the user's ID
        }),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON from the response
      const data = await response.json();
      setUserId(data);
      // Log or use the data received
      console.log(data);

      // If you need to use the value elsewhere, you can return it
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  const updateRole = async (email: string, role: string) => {
    handleGetUserDetails(email);
    try {
      if (!user) {
        throw new Error("User not found");
      }

      const res = await fetch("/api/updateMetadataClerk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          userId: userId, // Use the user's ID
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "An error occurred");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(
          error.message || "An error occurred while updating the role.",
        );
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };
  if (!isLoaded || isAdminsLoading) {
    return <Loading />;
  }

  if (user_role !== "ADMIN") {
    return <Unauthorized />;
  }

  return (
    <>
      <Head>
        <title>Administrator | Global Shapers</title>
        <meta name="description" content="Generated by create-next-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <div className="flex">
        <Sidebar />
        <div className="mx-auto w-full max-w-[1350px] p-10">
          <div className="mt-16 border-b border-black pb-4 text-2xl font-normal text-gray-800 md:text-3xl">
            ADMINISTRATOR
          </div>
          <div className="mt-8">
            <AdminModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={() => handleAddAdmin(newAdminEmail)}
              title="Add New Administrator"
            >
              <input
                type="email"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                placeholder="Enter email to add as admin"
                className="w-full rounded border border-gray-300 p-2"
              />
            </AdminModal>

            <Modal
              isOpen={!!errorMessage} // Show modal if there's an error message
              onClose={() => setErrorMessage("")} // Hide modal on close
              message={errorMessage}
              bgColor="bg-red-500"
            />

            {adminData && adminData.length > 0 ? (
              <ul>
                {adminData.map((admin) => (
                  <li
                    key={admin.id}
                    className="flex items-center justify-between border-b border-gray-200 p-2"
                  >
                    <span>{admin.email}</span>
                    <button
                      onClick={() => handleRemoveAdmin(admin.email)}
                      className="ml-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No administrators found.</p>
            )}

            <button
              onClick={() => setIsModalOpen(true)}
              className="mb-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-700"
            >
              Add Admin
            </button>

            {userDetails && (
              <div className="mt-4 rounded bg-gray-100 p-4">
                <h3>User Details:</h3>
                {/* Render the user details here */}
                <pre>{JSON.stringify(userDetails, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Administrators;