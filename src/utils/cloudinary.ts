import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteImageFromCloudinary = async (publicId: string) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error: any) {
        throw new Error(`Failed to delete image: ${error.message}`);
    }
};
