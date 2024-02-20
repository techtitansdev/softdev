import { clerkClient } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
 
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
 
  const user = await clerkClient.users.getUser(userId);
 
  // use the user object to decide what data to return
 
  return res.status(200).json({user});
}