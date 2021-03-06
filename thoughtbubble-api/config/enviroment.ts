import dotenv from 'dotenv';
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
  auth: {
    github_client_id: process.env.GITHUB_CLIENT_ID,
    github_client_secret: process.env.GITHUB_CLIENT_SECRET,
    github_callback_url: process.env.GITHUB_CALLBACK_URL,
    github_client_id_vscode: process.env.GITHUB_CLIENT_ID_VSCODE,
    github_client_secret_vscode: process.env.GITHUB_CLIENT_SECRET_VSCODE,
    github_callback_url_vscode: process.env.GITHUB_CALLBACK_URL_VSCODE,
  },
  vscode_dev: {
    vscode_dev_token: process.env.VSCODE_DEV_TOKEN,
    vscode_dev_userid: process.env.VSCODE_DEV_USERID,
  },
};
