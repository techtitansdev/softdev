import { clerkClient } from "@clerk/nextjs/server";

export const  getUserByEmail = async (email: string) => {
  try {
    const userList = await clerkClient.users.getUserList({
      emailAddress: [email],
    });

    if (userList.length > 0) {
      return userList[0]?.id;
     // Return the first user that matches the email
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error('Error fetching user by detail:', error);
    return null;
  }
};