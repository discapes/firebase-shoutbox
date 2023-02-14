import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { SERVICE_ACCOUNT_EMAIL, SERVICE_ACCOUNT_KEY } from '$env/static/private';

initializeApp(
	{
		credential: credential.cert({
			projectId: 'so-me-22719',
			clientEmail: SERVICE_ACCOUNT_EMAIL,
			privateKey: SERVICE_ACCOUNT_KEY
		})
	},
	'so-me'
);

export const db = getFirestore();
export const auth = getAuth();
