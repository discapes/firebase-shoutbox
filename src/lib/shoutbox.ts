import {
	addDoc,
	collection,
	limit,
	onSnapshot,
	orderBy,
	query,
	Timestamp
} from 'firebase/firestore';
import { writable } from 'svelte/store';
import { db } from './firebase.client';

const shoutboxCollection = collection(db, 'shoutbox');

export type Message = {
	message: string;
	username: string;
	timestamp: Timestamp;
};

export function getShoutbox() {
	const store = writable<Message[] | undefined>(undefined);

	const q = query(shoutboxCollection, orderBy('timestamp', 'desc'), limit(10));
	const unsub = onSnapshot(q, (docs) => store.set(docs.docs.map((d) => <Message>d.data())));
	return store;
}

export async function addToShoutbox(message: string, user: UserData) {
	await addDoc(shoutboxCollection, {
		message,
		username: user.username,
		timestamp: Timestamp.now()
	});
}
