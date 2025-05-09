/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RefreshCw } from "lucide-react";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/loading-spinner";
import { AppMetadataCard } from "@/components/app-metadata-card";
import { AppRankingsComparison } from "@/components/app-rankings-comparison";
import { fetchAppMetadata } from "@/app/actions/fetch-app-metadata";
import { getAppMetadata } from "@/lib/firestore";
import type { AppMetadata } from "@/types/app-data";

// Dummy ranking data
const generateDummyRankings = (appName: string, isBetter = false) => {
	return {
		overallRank: isBetter
			? Math.floor(Math.random() * 500) + 1
			: Math.floor(Math.random() * 500) + 501,
		categoryRank: isBetter
			? Math.floor(Math.random() * 50) + 1
			: Math.floor(Math.random() * 50) + 51,
		ratingScore: isBetter
			? 4.5 + Math.random() * 0.5
			: 3.5 + Math.random() * 1.0,
		reviewCount: isBetter
			? Math.floor(Math.random() * 5000) + 5000
			: Math.floor(Math.random() * 5000),
		keywordRankings: [
			{
				keyword: "productivity app",
				rank: isBetter
					? Math.floor(Math.random() * 10) + 1
					: Math.floor(Math.random() * 20) + 11,
				change: isBetter
					? Math.floor(Math.random() * 5) + 1
					: Math.floor(Math.random() * 5) - 5,
			},
			{
				keyword: "task manager",
				rank: isBetter
					? Math.floor(Math.random() * 15) + 1
					: Math.floor(Math.random() * 30) + 16,
				change: isBetter
					? Math.floor(Math.random() * 5) + 1
					: Math.floor(Math.random() * 5) - 5,
			},
			{
				keyword: "to-do list",
				rank: isBetter
					? Math.floor(Math.random() * 20) + 1
					: Math.floor(Math.random() * 40) + 21,
				change: isBetter
					? Math.floor(Math.random() * 5) + 1
					: Math.floor(Math.random() * 5) - 5,
			},
			{
				keyword: "project management",
				rank: isBetter
					? Math.floor(Math.random() * 25) + 1
					: Math.floor(Math.random() * 50) + 26,
				change: isBetter
					? Math.floor(Math.random() * 5) + 1
					: Math.floor(Math.random() * 5) - 5,
			},
			{
				keyword: "time tracking",
				rank: isBetter
					? Math.floor(Math.random() * 30) + 1
					: Math.floor(Math.random() * 60) + 31,
				change: isBetter
					? Math.floor(Math.random() * 5) + 1
					: Math.floor(Math.random() * 5) - 5,
			},
		],
	};
};

