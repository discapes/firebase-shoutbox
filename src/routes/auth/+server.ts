import { auth, db } from '$lib/firebase.server';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const {
		credential: { accessToken },
		idToken
	} = await request.json();
	const { uid } = await auth.verifyIdToken(idToken);
	const user = await fetchGithubUser(accessToken);
	await db.collection('users').doc(uid).set(user);
	return new Response(null);
};

function fetchGithubUser(accessToken: string) {
	return fetch(`https://api.github.com/user`, {
		headers: { Accept: 'application/json', Authorization: 'Bearer ' + accessToken }
	}).then((res) => res.json());
}
