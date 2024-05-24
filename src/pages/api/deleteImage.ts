import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteImageFromCloudinary } from '~/utils/cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { publicId } = req.body;

        try {
            await deleteImageFromCloudinary(publicId);
            res.status(200).json({ message: 'Image deleted successfully' });
        } catch (error: any) {
            res.status(500).json({ error: `Failed to delete image: ${error.message}` });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
