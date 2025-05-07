/* eslint-disable @typescript-eslint/no-explicit-any */
const APPFIGURES_API_KEY = process.env.NEXT_PUBLIC_APPFIGURES_API_KEY;
const APPFIGURES_API_BASE = "https://api.appfigures.com/v2";

interface AppfiguresAppProduct {
	product_id: string;
	name: string;
	developer: string;
	icon: string;
	categories: string[];
	release_date: string;
	price: number;
	rating: number;
	rating_count: number;
	description: string;
	what_is_new: string;
	version: string;
	size: string;
	seller: string;
	seller_url: string;
	supported_devices: string[];
	screenshots: string[];
	last_updated: string;
}

interface AppfiguresRank {
	product_id: string;
	keyword: string;
	rank: number;
	date: string;
	country: string;
	device: string;
	previous_rank: number | null;
	change: number;
}

interface KeywordRanking {
	keyword: string;
	rank: number;
	change: number;
	volume: "High" | "Medium" | "Low";
	difficulty: "High" | "Medium" | "Low";
}

export async function searchAppByUrl(appUrl: string) {
	console.log("App URL: searchApp Func", appUrl);

	try {
		const storeId = getStoreIdFromUrl(appUrl);
		const appId = getAppIdFromUrl(appUrl);

		if (!storeId || !appId) {
			throw new Error("Invalid app URL");
		}

		const response = await fetch(
			`${APPFIGURES_API_BASE}/products/${storeId}/${appId}`,

			{
				headers: {
					Authorization: `Bearer ${APPFIGURES_API_KEY}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch app data: ${response.statusText}`);
		}

		const data: AppfiguresAppProduct = await response.json();
		return transformAppfiguresData(data);
	} catch (error) {
		console.error("Error searching app by URL:", error);
		throw error;
	}
}

export async function getKeywordRankings(productId: string, country = "US") {
	try {
		const response = await fetch(
			`${APPFIGURES_API_BASE}/ranks/keywords?products=${productId}&countries=${country}`,
			{
				headers: {
					"X-Client-Key": APPFIGURES_API_KEY || "",
				},
			}
		);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch keyword rankings: ${response.statusText}`
			);
		}

		const data: AppfiguresRank[] = await response.json();
		return transformKeywordRankingsData(data);
	} catch (error) {
		console.error("Error getting keyword rankings:", error);
		throw error;
	}
}

export async function getHistoricalRankings(
	productId: string,
	days = 30,
	country = "US"
) {
	try {
		const endDate = new Date();
		const startDate = new Date();
		startDate.setDate(startDate.getDate() - days);

		const startDateStr = formatDate(startDate);
		const endDateStr = formatDate(endDate);

		const response = await fetch(
			`${APPFIGURES_API_BASE}/ranks/history?products=${productId}&countries=${country}&start=${startDateStr}&end=${endDateStr}`,
			{
				headers: {
					"X-Client-Key": APPFIGURES_API_KEY || "",
				},
			}
		);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch historical rankings: ${response.statusText}`
			);
		}

		const data = await response.json();
		return transformHistoricalRankingsData(data);
	} catch (error) {
		console.error("Error getting historical rankings:", error);
		throw error;
	}
}

export async function getKeywordData(keyword: string, country = "US") {
	try {
		const response = await fetch(
			`${APPFIGURES_API_BASE}/aso/keywords?keywords=${encodeURIComponent(
				keyword
			)}&countries=${country}`,
			{
				headers: {
					"X-Client-Key": APPFIGURES_API_KEY || "",
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch keyword data: ${response.statusText}`);
		}

		const data = await response.json();
		return transformKeywordData(data);
	} catch (error) {
		console.error("Error getting keyword data:", error);
		throw error;
	}
}

// Helper functions
function getStoreIdFromUrl(url: string): string | null {
	if (url.includes("apps.apple.com")) {
		return "apple";
	} else if (url.includes("play.google.com")) {
		return "google_play";
	}
	return null;
}

function getAppIdFromUrl(url: string): string | null {
	if (url.includes("apps.apple.com")) {
		// Extract ID from Apple URL pattern
		const match = url.match(/id(\d+)/);
		return match ? match[1] : null;
	} else if (url.includes("play.google.com")) {
		// Extract ID from Google Play URL pattern
		const match = url.match(/id=([^&]+)/);
		return match ? match[1] : null;
	}
	return null;
}

function formatDate(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

// Data transformation functions
function transformAppfiguresData(data: AppfiguresAppProduct) {
	return {
		name: data.name,
		subtitle: "", // Appfigures might not provide subtitle directly
		description: data.description,
		category: data.categories[0] || "",
		rating: data.rating,
		reviewCount: data.rating_count,
		lastUpdated: data.last_updated,
		version: data.version,
		price: data.price > 0 ? `$${data.price.toFixed(2)}` : "Free",
		size: data.size,
		iconUrl: data.icon,
		screenshotUrls: data.screenshots,
		developer: data.developer,
		releaseDate: data.release_date,
	};
}

function transformKeywordRankingsData(
	data: AppfiguresRank[]
): KeywordRanking[] {
	return data.map((item) => ({
		keyword: item.keyword,
		rank: item.rank,
		change: item.change,
		volume: determineVolume(item.rank),
		difficulty: determineDifficulty(item.rank),
	}));
}

function transformHistoricalRankingsData(data: any) {
	// Transform historical rankings data based on Appfigures format
	// This will depend on the exact response structure
	return data;
}

function transformKeywordData(data: any) {
	// Transform keyword data based on Appfigures format
	// This will depend on the exact response structure
	return data;
}

// Simple algorithms to determine volume and difficulty based on rank
function determineVolume(rank: number): "High" | "Medium" | "Low" {
	if (rank <= 10) return "High";
	if (rank <= 50) return "Medium";
	return "Low";
}

function determineDifficulty(rank: number): "High" | "Medium" | "Low" {
	if (rank <= 5) return "High";
	if (rank <= 20) return "Medium";
	return "Low";
}
