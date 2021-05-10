const dotenv = require('dotenv');
dotenv.config();

// purpose is to have intellisense for my env vars

export const config = {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  email: {
    address: process.env.EMAIL_BOT_ADRESS,
    redirect_uri: process.env.REDIRECT_URI,
    client_id: process.env.EMAIL_BOT_CLIENT_ID,
    client_secret: process.env.EMAIL_BOT_CLIENT_SECRET,
    refresh_token: process.env.EMAIL_BOT_REFRESH_TOKEN,
    access_token: process.env.EMAIL_BOT_ACCESS_TOKEN,
  },
};
