import nodemailer from 'nodemailer';
import { getEnvData } from './getEnvData.js';
import { SMTP } from '../constants/smtp.js';

const transporter = nodemailer.createTransport({
  host: await getEnvData(SMTP.SMTP_HOST),
  port: await getEnvData(SMTP.SMTP_PORT),
  auth: {
    user: await getEnvData(SMTP.SMTP_USER),
    pass: await getEnvData(SMTP.SMTP_PASSWORD),
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
