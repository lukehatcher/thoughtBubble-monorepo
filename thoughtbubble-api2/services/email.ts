import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

export const sendEmail = async function (destination: string, subject: string, html: string) {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.EMAIL_BOT_CLIENT_ID,
    process.env.EMAIL_BOT_CLIENT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: process.env.EMAIL_BOT_REFRESH_TOKEN });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'thoughtBubble.bot@gmail.com',
      clientId: process.env.EMAIL_BOT_CLIENT_ID,
      clientSecret: process.env.EMAIL_BOT_CLIENT_SECRET,
      refreshToken: process.env.EMAIL_BOT_REFRESH_TOKEN,
      accessToken: process.env.EMAIL_BOT_ACCESS_TOKEN,
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
