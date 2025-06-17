import nodemailer from 'nodemailer';
import { getEnvData } from './getEnvData.js';

const transporter = nodemailer.createTransport({
  host: getEnvData('SMTP_HOST'),
  port: getEnvData('SMTP_PORT'),
  auth: {
    user: getEnvData('SMTP_USER'),
    pass: getEnvData('SMTP_PASSWORD'),
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
