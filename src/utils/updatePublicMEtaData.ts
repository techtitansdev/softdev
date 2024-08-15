import { clerkClient } from '@clerk/nextjs/server'
import { NextApiRequest, NextApiResponse } from 'next'

export const  updatePublicMetaData = async (userId: string,role:string) => {

  try {
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        admin: role,
      },
    });
    console.log("updated metadata",)

  } catch (error) {
    console.log("failed update metadata",)
  }
}