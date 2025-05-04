/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import {
	type User,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateProfile,
} from "firebase/auth";
import {
	doc,
	setDoc,
	getDoc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { useRouter } from "next/navigation";

interface UserData {
	uid: string;
	email: string | null;
	displayName: string | null;
	createdAt: any;
}

interface AuthContextType {
	user: User | null;
	userData: UserData | null;
	loading: boolean;
	signup: (
		email: string,
		password: string,
		displayName: string
	) => Promise<void>;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [userData, setUserData] = useState<UserData | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setUser(user);

			if (user) {
				// Fetch additional user data from Firestore
				const userDocRef = doc(db, "users", user.uid);
				const userDoc = await getDoc(userDocRef);

				if (userDoc.exists()) {
					console.log(userDoc.data(), "User data fetched from Firestore");
					// Set user data in state
					setUserData(userDoc.data() as UserData);
				}
			} else {
				console.log("No user signed in");
				// User is signed out, set userData to null
				setUserData(null);
			}

			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const signup = async (
		email: string,
		password: string,
		displayName: string
	) => {
		try {
			// Create user with email and password
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			// Update profile with display name
			await updateProfile(user, { displayName });

			// Create user document in Firestore
			const userData: UserData = {
				uid: user.uid,
				email: user.email,
				displayName: user.displayName,
				createdAt: serverTimestamp(),
			};

			await setDoc(doc(db, "users", user.uid), userData);

			setUserData(userData);
		} catch (error) {
			console.error("Error signing up:", error);
			throw error;
		}
	};

	const login = async (email: string, password: string): Promise<void> => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			// console.log(user, "User logged in");

			// Fetch user data from Firestore
			const userDocRef = doc(db, "users", user.uid);
			const userDoc = await getDoc(userDocRef);

			if (userDoc.exists()) {
				// console.log(userDoc.data(), "User data fetched from Firestore");
				// Set user data in state
				setUserData(userDoc.data() as UserData);
			} else {
				console.log("No such document!");
			}
		} catch (error) {
			console.error("Error logging in:", error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			router.push("/");
		} catch (error) {
			console.error("Error logging out:", error);
			throw error;
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, userData, loading, signup, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
export async function updateUserProfile(
	userId: string,
	profileData: {
		displayName?: string;
		photoURL?: string;
		bio?: string;
		location?: string;
		website?: string;
	}
): Promise<void> {
	try {
		const userRef = doc(db, "users", userId);

		// Update Firestore document
		await updateDoc(userRef, {
			...profileData,
			updatedAt: new Date(),
		});

		// Update Firebase Auth profile if displayName or photoURL is provided
		if (auth.currentUser && (profileData.displayName || profileData.photoURL)) {
			await updateProfile(auth.currentUser, {
				displayName: profileData.displayName,
				photoURL: profileData.photoURL,
			});
		}
	} catch (error) {
		console.error("Error updating user profile:", error);
		throw error;
	}
}

export async function createUserProfile(
	userId: string,
	userData: {
		displayName?: string;
		email: string;
		photoURL?: string;
	}
): Promise<void> {
	try {
		const userRef = doc(db, "users", userId);

		await setDoc(userRef, {
			displayName: userData.displayName || "",
			email: userData.email,
			photoURL: userData.photoURL || null,
			bio: "",
			location: "",
			website: "",
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	} catch (error) {
		console.error("Error creating user profile:", error);
		throw error;
	}
}
