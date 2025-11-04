import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function main() {

  const to = 'example@gmail.com';

  const subject = 'Email com HTML';
  const text = 'Versão em texto do email';
  const html = `
      <h1 style="color: #333;">Olá!</h1>
    `;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587') || 587,
    secure: process.env.SMTP_SECURE === 'true', // true para 465, false para outros
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const message = await transporter.sendMail({
    to: to,
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    subject: subject,
    html: html,
    text: text,
  });

  console.log("Message sent: ", message);


}

main();