/* eslint-disable react/no-unescaped-entities */
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { KeywordRankingsTable } from "@/components/keyword-rankings-table";
import { KeywordOpportunities } from "@/components/keyword-opportunities";

export default function KeywordsPage() {
	return (
		<div className='flex flex-col gap-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Keywords</h1>
				<p className='text-muted-foreground'>
					Analyze and optimize your app's keyword rankings
				</p>
			</div>

			<div className='grid gap-6 md:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle>Current Rankings</CardTitle>
						<CardDescription>
							Your app's current keyword rankings
						</CardDescription>
					</CardHeader>
					<CardContent>
						<KeywordRankingsTable
							keywords={[
								{
									keyword: "productivity app",
									rank: 12,
									change: 3,
									volume: "High",
									difficulty: "Medium",
								},
								{
									keyword: "task manager",
									rank: 8,
									change: -2,
									volume: "High",
									difficulty: "High",
								},
								{
									keyword: "to-do list",
									rank: 15,
									change: 5,
									volume: "Medium",
									difficulty: "Medium",
								},
								{
									keyword: "project management",
									rank: 24,
									change: 0,
									volume: "High",
									difficulty: "High",
								},
								{
									keyword: "time tracking",
									rank: 18,
									change: 2,
									volume: "Medium",
									difficulty: "Low",
								},
							]}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Keyword Opportunities</CardTitle>
						<CardDescription>
							Suggested keywords to improve your visibility
						</CardDescription>
					</CardHeader>
					<CardContent>
						<KeywordOpportunities />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
