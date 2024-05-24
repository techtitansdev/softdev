import { NextApiRequest, NextApiResponse } from 'next';
import { deleteImageFromCloudinary } from "../../utils/cloudinary";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { publicId } = req.body;

        try {
            await deleteImageFromCloudinary(publicId);
            res.status(200).json({ message: 'Image deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete image' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}