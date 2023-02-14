import type { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase.client';

export type UserData = {
	username: string;
};

export async function getUserdata(user: User): Promise<UserData | null> {
	const res = await getDoc(doc(db, 'users', user.uid));
	if (!res.exists()) return null;
	const data = <UserData>res.data();
	return data;
}
