"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const opportunityData = [
	{
		keyword: "mobile organizer",
		volume: "High",
		difficulty: "Medium",
		relevance: "High",
	},
	{
		keyword: "daily planner app",
		volume: "High",
		difficulty: "High",
		relevance: "High",
	},
	{
		keyword: "work efficiency",
		volume: "Medium",
		difficulty: "Low",
		relevance: "Medium",
	},
	{
		keyword: "task reminder",
		volume: "Medium",
		difficulty: "Medium",
		relevance: "High",
	},
	{
		keyword: "goal tracker",
		volume: "Low",
		difficulty: "Low",
		relevance: "Medium",
	},
];

export function KeywordOpportunities() {
	return (
		<div className='rounded-md border'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Keyword</TableHead>
						<TableHead className='w-[100px] text-right'>Volume</TableHead>
						<TableHead className='w-[100px] text-right'>Difficulty</TableHead>
						<TableHead className='w-[100px] text-right'>Relevance</TableHead>
						<TableHead className='w-[80px]'></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{opportunityData.map((keyword) => (
						<TableRow key={keyword.keyword}>
							<TableCell className='font-medium'>{keyword.keyword}</TableCell>
							<TableCell className='text-right'>
								<Badge
									variant={
										keyword.volume === "High"
											? "default"
											: keyword.volume === "Medium"
											? "outline"
											: "secondary"
									}
								>
									{keyword.volume}
								</Badge>
							</TableCell>
							<TableCell className='text-right'>
								<Badge
									variant={
										keyword.difficulty === "High"
											? "destructive"
											: keyword.difficulty === "Medium"
											? "outline"
											: "secondary"
									}
								>
									{keyword.difficulty}
								</Badge>
							</TableCell>
							<TableCell className='text-right'>
								<Badge
									variant={
										keyword.relevance === "High"
											? "default"
											: keyword.relevance === "Medium"
											? "outline"
											: "secondary"
									}
								>
									{keyword.relevance}
								</Badge>
							</TableCell>
							<TableCell>
								<Button
									variant='ghost'
									size='icon'
								>
									<Plus className='h-4 w-4' />
									<span className='sr-only'>Add keyword</span>
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
