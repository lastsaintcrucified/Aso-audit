/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
const RAPIDAPI_HOST = "app-store-and-google-play-api.p.rapidapi.com";
const RAPIDAPI_BASE_URL =
	"https://app-store-and-google-play-api.p.rapidapi.com/v1";

interface AppDetails {
	appId: string;
	title: string;
	description: string;
	summary?: string;
	icon: string;
	screenshots: string[];
	developer: string;
	developerWebsite?: string;
	developerEmail?: string;
	genre: string;
	genreId: string;
	price: string;
	currency?: string;
	size?: string;
	releaseDate: string;
	lastUpdateDate: string;
	version: string;
	rating: number;
	reviewCount: number;
	contentRating: string;
	inAppPurchases?: boolean;
	similarApps?: string[];
}

interface KeywordData {
	keyword: string;
	rank: number;
	difficulty: "High" | "Medium" | "Low";
	volume: "High" | "Medium" | "Low";
	relevance: "High" | "Medium" | "Low";
	change: number;
}

export async function getAppDetails(appUrl: string): Promise<AppDetails> {
	try {
		// Extract app ID from URL
		const appId = extractAppIdFromUrl(appUrl);
		// console.log("App ID:", appId);
		const countryCode = getCountryCodeFromUrl(appUrl);

		const endpoint = `${RAPIDAPI_BASE_URL}/app-store/app-details`;

		const response = await fetch(
			`${endpoint}/${appId}${countryCode ? `?country=${countryCode}` : null}`,
			{
				method: "GET",
				headers: {
					"X-RapidAPI-Key": RAPIDAPI_KEY || "",
					"X-RapidAPI-Host": RAPIDAPI_HOST,
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch app details: ${response.statusText}`);
		}

		const data = await response.json();
		// console.log("App Details Data:", data);
		return transformAppDetails(data);
	} catch (error) {
		console.error("Error fetching app details:", error);
		throw error;
	}
}
export function getCountryCodeFromUrl(appUrl: string): string | null {
	try {
		const url = new URL(appUrl);
		const segments = url.pathname.split("/");
		const countryCodeIndex = segments.findIndex((seg) => seg === "app") - 1;
		return segments[countryCodeIndex] || null;
	} catch (error) {
		console.error("Invalid URL:", error);
		return null;
	}
}
export async function getAppKeywords(appUrl: string): Promise<KeywordData[]> {
	try {
		const appId = extractAppIdFromUrl(appUrl);

		const endpoint = `${RAPIDAPI_BASE_URL}/keywords/app-store`;

		const response = await fetch(`${endpoint}?app_id=${appId}`, {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": RAPIDAPI_KEY || "",
				"X-RapidAPI-Host": RAPIDAPI_HOST,
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch app keywords: ${response.statusText}`);
		}

		const data = await response.json();
		return transformKeywordData(data);
	} catch (error) {
		console.error("Error fetching app keywords:", error);
		// Return some mock keywords if the API doesn't support this feature
		return generateMockKeywords();
	}
}

export async function getAppReviews(
	appUrl: string,
	limit = 50
): Promise<any[]> {
	try {
		const appId = extractAppIdFromUrl(appUrl);

		const endpoint = `${RAPIDAPI_BASE_URL}/reviews/app-store`;

		const response = await fetch(`${endpoint}?app_id=${appId}&limit=${limit}`, {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": RAPIDAPI_KEY || "",
				"X-RapidAPI-Host": RAPIDAPI_HOST,
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch app reviews: ${response.statusText}`);
		}

		const data = await response.json();
		return data.reviews || [];
	} catch (error) {
		console.error("Error fetching app reviews:", error);
		return [];
	}
}

export async function searchApps(query: string): Promise<any[]> {
	try {
		const endpoint = `${RAPIDAPI_BASE_URL}/search/app-store`;

		const response = await fetch(
			`${endpoint}?query=${encodeURIComponent(query)}`,
			{
				method: "GET",
				headers: {
					"X-RapidAPI-Key": RAPIDAPI_KEY || "",
					"X-RapidAPI-Host": RAPIDAPI_HOST,
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to search apps: ${response.statusText}`);
		}

		const data = await response.json();
		return data.results || [];
	} catch (error) {
		console.error("Error searching apps:", error);
		return [];
	}
}

// Helper functions
function extractAppIdFromUrl(appUrl: string): string {
	if (!appUrl.includes("apps.apple.com")) {
		throw new Error(
			"Invalid App Store URL. Please provide a valid iOS App Store URL."
		);
	}

	const match = appUrl.match(/id(\d+)/);
	const appId = match ? match[1] : "";

	if (!appId) {
		throw new Error("Could not extract app ID from URL");
	}

	return appId;
}

function transformAppDetails({ data }: any): AppDetails {
	// Transform the API response to our AppDetails interface
	return {
		appId: data.id || "",
		title: data.title || data.name || "",
		description: data.description || "",
		summary: data.summary || data.shortDescription || "",
		icon: data.icon || data.iconUrl || "",
		screenshots: data.screenshots || data.screenshotUrls || [],
		developer: data.developer_site || data.developerName || "",
		developerWebsite: data.developer_site || data.developerUrl || "",
		developerEmail: data.developerEmail || "",
		genre: data.genre || data.category || "",
		genreId: data.genreId || data.categoryId || "",
		price: data.price || "Free",
		currency: data.currency || "USD",
		size: data.size || "",
		releaseDate: data.releaseDate || "",
		lastUpdateDate: data.latest_version_date || data.updatedDate || "",
		version: data.latest_version || "",
		rating: Number.parseFloat(data.rating) || 0,
		reviewCount: data.reviews.length || 0,
		contentRating: data.contentRating || "",
		inAppPurchases: data.inAppPurchases || false,
		similarApps: data.similarApps || [],
	};
}

function transformKeywordData(data: any): KeywordData[] {
	// If the API provides keyword data, transform it to our format
	if (Array.isArray(data.keywords)) {
		return data.keywords.map((keyword: any) => ({
			keyword: keyword.term || keyword.keyword || "",
			rank: keyword.rank || 0,
			difficulty: determineDifficulty(keyword.rank || 0),
			volume: determineVolume(keyword.traffic || keyword.volume || 0),
			relevance: determineRelevance(keyword.relevance || 0.5),
			change: keyword.change || 0,
		}));
	}

	// Return mock data if the API doesn't provide keyword information
	return generateMockKeywords();
}

function determineDifficulty(rank: number): "High" | "Medium" | "Low" {
	if (rank <= 10) return "High";
	if (rank <= 50) return "Medium";
	return "Low";
}

function determineVolume(volume: number): "High" | "Medium" | "Low" {
	if (volume >= 0.7) return "High";
	if (volume >= 0.3) return "Medium";
	return "Low";
}

function determineRelevance(relevance: number): "High" | "Medium" | "Low" {
	if (relevance >= 0.7) return "High";
	if (relevance >= 0.3) return "Medium";
	return "Low";
}

function generateMockKeywords(): KeywordData[] {
	// Generate mock keyword data for testing or when the API doesn't provide this information
	// iOS-specific keywords
	const keywords = [
		"productivity app",
		"task manager",
		"to-do list",
		"project management",
		"time tracking",
		"calendar app",
		"notes app",
		"reminder app",
		"team collaboration",
		"work management",
	];

	return keywords.map((keyword, index) => ({
		keyword,
		rank: Math.floor(Math.random() * 50) + 1,
		difficulty: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)] as
			| "High"
			| "Medium"
			| "Low",
		volume: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)] as
			| "High"
			| "Medium"
			| "Low",
		relevance: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)] as
			| "High"
			| "Medium"
			| "Low",
		change: Math.floor(Math.random() * 10) - 5,
	}));
}
