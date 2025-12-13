import nodemailer from "nodemailer";
import configEnv from "@/config/appConfig";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: configEnv.DEV_MAIL_HOST,
  port: Number(configEnv.DEV_MAIL_PORT),
  secure: false,
  auth: {
    user: configEnv.DEV_MAIL_USER_EMAIL,
    pass: configEnv.DEV_MAIL_PASSWORD
  }
});

const sendEmail = async (
  emailAddress: string,
  subject: string,
  html: string
) => {
  await transporter.sendMail({
    from: `"${configEnv.DEV_MAIL_USER_NAME}", <${configEnv.DEV_MAIL_USER_EMAIL}>`,
    to: emailAddress,
    subject,
    // plain‑text body
    html: html // HTML body
  });
};

export default sendEmail;
