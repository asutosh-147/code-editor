import nodemailer from "nodemailer";
import { myEmail, myPass } from "./constants";
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: myEmail,
    pass: "kfkj qgsu sepg ybil",
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
              from: myEmail,
              to: toEmail,
              subject: "Verify Your Email",
              text: `Hello ${name} Please Verify Your Email by Clicking on This Link http://localhost:3000/api/auth/verify/${token}`,
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