export default function CompareAppsPage() {
	const { toast } = useToast();
	const { user } = useAuth();
	const router = useRouter();
	const searchParams = useSearchParams();
	const appId = searchParams.get("appId");

	const [isLoading, setIsLoading] = useState(true);
	const [isFetchingCompetitor, setIsFetchingCompetitor] = useState(false);
	const [mainApp, setMainApp] = useState<AppMetadata | null>(null);
	const [competitorApp, setCompetitorApp] = useState<AppMetadata | null>(null);
	const [competitorUrl, setCompetitorUrl] = useState("");
	const [activeTab, setActiveTab] = useState("metadata");

	// Generate dummy rankings data
	const [mainAppRankings, setMainAppRankings] = useState(
		generateDummyRankings("Main App", true)
	);
	const [competitorRankings, setCompetitorRankings] = useState(
		generateDummyRankings("Competitor App")
	);

	useEffect(() => {
		async function fetchMainApp() {
			if (!user || !appId) {
				router.push("/dashboard");
				return;
			}

			try {
				setIsLoading(true);
				const app = await getAppMetadata(appId);
				setMainApp(app);
				// Generate new dummy rankings when main app changes
				setMainAppRankings(generateDummyRankings(app.name, true));
			} catch (error: any) {
				toast({
					title: "Error loading app",
					description: error.message || "Failed to load app data",
					variant: "destructive",
				});
				router.push("/dashboard");
			} finally {
				setIsLoading(false);
			}
		}

		fetchMainApp();
	}, [user, appId, router]);

	const handleFetchCompetitor = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!competitorUrl) {
			toast({
				title: "Competitor URL required",
				description: "Please enter the App Store URL of the competitor app",
				variant: "destructive",
			});
			return;
		}

		// Validate the URL format
		if (!competitorUrl.includes("apps.apple.com")) {
			toast({
				title: "Invalid App Store URL",
				description: "Please enter a valid iOS App Store URL",
				variant: "destructive",
			});
			return;
		}

		setIsFetchingCompetitor(true);

		try {
			const metadata = await fetchAppMetadata(competitorUrl);
			setCompetitorApp(metadata);
			// Generate new dummy rankings when competitor app changes
			setCompetitorRankings(generateDummyRankings(metadata.name));
			toast({
				title: "Competitor fetched successfully",
				description: "You can now compare the apps side by side",
			});
		} catch (error: any) {
			toast({
				title: "Error fetching competitor",
				description: error.message || "Failed to fetch competitor app metadata",
				variant: "destructive",
			});
		} finally {
			setIsFetchingCompetitor(false);
		}
	};

	if (isLoading) {
		return (
			<div className='flex h-full items-center justify-center min-h-[400px]'>
				<LoadingSpinner className='h-8 w-8' />
			</div>
		);
	}

	if (!mainApp) {
		return (
			<div className='flex h-full flex-col items-center justify-center min-h-[400px]'>
				<p className='text-muted-foreground mb-4'>
					App not found or you don't have permission to view it.
				</p>
				<Button onClick={() => router.push("/dashboard")}>
					Return to Dashboard
				</Button>
			</div>
		);
	}

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>Compare Apps</h1>
					<p className='text-muted-foreground'>
						Compare your app with a competitor side by side
					</p>
				</div>
			</div>

			{!competitorApp ? (
				<Card>
					<form onSubmit={handleFetchCompetitor}>
						<CardHeader>
							<CardTitle>Add Competitor App</CardTitle>
							<CardDescription>
								Enter the App Store URL of the competitor app you want to
								compare with
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='competitor-url'>Competitor App Store URL</Label>
								<div className='flex gap-2'>
									<Input
										id='competitor-url'
										placeholder='https://apps.apple.com/us/app/competitor-app-id'
										value={competitorUrl}
										onChange={(e) => setCompetitorUrl(e.target.value)}
										className='flex-1'
									/>
									<Button
										type='submit'
										disabled={isFetchingCompetitor || !competitorUrl}
									>
										{isFetchingCompetitor ? (
											<LoadingSpinner className='mr-2' />
										) : (
											<RefreshCw className='mr-2 h-4 w-4' />
										)}
										Fetch Competitor
									</Button>
								</div>
								<p className='text-xs text-muted-foreground'>
									Example:
									https://apps.apple.com/us/app/todoist-to-do-list-planner/id572688855
								</p>
							</div>
						</CardContent>
						<CardFooter>
							<p className='text-sm text-muted-foreground'>
								Your app: <span className='font-medium'>{mainApp.name}</span>
							</p>
						</CardFooter>
					</form>
				</Card>
			) : (
				<>
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className='w-full'
					>
						<TabsList className='grid w-full grid-cols-2'>
							<TabsTrigger value='metadata'>App Metadata</TabsTrigger>
							<TabsTrigger value='rankings'>App Rankings</TabsTrigger>
						</TabsList>

						<TabsContent
							value='metadata'
							className='mt-6'
						>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<Card>
									<CardHeader>
										<CardTitle>{mainApp.name}</CardTitle>
										<CardDescription>Your app</CardDescription>
									</CardHeader>
									<CardContent>
										<AppMetadataCard app={mainApp} />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>{competitorApp.name}</CardTitle>
										<CardDescription>Competitor app</CardDescription>
									</CardHeader>
									<CardContent>
										<AppMetadataCard app={competitorApp} />
									</CardContent>
								</Card>
							</div>
						</TabsContent>

						<TabsContent
							value='rankings'
							className='mt-6'
						>
							<AppRankingsComparison
								mainApp={{
									name: mainApp.name,
									rankings: mainAppRankings,
								}}
								competitorApp={{
									name: competitorApp.name,
									rankings: competitorRankings,
								}}
							/>
						</TabsContent>
					</Tabs>

					<div className='flex justify-end'>
						<Button
							variant='outline'
							onClick={() => {
								setCompetitorApp(null);
								setCompetitorUrl("");
							}}
						>
							Compare with Different App
						</Button>
					</div>
				</>
			)}
		</div>
	);
}
