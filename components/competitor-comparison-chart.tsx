"use client";

import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface CompetitorComparisonChartProps {
	mainApp?: string;
	competitors?: string[];
	scores?: Record<string, number>;
}

export function CompetitorComparisonChart({
	mainApp = "Your App",
	competitors = ["Competitor 1", "Competitor 2"],
	scores,
}: CompetitorComparisonChartProps) {
	// Generate chart data from props or use mock data if not provided
	const generateChartData = () => {
		if (scores) {
			// If real scores are provided, use them
			return [
				{
					category: "Visibility Score",
					[mainApp]: scores[mainApp] || 0,
					...competitors.reduce((acc, competitor) => {
						acc[competitor] = scores[competitor] || 0;
						return acc;
					}, {} as Record<string, number>),
				},
			];
		}

		// Otherwise use mock data
		return [
			{
				category: "Visibility Score",
				[mainApp]: 72,
				[competitors[0] || "Competitor 1"]: 65,
				[competitors[1] || "Competitor 2"]: 78,
			},
			{
				category: "Keyword Count",
				[mainApp]: 24,
				[competitors[0] || "Competitor 1"]: 18,
				[competitors[1] || "Competitor 2"]: 32,
			},
			{
				category: "Rating",
				[mainApp]: 4.7,
				[competitors[0] || "Competitor 1"]: 4.2,
				[competitors[1] || "Competitor 2"]: 4.8,
			},
			{
				category: "Reviews",
				[mainApp]: 1204,
				[competitors[0] || "Competitor 1"]: 875,
				[competitors[1] || "Competitor 2"]: 3250,
			},
		];
	};

	const chartData = generateChartData();
	const allApps = [mainApp, ...competitors];

	return (
		<div className='h-[400px] w-full'>
			<ResponsiveContainer
				width='100%'
				height='100%'
			>
				<BarChart
					data={chartData}
					margin={{
						top: 20,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='category' />
					<YAxis />
					<Tooltip />
					<Legend />
					{allApps.map((app, index) => (
						<Bar
							key={app}
							dataKey={app}
							fill={
								index === 0
									? "hsl(var(--primary))"
									: `hsl(var(--${index === 1 ? "secondary" : "accent"}))`
							}
						/>
					))}
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
