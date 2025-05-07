"use server";
import { getAppDetails } from "@/lib/rapidapi-service";
import { saveAppMetadata } from "@/lib/firestore";
import type { AppMetadata } from "@/types/app-data";

export async function saveAppFromUrl(appUrl: string, userId: string) {
	try {
		// Fetch app details from RapidAPI
		const appData = await getAppDetails(appUrl);

		// Save app metadata to Firestore
		const savedApp = await saveAppMetadata({
			name: appData.title,
			subtitle: appData.summary || "",
			description: appData.description,
			category: appData.genre,
			rating: appData.rating,
			reviewCount: appData.reviewCount,
			lastUpdated: appData.lastUpdateDate,
			version: appData.version,
			price: appData.price,
			size: appData.size || "Unknown",
			userId,
			appStoreUrl: appUrl,
			iconUrl: appData.icon,
			screenshotUrls: appData.screenshots,
			developer: appData.developer || "",
		} as Omit<AppMetadata, "id" | "createdAt" | "updatedAt">);

		return savedApp;
	} catch (error) {
		console.error("Error saving app:", error);
		throw new Error("Failed to save app. Please try again.");
	}
}
