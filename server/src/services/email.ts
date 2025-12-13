import nodemailer from "nodemailer";
import configEnv from "@/config/appConfig";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: configEnv.MAIL_HOST,
  port: Number(configEnv.MAIL_PORT),
  secure: false,
  auth: {
    user: configEnv.MAIL_USER_EMAIL,
    pass: configEnv.MAIL_PASSWORD
  }
});

const sendEmail = async (
  emailAddress: string,
  subject: string,
  html: string
) => {
  await transporter.sendMail({
    from: `"${configEnv.MAIL_USER_NAME}", <${configEnv.MAIL_USER_EMAIL}>`,
    to: emailAddress,
    subject,
    // plain‑text body
    html: html // HTML body
  });
};

export default sendEmail;
