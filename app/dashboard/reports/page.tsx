/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, FileText, Plus } from "lucide-react";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/loading-spinner";
import { EmptyState } from "@/components/empty-state";
import { getUserReports, getUserApps } from "@/lib/firestore";
import type { Report, AppMetadata } from "@/types/app-data";

export default function ReportsPage() {
	const { toast } = useToast();
	const { user } = useAuth();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [reports, setReports] = useState<Report[]>([]);
	const [apps, setApps] = useState<Record<string, AppMetadata>>({});

	useEffect(() => {
		async function fetchData() {
			if (!user) return;

			try {
				setIsLoading(true);

				// Fetch user's reports
				const userReports = await getUserReports(user.uid);
				setReports(userReports);

				// Fetch app data for each report
				if (userReports.length > 0) {
					// Removed unused variable 'appIds'
					const appsData = await Promise.all([getUserApps(user.uid)]);

					// Create a map of app ID to app data
					const appsMap: Record<string, AppMetadata> = {};
					appsData.flat().forEach((app) => {
						appsMap[app.id] = app;
					});

					setApps(appsMap);
				}
			} catch (error: any) {
				toast({
					title: "Error loading reports",
					description: error.message || "Failed to load reports data",
					variant: "destructive",
				});
			} finally {
				setIsLoading(false);
			}
		}

		fetchData();
	}, [user]);

	const handleGenerateReport = () => {
		router.push("/dashboard");
	};

	const handleDownloadReport = (report: Report) => {
		// In a real app, this would download the report from the URL
		toast({
			title: "Downloading report",
			description: `Downloading ${report.title}...`,
		});

		// If there's a URL, open it in a new tab
		if (report.url) {
			window.open(report.url, "_blank");
		}
	};

	if (isLoading) {
		return (
			<div className='flex h-full items-center justify-center min-h-[400px]'>
				<LoadingSpinner className='h-8 w-8' />
			</div>
		);
	}

	if (reports.length === 0) {
		return (
			<div className='flex flex-col gap-6'>
				<div className='flex items-center justify-between'>
					<div>
						<h1 className='text-3xl font-bold tracking-tight'>Reports</h1>
						<p className='text-muted-foreground'>
							View and download metadata optimization reports
						</p>
					</div>
					<Button onClick={handleGenerateReport}>
						<Plus className='mr-2 h-4 w-4' />
						Generate Report
					</Button>
				</div>

				<EmptyState
					title='No reports generated yet'
					description="Generate a report to get a detailed analysis of your app's metadata optimization."
					action={
						<Button onClick={handleGenerateReport}>
							<Plus className='mr-2 h-4 w-4' />
							Generate Report
						</Button>
					}
					icon={<FileText className='h-10 w-10 text-muted-foreground' />}
				/>
			</div>
		);
	}

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>Reports</h1>
					<p className='text-muted-foreground'>
						View and download metadata optimization reports
					</p>
				</div>
			</div>

			<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{reports.map((report) => (
					<Card key={report.id}>
						<CardHeader>
							<CardTitle className='flex items-center gap-2'>
								<FileText className='h-5 w-5' />
								{report.title}
							</CardTitle>
							<CardDescription>
								Generated on {new Date(report.date).toLocaleDateString()}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								<div className='text-sm'>
									<div className='font-medium'>App:</div>
									<div>{apps[report.appId]?.name || "Unknown App"}</div>
								</div>
								<div className='text-sm'>
									<div className='font-medium'>Type:</div>
									<div className='capitalize'>Metadata Optimization Report</div>
								</div>
								<Button
									variant='outline'
									className='w-full gap-2'
									onClick={() => handleDownloadReport(report)}
								>
									<Download className='h-4 w-4' />
									Download PDF
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
