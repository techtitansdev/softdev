import { clerkClient } from '@clerk/nextjs/server'
import { NextApiRequest, NextApiResponse } from 'next'
import { updatePublicMetaData } from '~/utils/updatePublicMEtaData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const { role, userId } = req.body;

  try {
    await updatePublicMetaData(userId, role);
    console.log("updated metadata",)
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
    console.log("failed update metadata",)
  }
}