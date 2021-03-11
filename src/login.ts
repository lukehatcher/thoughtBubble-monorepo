import * as vscode from 'vscode';
import createAuth0Client from '@auth0/auth0-spa-js';

export async function loginHandler(extensionUri: vscode.Uri) {
	// console.log('asdfasdf');
	const auth0 = await createAuth0Client({
		domain: 'dev-4pq8almu.us.auth0.com',
		client_id: 'yUKz7pLzF9C3Kf7iAzrApEdisqyoGgzj',
	});

	// await auth0.loginWithRedirect({
  //   redirect_uri: extensionUri.toString(),
  // });
	console.log('asdfasdf');
	await auth0.loginWithPopup();
	
	const user = await auth0.getUser();
  console.log(user);
	return user;
}
