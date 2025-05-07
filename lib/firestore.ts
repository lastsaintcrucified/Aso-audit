import {
	collection,
	addDoc,
	getDoc,
	getDocs,
	updateDoc,
	deleteDoc,
	query,
	where,
	doc,
	orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import type { AppMetadata, OptimizationResult, Report } from "@/types/app-data";

// App metadata operations
export async function saveAppMetadata(
	appData: Omit<AppMetadata, "id" | "createdAt" | "updatedAt">
) {
	try {
		const docRef = await addDoc(collection(db, "apps"), {
			...appData,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		});

		return {
			...appData,
			id: docRef.id,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		};
	} catch (error) {
		console.error("Error saving app metadata:", error);
		throw error;
	}
}

export async function updateAppMetadata(
	id: string,
	appData: Partial<Omit<AppMetadata, "id" | "createdAt" | "updatedAt">>
) {
	try {
		const appRef = doc(db, "apps", id);
		await updateDoc(appRef, {
			...appData,
			updatedAt: Date.now(),
		});
		return { id, ...appData, updatedAt: Date.now() };
	} catch (error) {
		console.error("Error updating app metadata:", error);
		throw error;
	}
}

export async function getAppMetadata(id: string) {
	try {
		const appRef = doc(db, "apps", id);
		const appSnap = await getDoc(appRef);

		if (appSnap.exists()) {
			return { id: appSnap.id, ...appSnap.data() } as AppMetadata;
		} else {
			throw new Error("App not found");
		}
	} catch (error) {
		console.error("Error getting app metadata:", error);
		throw error;
	}
}

export async function getUserApps(userId: string) {
	try {
		const appsQuery = query(
			collection(db, "apps"),
			where("userId", "==", userId),
			orderBy("createdAt", "desc")
		);

		const appsSnap = await getDocs(appsQuery);
		return appsSnap.docs.map(
			(doc) => ({ id: doc.id, ...doc.data() } as AppMetadata)
		);
	} catch (error) {
		console.error("Error getting user apps:", error);
		throw error;
	}
}

export async function deleteApp(id: string) {
	try {
		const appRef = doc(db, "apps", id);
		await deleteDoc(appRef);
		return true;
	} catch (error) {
		console.error("Error deleting app:", error);
		throw error;
	}
}

// Optimization results operations
export async function saveOptimizationResult(
	result: Omit<OptimizationResult, "id" | "createdAt">
) {
	try {
		const docRef = await addDoc(collection(db, "optimizations"), {
			...result,
			createdAt: Date.now(),
		});

		return { ...result, id: docRef.id, createdAt: Date.now() };
	} catch (error) {
		console.error("Error saving optimization result:", error);
		throw error;
	}
}

export async function getAppOptimizationResults(appId: string) {
	try {
		const resultsQuery = query(
			collection(db, "optimizations"),
			where("appId", "==", appId),
			orderBy("createdAt", "desc")
		);

		const resultsSnap = await getDocs(resultsQuery);
		return resultsSnap.docs.map(
			(doc) => ({ id: doc.id, ...doc.data() } as OptimizationResult)
		);
	} catch (error) {
		console.error("Error getting optimization results:", error);
		throw error;
	}
}

// Add the getUserReports function
export async function getUserReports(userId: string) {
	try {
		const reportsQuery = query(
			collection(db, "reports"),
			where("userId", "==", userId),
			orderBy("createdAt", "desc")
		);

		const reportsSnap = await getDocs(reportsQuery);
		return reportsSnap.docs.map(
			(doc) => ({ id: doc.id, ...doc.data() } as Report)
		);
	} catch (error) {
		console.error("Error getting user reports:", error);
		throw error;
	}
}

// Add the saveReport function
export async function saveReport(reportData: Omit<Report, "id" | "createdAt">) {
	try {
		const docRef = await addDoc(collection(db, "reports"), {
			...reportData,
			createdAt: Date.now(),
		});

		return { ...reportData, id: docRef.id, createdAt: Date.now() };
	} catch (error) {
		console.error("Error saving report:", error);
		throw error;
	}
}
