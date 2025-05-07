export interface AppMetadata {
	id: string;
	userId: string;
	name: string;
	subtitle: string;
	description: string;
	category: string;
	appStoreUrl: string;
	rating?: number;
	reviewCount?: number;
	lastUpdated?: string;
	version?: string;
	price?: string;
	size?: string;
	iconUrl?: string;
	screenshotUrls?: string[];
	developer?: string;
	createdAt: number;
	updatedAt: number;
}

export interface OptimizationResult {
	id: string;
	appId: string;
	originalTitle: string;
	originalSubtitle: string;
	originalDescription: string;
	optimizedTitle: string;
	optimizedSubtitle: string;
	optimizedDescription: string;
	createdAt: number;
}

export interface KeywordRanking {
	keyword: string;
	rank: number;
	change: number;
	volume: "High" | "Medium" | "Low";
	difficulty: "High" | "Medium" | "Low";
	relevance?: "High" | "Medium" | "Low";
}

export interface CompetitorAnalysis {
	appId: string;
	competitorAppIds: string[];
	visibilityScores: Record<string, number>;
	keywordOverlap: Record<string, KeywordRanking[]>;
	createdAt: number;
}

export interface VisibilityScore {
	appId: string;
	score: number;
	date: string;
	categoryPercentile?: number;
	breakdown: {
		keywordCount: number;
		rankingScore: number;
		volumeScore: number;
		relevanceScore: number;
	};
}

export interface Recommendation {
	id: string;
	appId: string;
	title: string;
	description: string;
	impact: "High" | "Medium" | "Low";
	category: string;
	implemented: boolean;
	createdAt: number;
}

export interface Report {
	id: string;
	userId: string;
	appId: string;
	title: string;
	date: string;
	type: "standard" | "premium";
	url?: string;
	createdAt: number;
}

export interface AppAnalysisProject {
	id: string;
	userId: string;
	name: string;
	mainAppId: string;
	competitorAppIds: string[];
	lastUpdated: number;
	createdAt: number;
}
