import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { config } from '../config/enviroment';

export const sendEmail = async function (destination: string, subject: string, html: string) {
  const oauth2Client = new google.auth.OAuth2(
    config.email.client_id,
    config.email.client_secret,
    config.email.redirect_uri,
  );

  oauth2Client.setCredentials({ refresh_token: config.email.refresh_token });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'thoughtBubble.bot@gmail.com',
      clientId: config.email.client_id,
      clientSecret: config.email.client_secret,
      refreshToken: config.email.refresh_token,
    },
  });

  const mailOptions = {
    from: 'thoughtBubble Bot 🤖 <thoughtBubble.bot@gmail.com>',
    to: destination,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error(err);
    else console.log('sent', info.response);
  });
};
