import nodemailer from "nodemailer";

export const sendEmailMilestone = async (
  receivers: string,
  subject: string,
  text: string,
  projectTitle: string,
  projectId: string,
  milestones: Array<{
    milestone: string;
    done: boolean;
    date: string;
    value: string;
    unit: string;
    description: string;
  }>,
) => {
  const email = process.env.EMAIL_USER || ""
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Modify date format as needed
  };

  // Generate HTML content
  const milestonesHTML = milestones
    .map((milestone, index) => {
      const nextMilestone = milestones[index + 1];
      const isNextDone = nextMilestone ? nextMilestone.done : false;

      return `
            
            <div style="position: relative; padding: 1.5rem; padding-left: 2rem; margin-bottom: 1.5rem;">
                <div style="font-family: 'Caveat', sans-serif; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500; color: #007bff;">
                    Milestone ${milestone.milestone}
                </div>
                <div style="display: flex; flex-direction: column; position: relative; padding-left: 1rem; margin-bottom: 1rem; ${isNextDone ? "border-left: 2px solid #2ecc71;" : "border-left: 2px solid #BDC3C7;"}">
                    <time style="position: absolute; left: 0; margin-bottom: 0.5rem; display: inline-flex; height: 1.5rem; width: 6rem; align-items: center; justify-content: center; border-radius: 1.5rem; text-transform: uppercase; font-size: 0.75rem; font-weight: 600; color: ${milestone.done ? "#2ecc71" : "#7f8c8d"};">
                        ${formatDate(milestone.date)}
                    </time>
                    <div style="font-size: 1.125rem; font-weight: 700; color: #2c3e50;">
                        ${milestone.value} ${milestone.unit}
                    </div>
                    
                </div>
                <div style="font-size: 0.875rem; color: #95a5a6; word-break: break-word; overflow-wrap: break-word;">
                        ${milestone.description}
                    </div>
            </div>
        `;
    })
    .join("");

  const mailOptions = {
    from: {
      name: 'Global Shapers Iloilo',
      address: email,
  },
    bcc: receivers,
    subject: subject,
    text: text,
    html: `   
       <div style="padding: 1.5rem;">
        <h1 style="color: #000000;">${projectTitle} Update: Milestone Achieved</h1>
       <p style='color: #000000;'>We are excited to inform you that the project <strong>${projectTitle}</strong> has updated its milestone.</p>
       <p style='color: #000000;'>You can view the updated details and track the progress of the project by clicking the link below:</p>
       <p><a href=${process.env.NEXTAUTH_URL+"/funded-projects" +"/"+projectId} style="color: #007bff; text-decoration: none;">View Project ${projectTitle}</a></p>
       </div>
            ${milestonesHTML}
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
