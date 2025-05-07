"use server";
import { getAppDetails } from "@/lib/rapidapi-service";
import type { AppMetadata } from "@/types/app-data";

export async function fetchAppMetadata(appUrl: string): Promise<AppMetadata> {
	try {
		// Fetch app details from RapidAPI
		const appData = await getAppDetails(appUrl);

		// Transform the data to match our AppMetadata type
		const metadata: AppMetadata = {
			id: "preview", // Temporary ID for preview
			userId: "preview", // Temporary userId for preview
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
			appStoreUrl: appUrl,
			iconUrl: appData.icon,
			screenshotUrls: appData.screenshots,
			developer: appData.developer || "",
			createdAt: Date.now(),
			updatedAt: Date.now(),
		};

		return metadata;
	} catch (error) {
		console.error("Error fetching app metadata:", error);
		throw new Error(
			"Failed to fetch app metadata. Please check the URL and try again."
		);
	}
}
