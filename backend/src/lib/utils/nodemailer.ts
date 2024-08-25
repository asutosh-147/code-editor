import nodemailer from "nodemailer";
import { backendURL, myEmail, myPass } from "./constants";
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: myEmail,
    pass: myPass,
  },
});

export const sendMailtoUser = async (
  toEmail: string,
  token: string,
  name?: string
) => {
    try {
        return await new Promise<void>((res,rej) => {
            const mailConfig = {
              from: `"CodingKoala" <${myEmail}>`,
              to: toEmail,
              subject: "Action Required: Verify Your Email Address",
              text: `Dear ${name || 'User'},\n\nThank you for registering with us. Please verify your email address by clicking on the link below:\n\n${backendURL}/api/auth/verify/${token}\n\nIf you did not request this verification, please ignore this email.\n\nBest regards,\nCodingkoala.ninja`,
            };
    
            transporter.sendMail(mailConfig,(err,info) => {
              if(err) rej();
              console.log("Email sent");
              console.log(err);
              console.log(info);
              res();
            })
        })
    } catch (error) {
        return error;
    }
};
