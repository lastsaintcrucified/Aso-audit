/* eslint-disable react/no-unescaped-entities */
"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VisibilityScoreChart } from "@/components/visibility-score-chart";
import { KeywordRankingsTable } from "@/components/keyword-rankings-table";
import { RecommendationsList } from "@/components/recommendations-list";
import { AppMetadataCard } from "@/components/app-metadata-card";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
	const { user, loading: authLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!authLoading && !user) {
			router.push("/login");
		}
	}, [user, authLoading, router]);

	return (
		<div className='flex flex-col gap-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
				<p className='text-muted-foreground'>
					Overview of your app's ASO performance
				</p>
			</div>

			<Tabs
				defaultValue='overview'
				className='space-y-4'
			>
				<TabsList>
					<TabsTrigger value='overview'>Overview</TabsTrigger>
					<TabsTrigger value='keywords'>Keywords</TabsTrigger>
					<TabsTrigger value='competitors'>Competitors</TabsTrigger>
					<TabsTrigger value='recommendations'>Recommendations</TabsTrigger>
				</TabsList>
				<TabsContent
					value='overview'
					className='space-y-4'
				>
					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>
									Visibility Score
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>72/100</div>
								<p className='text-xs text-muted-foreground'>
									+4% from last month
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>
									Keyword Rankings
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>24</div>
								<p className='text-xs text-muted-foreground'>
									3 new rankings this week
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>
									App Rating
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>4.7</div>
								<p className='text-xs text-muted-foreground'>
									Based on 1,204 reviews
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>
									Competitor Score
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>68/100</div>
								<p className='text-xs text-muted-foreground'>
									You're ahead by 4 points
								</p>
							</CardContent>
						</Card>
					</div>
					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
						<Card className='lg:col-span-4'>
							<CardHeader>
								<CardTitle>Visibility Score Trend</CardTitle>
								<CardDescription>
									Your app's visibility score over time
								</CardDescription>
							</CardHeader>
							<CardContent>
								<VisibilityScoreChart />
							</CardContent>
						</Card>
						<Card className='lg:col-span-3'>
							<CardHeader>
								<CardTitle>App Metadata</CardTitle>
								<CardDescription>Current metadata for your app</CardDescription>
							</CardHeader>
							<CardContent>
								<AppMetadataCard />
							</CardContent>
						</Card>
					</div>
				</TabsContent>
				<TabsContent
					value='keywords'
					className='space-y-4'
				>
					<Card>
						<CardHeader>
							<CardTitle>Keyword Rankings</CardTitle>
							<CardDescription>
								Your app's current keyword rankings
							</CardDescription>
						</CardHeader>
						<CardContent>
							<KeywordRankingsTable />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent
					value='competitors'
					className='space-y-4'
				>
					<Card>
						<CardHeader>
							<CardTitle>Competitor Analysis</CardTitle>
							<CardDescription>
								Compare your app with competitors
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className='text-sm text-muted-foreground mb-4'>
								Add up to 3 competitors to compare your app's performance
							</p>
							<div className='flex flex-col gap-4'>
								<div className='rounded-md border p-4'>
									<p className='text-sm font-medium mb-2'>
										No competitors added yet
									</p>
									<p className='text-sm text-muted-foreground mb-4'>
										Add competitor apps to see how your app compares
									</p>
									<div className='flex justify-start'>
										<button className='text-sm text-primary underline underline-offset-4'>
											+ Add competitor
										</button>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent
					value='recommendations'
					className='space-y-4'
				>
					<Card>
						<CardHeader>
							<CardTitle>AI-Powered Recommendations</CardTitle>
							<CardDescription>
								Actionable insights to improve your app's ASO
							</CardDescription>
						</CardHeader>
						<CardContent>
							<RecommendationsList />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
