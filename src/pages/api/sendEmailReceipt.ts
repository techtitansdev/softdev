import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmailPayment } from "~/utils/SendEmailPayment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { to, subject, text, projectTitle, projectId, currency, amount, clientID, method } =
      req.body;

    try {
      await sendEmailPayment(
        to,
        subject,
        text,
        projectTitle,
        projectId,
        currency,
        amount,
        clientID,
        method,
      );
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error: any) {
      res.status(500).json({ error: `Failed to send email: ${error.message}` });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}