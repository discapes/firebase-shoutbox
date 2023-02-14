// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { writable } from 'svelte/store';
import { getUserdata, type UserData } from './user';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDxoFrPI7699sIjBGzl8Jp6pqluDTawm9k',
	authDomain: 'so-me-22719.firebaseapp.com',
	projectId: 'so-me-22719',
	storageBucket: 'so-me-22719.appspot.com',
	messagingSenderId: '497031276124',
	appId: '1:497031276124:web:397e7b188827788f892899',
	measurementId: 'G-VPYNL8GRHF'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const user = writable<User | null>(auth.currentUser);
export const userData = writable<UserData | null>(null);

if (auth.currentUser) getUserdata(auth.currentUser).then((data) => userData.set(data));

onAuthStateChanged(auth, (newUser) => {
	user.set(newUser);
	if (newUser) getUserdata(newUser).then((data) => userData.set(data));
	else userData.set(null);
});
