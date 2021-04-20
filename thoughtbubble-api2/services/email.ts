import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

export const sendEmail = async function (destination: string, subject: string, html: string) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.EMAIL_BOT_CLIENT_ID,
    process.env.EMAIL_BOT_CLIENT_SECRET,
    REDIRECT_URI
  );

  oauth2Client.setCredentials({ refresh_token: process.env.EMAIL_BOT_REFRESH_TOKEN });

  // from https://www.woolha.com/tutorials/node-js-send-email-using-gmail-with-nodemailer-oauth-2
  // with this approach i shouldnt need acces token in .env
  // const GMAIL_SCOPES = [
  //   'https://mail.google.com/',
  //   'https://www.googleapis.com/auth/gmail.modify',
  //   'https://www.googleapis.com/auth/gmail.compose',
  //   'https://www.googleapis.com/auth/gmail.send',
  // ];
  // const url = oauth2Client.generateAuthUrl({
  //   access_type: 'offline',
  //   scope: GMAIL_SCOPES,
  // });
  // console.log(url);
  // code is pasted from redirect uri param after above code is ran
  // const code = '4/0AY0e-g4G4HJwI0SA3iY9Mb3iNiicglL1rsTmS07nX5o_ZmHy-fP_v_Fo_-4uUNu9WVVmRA';
  // const getToken = async () => {
  //   const { tokens } = await oauth2Client.getToken(code);
  //   // token object contains refresh token, access token, expiration date etc
  //   console.info(tokens);
  // };
  // getToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'thoughtBubble.bot@gmail.com',
      clientId: process.env.EMAIL_BOT_CLIENT_ID,
      clientSecret: process.env.EMAIL_BOT_CLIENT_SECRET,
      refreshToken: process.env.EMAIL_BOT_REFRESH_TOKEN,
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
