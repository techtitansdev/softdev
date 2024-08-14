import nodemailer from "nodemailer";

export const sendEmailPayment = async (
  receivers: string,
  subject: string,
  text: string,
  projectTitle: string,
  projectId: string,
  currency: string,
  amount: number,
  clientID: string,
  method: string,
) => {
  const email = process.env.EMAIL_USER || "";
  const password = process.env.EMAIL_PASS || "";
  const baseUrl = process.env.NEXTAUTH_URL || "";

  if (!email || !password || !baseUrl) {
    throw new Error("Missing required environment variables.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  });

  const mailOptions = {
    from: {
      name: "Global Shapers Iloilo",
      address: email,
    },
    bcc: receivers,
    subject: subject,
    text: text,
    html: `   
       <div style="padding: 1.5rem;">
        <h1 style="color: #000000;">${projectTitle} Donation Receipt </h1>
       <p style='color: #000000;'>Thank you for your generous donation of <strong>${currency} ${amount}</strong> to ${projectTitle}</p>
       <p style='color: #000000;'>Reference Number: <strong> ${clientID}</p>
       <p style='color: #000000;'>Payment Method: <strong> ${method}</p>
       <p style='color: #000000;'>You can view the updated details and track the progress of the project by clicking the link below:</p>
       <p><a href="${baseUrl}/funded-projects/${projectId}" style="color: #007bff; text-decoration: none;">View Project ${projectTitle}</a></p>
       </div>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
