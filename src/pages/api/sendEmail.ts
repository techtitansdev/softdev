import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from "nodemailer";
import { sendEmail } from '~/utils/sendEmail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        const { to, subject, text } = req.body;

        try {
            await sendEmail(to, subject, text);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error: any) {
            res.status(500).json({ error: `Failed to send email: ${error.message}` });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}