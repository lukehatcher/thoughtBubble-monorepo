import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

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
  to: 'lukehatcher98@gmail.com',
  subject: 'testing more env stuff',
  text: 'hello from nodemailer',
  // html: '<h1>hello there 💭</h1>',
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('sent', info.response);
});
