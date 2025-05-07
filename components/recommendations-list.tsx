"use client";

import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Recommendation } from "@/types/app-data";

interface RecommendationsListProps {
	recommendations: Recommendation[];
}

export function RecommendationsList({
	recommendations = [],
}: RecommendationsListProps) {
	// Sort recommendations by impact
	const sortedRecommendations = [...recommendations].sort((a, b) => {
		const impactValue = { High: 3, Medium: 2, Low: 1 };
		// Sort by impact value
		return impactValue[b.impact] - impactValue[a.impact];
	});

	return (
		<div className='space-y-4'>
			{sortedRecommendations.length > 0 ? (
				sortedRecommendations.map((recommendation) => (
					<Card key={recommendation.id}>
						<CardHeader className='pb-2'>
							<div className='flex items-start justify-between'>
								<div className='space-y-1'>
									<CardTitle className='text-base'>
										{recommendation.title}
									</CardTitle>
									<CardDescription>
										{recommendation.description}
									</CardDescription>
								</div>
								<Badge
									variant={
										recommendation.impact === "High" ? "destructive" : "outline"
									}
								>
									{recommendation.impact} Impact
								</Badge>
							</div>
						</CardHeader>
						<CardFooter className='pt-2 flex justify-between items-center'>
							<Badge variant='secondary'>{recommendation.category}</Badge>
							<Button
								variant='ghost'
								size='sm'
								className='gap-1'
							>
								<span>Implement</span>
								<ChevronRight className='h-4 w-4' />
							</Button>
						</CardFooter>
					</Card>
				))
			) : (
				<div className='text-center py-8'>
					<p className='text-muted-foreground'>
						No recommendations available yet.
					</p>
				</div>
			)}
		</div>
	);
}
