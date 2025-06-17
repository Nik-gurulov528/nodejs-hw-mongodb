import nodemailer from 'nodemailer';
import { getEnvData } from './getEnvData.js';

const transporter = nodemailer.createTransport({
  host: await getEnvData('SMTP_HOST'),
  port: await getEnvData('SMTP_PORT'),
  auth: {
    user: await getEnvData('SMTP_USER'),
    pass: await getEnvData('SMTP_PASSWORD'),
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
