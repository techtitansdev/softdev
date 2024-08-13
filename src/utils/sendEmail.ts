import nodemailer from "nodemailer";

export const sendEmail = async (receivers:string,subject:string,text:string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "ferjendavetorred@gmail.com,asanesko15@gmail.com",
        subject: "Milestone Achieved: Project Completion",
        text: 'The milestone "Project Completion" has been achieved.\n\nDetails:\n- Value: 100%\n- Description: The project has been successfully completed.',
      };
    
      try {
        await transporter.sendMail(mailOptions);
      } catch (error) {
        console.error("Error sending email:", error);
      }
};
