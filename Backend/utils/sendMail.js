import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { getVerificationEmailHtml } from './emailTemplates/verificationEmail.js';
dotenv.config()

export const sendVerificationEmail = async (email, token) => {

    const verificationUrl = `http://localhost:${process.env.PORT}/api/auth/verify/${token}` ; 

    const htmlContent = getVerificationEmailHtml(verificationUrl)

    try{
        var transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });

        await transporter.sendMail({
            from: process.env.EMAIL_USER, 
            to: email, 
            subject: 'Verify your Email', 
            html: htmlContent
        })


    }catch(err){
        console.error('Error sending email: ', err)
    }
}