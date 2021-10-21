import { app } from './firebase';
import { writable } from 'svelte/store';
import { browser } from '$app/env';
import {
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithRedirect,
	signOut as _signOut,
	updateProfile as _updateProfile
} from 'firebase/auth';
import type { User } from 'firebase/auth';

// interface setup

export interface AuthState {
	user: User | null;
	pending: boolean;
	isSignedIn: boolean;
}

// auth features

const createAuth = () => {
	//
	// auth store

	const { subscribe, set } = writable<AuthState>({ user: null, pending: true, isSignedIn: false });

	async function listen() {
		const auth = getAuth(app);
		onAuthStateChanged(
			auth,
			(user) => set({ user, pending: false, isSignedIn: !!user }),
			(err) => console.error(err.message)
		);
	}

	if (browser) {
		// listen to auth changes on client
		listen();
	} else {
		// no auth on server in this example
		// set({ user: null, pending: false, known: ? });
	}

	function providerFor(name: string) {
		switch (name) {
			case 'google':
				return new GoogleAuthProvider();
			default:
				throw 'unknown provider ' + name;
		}
	}

	async function signInWith(name: string) {
		const auth = getAuth(app);
		const provider = providerFor(name);
		await signInWithRedirect(auth, provider);
	}

	async function signInWithEmail(email: string, password: string) {
		const auth = getAuth(app);
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (err) {
			console.error(err.message);
		}
	}

	async function signOut() {
		const auth = getAuth(app);
		await _signOut(auth);
	}

	async function updateProfile(displayName: string) {
		const auth = getAuth(app);
		try {
			_updateProfile(auth.currentUser, { displayName });
		} catch (err) {
			console.error(err.message);
		}
	}

	async function getCurrentUser() {
		const auth = getAuth(app);
		return auth.currentUser;
	}

	return {
		subscribe,
		getCurrentUser,
		signInWith,
		signInWithEmail,
		signOut,
		updateProfile
	};
};

export const auth = createAuth();
