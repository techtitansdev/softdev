    import type { NextApiRequest, NextApiResponse } from 'next';
    import { getUserByEmail } from '~/utils/getUserListUtil';
    import { sendEmailMilestone } from '~/utils/sendEmail';


    export default async function handler(req: NextApiRequest, res: NextApiResponse) {
        const { email } = req.body;
        if (req.method === 'POST') {

            try {
                const userId = await getUserByEmail(email)
                res.status(200).json( userId );
            } catch (error: any) {
                res.status(500).json({ error: `Failed to send email: ${error.message}` });
            }
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    }