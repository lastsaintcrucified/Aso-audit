"use client";

import React from "react";

import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface RankingData {
	overallRank: number;
	categoryRank: number;
	ratingScore: number;
	reviewCount: number;
	keywordRankings: {
		keyword: string;
		rank: number;
		change: number;
	}[];
}

interface AppRankingsComparisonProps {
	mainApp: {
		name: string;
		rankings: RankingData;
	};
	competitorApp: {
		name: string;
		rankings: RankingData;
	};
}

export function AppRankingsComparison({
	mainApp,
	competitorApp,
}: AppRankingsComparisonProps) {
	// Helper function to determine which app is performing better for a metric
	const compareMetric = (
		mainValue: number,
		competitorValue: number,
		lowerIsBetter = true
	) => {
		if (mainValue === competitorValue) return "equal";
		return lowerIsBetter
			? mainValue < competitorValue
				? "main"
				: "competitor"
			: mainValue > competitorValue
			? "main"
			: "competitor";
	};

	// Helper function to render change indicator
	const renderChangeIndicator = (change: number) => {
		if (change > 0) {
			return (
				<div className='flex items-center text-green-500'>
					<ArrowUp className='h-4 w-4 mr-1' />
					<span>{change}</span>
				</div>
			);
		} else if (change < 0) {
			return (
				<div className='flex items-center text-red-500'>
					<ArrowDown className='h-4 w-4 mr-1' />
					<span>{Math.abs(change)}</span>
				</div>
			);
		} else {
			return (
				<div className='flex items-center text-muted-foreground'>
					<Minus className='h-4 w-4 mr-1' />
					<span>0</span>
				</div>
			);
		}
	};

	return (
		<div className='space-y-6'>
			<Card>
				<CardHeader>
					<CardTitle>App Store Rankings</CardTitle>
					<CardDescription>
						Compare app rankings and visibility metrics
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='grid grid-cols-3 gap-4'>
						<div className='col-span-1 font-medium'>Metric</div>
						<div className='col-span-1 font-medium text-center'>
							{mainApp.name}
						</div>
						<div className='col-span-1 font-medium text-center'>
							{competitorApp.name}
						</div>

						{/* Overall Rank */}
						<div className='col-span-1'>Overall Rank</div>
						<div
							className={`col-span-1 text-center font-semibold ${
								compareMetric(
									mainApp.rankings.overallRank,
									competitorApp.rankings.overallRank
								) === "main"
									? "text-green-500"
									: ""
							}`}
						>
							#{mainApp.rankings.overallRank.toLocaleString()}
						</div>
						<div
							className={`col-span-1 text-center font-semibold ${
								compareMetric(
									mainApp.rankings.overallRank,
									competitorApp.rankings.overallRank
								) === "competitor"
									? "text-green-500"
									: ""
							}`}
						>
							#{competitorApp.rankings.overallRank.toLocaleString()}
						</div>

						{/* Category Rank */}
						<div className='col-span-1'>Category Rank</div>
						<div
							className={`col-span-1 text-center font-semibold ${
								compareMetric(
									mainApp.rankings.categoryRank,
									competitorApp.rankings.categoryRank
								) === "main"
									? "text-green-500"
									: ""
							}`}
						>
							#{mainApp.rankings.categoryRank.toLocaleString()}
						</div>
						<div
							className={`col-span-1 text-center font-semibold ${
								compareMetric(
									mainApp.rankings.categoryRank,
									competitorApp.rankings.categoryRank
								) === "competitor"
									? "text-green-500"
									: ""
							}`}
						>
							#{competitorApp.rankings.categoryRank.toLocaleString()}
						</div>

						{/* Rating Score */}
						<div className='col-span-1'>Rating Score</div>
						<div
							className={`col-span-1 text-center font-semibold ${
								compareMetric(
									mainApp.rankings.ratingScore,
									competitorApp.rankings.ratingScore,
									false
								) === "main"
									? "text-green-500"
									: ""
							}`}
						>
							{mainApp.rankings.ratingScore.toFixed(1)}
							<div className='w-full mt-1'>
								<Progress
									value={(mainApp.rankings.ratingScore / 5) * 100}
									className='h-2'
								/>
							</div>
						</div>
						<div
							className={`col-span-1 text-center font-semibold ${
								compareMetric(
									mainApp.rankings.ratingScore,
									competitorApp.rankings.ratingScore,
									false
								) === "competitor"
									? "text-green-500"
									: ""
							}`}
						>
							{competitorApp.rankings.ratingScore.toFixed(1)}
							<div className='w-full mt-1'>
								<Progress
									value={(competitorApp.rankings.ratingScore / 5) * 100}
									className='h-2'
								/>
							</div>
						</div>

						{/* Review Count */}
						<div className='col-span-1'>Review Count</div>
						<div
							className={`col-span-1 text-center font-semibold ${
								compareMetric(
									mainApp.rankings.reviewCount,
									competitorApp.rankings.reviewCount,
									false
								) === "main"
									? "text-green-500"
									: ""
							}`}
						>
							{mainApp.rankings.reviewCount.toLocaleString()}
						</div>
						<div
							className={`col-span-1 text-center font-semibold ${
								compareMetric(
									mainApp.rankings.reviewCount,
									competitorApp.rankings.reviewCount,
									false
								) === "competitor"
									? "text-green-500"
									: ""
							}`}
						>
							{competitorApp.rankings.reviewCount.toLocaleString()}
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Keyword Rankings</CardTitle>
					<CardDescription>
						Compare keyword positions in App Store search results
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='grid grid-cols-7 gap-4'>
						<div className='col-span-3 font-medium'>Keyword</div>
						<div className='col-span-2 font-medium text-center'>
							{mainApp.name}
						</div>
						<div className='col-span-2 font-medium text-center'>
							{competitorApp.name}
						</div>

						{mainApp.rankings.keywordRankings.map((keyword, index) => {
							const competitorKeyword =
								competitorApp.rankings.keywordRankings.find(
									(k) => k.keyword === keyword.keyword
								) || { keyword: keyword.keyword, rank: 0, change: 0 };

							return (
								<React.Fragment key={keyword.keyword}>
									<div className='col-span-3 flex items-center'>
										<Badge
											variant='outline'
											className='mr-2'
										>
											{index + 1}
										</Badge>
										{keyword.keyword}
									</div>
									<div className='col-span-1 text-center font-semibold'>
										{keyword.rank > 0 ? `#${keyword.rank}` : "-"}
									</div>
									<div className='col-span-1 text-center'>
										{renderChangeIndicator(keyword.change)}
									</div>
									<div className='col-span-1 text-center font-semibold'>
										{competitorKeyword.rank > 0
											? `#${competitorKeyword.rank}`
											: "-"}
									</div>
									<div className='col-span-1 text-center'>
										{renderChangeIndicator(competitorKeyword.change)}
									</div>
								</React.Fragment>
							);
						})}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
