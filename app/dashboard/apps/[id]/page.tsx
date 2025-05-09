/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Copy, FileText, RefreshCw, ArrowRight } from "lucide-react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { AppMetadataCard } from "@/components/app-metadata-card";

import { getAppMetadata, getAppOptimizationResults } from "@/lib/firestore";
import { optimizeMetadata } from "@/app/actions/optimize-metadata";
import { generateReport } from "@/app/actions/generate-report";
import type { AppMetadata, OptimizationResult } from "@/types/app-data";

export default function AppDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);
	const { toast } = useToast();
	const { user } = useAuth();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [isOptimizing, setIsOptimizing] = useState(false);
	const [app, setApp] = useState<AppMetadata | null>(null);
	const [optimizationResults, setOptimizationResults] = useState<
		OptimizationResult[]
	>([]);
	const [isGeneratingReport, setIsGeneratingReport] = useState(false);

	useEffect(() => {
		async function fetchAppData() {
			if (!user) {
				router.push("/login");
				return;
			}

			try {
				setIsLoading(true);

				// Fetch app data from Firestore
				const appData = await getAppMetadata(id);
				setApp(appData);

				// Fetch optimization results
				const results = await getAppOptimizationResults(id);
				setOptimizationResults(results);
			} catch (error: any) {
				toast({
					title: "Error loading app data",
					description: error.message || "Failed to load app data",
					variant: "destructive",
				});
			} finally {
				setIsLoading(false);
			}
		}

		fetchAppData();
	}, [user, id, router]);

	const handleOptimize = async () => {
		if (!app) return;

		try {
			setIsOptimizing(true);
			const result = await optimizeMetadata(app.id);

			// Add the new result to the list
			setOptimizationResults([result, ...optimizationResults]);

			toast({
				title: "Optimization complete",
				description: "Your app's metadata has been optimized successfully",
			});
		} catch (error: any) {
			toast({
				title: "Optimization failed",
				description: error.message || "Failed to optimize app metadata",
				variant: "destructive",
			});
		} finally {
			setIsOptimizing(false);
		}
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		toast({
			title: "Copied to clipboard",
			description: "The text has been copied to your clipboard",
		});
	};

	const handleGenerateReport = async () => {
		if (!app || !user) return;

		try {
			setIsGeneratingReport(true);
			await generateReport(app.id, user.uid);

			toast({
				title: "Report generated",
				description:
					"Your metadata optimization report has been generated successfully",
			});
			router.push(`/dashboard/reports`);

			// In a real app, you would open the report URL
			// window.open(result.downloadUrl, "_blank")
		} catch (error: any) {
			toast({
				title: "Report generation failed",
				description: error.message || "Failed to generate report",
				variant: "destructive",
			});
		} finally {
			setIsGeneratingReport(false);
		}
	};

	if (isLoading) {
		return (
			<div className='flex h-full items-center justify-center min-h-[400px]'>
				<LoadingSpinner className='h-8 w-8' />
			</div>
		);
	}

	if (!app) {
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
					<h1 className='text-3xl font-bold tracking-tight'>{app.name}</h1>
					<p className='text-muted-foreground'>App Store • {app.category}</p>
				</div>
				<div className='flex gap-2'>
					<Button
						variant='outline'
						onClick={() => router.push(`/dashboard/compare?appId=${app.id}`)}
						className='gap-1'
					>
						<ArrowRight className='h-4 w-4 mr-2' />
						Compare with Competitor
					</Button>
					<Button
						variant='outline'
						onClick={handleGenerateReport}
						disabled={isGeneratingReport || optimizationResults.length === 0}
						className='gap-1'
					>
						{isGeneratingReport ? (
							<>
								<LoadingSpinner className='mr-2' />
								Generating...
							</>
						) : (
							<>
								<FileText className='h-4 w-4 mr-2' />
								Generate Report
							</>
						)}
					</Button>
					<Button
						onClick={handleOptimize}
						disabled={isOptimizing}
						className='gap-1'
					>
						{isOptimizing ? (
							<>
								<LoadingSpinner className='mr-2' />
								Optimizing...
							</>
						) : (
							<>
								<RefreshCw className='h-4 w-4 mr-2' />
								Optimize Metadata
							</>
						)}
					</Button>
				</div>
			</div>

			<Tabs
				defaultValue='overview'
				className='space-y-4'
			>
				<TabsList>
					<TabsTrigger value='overview'>App Overview</TabsTrigger>
					<TabsTrigger value='current'>Current Metadata</TabsTrigger>
					<TabsTrigger value='optimized'>
						Optimized Versions ({optimizationResults.length})
					</TabsTrigger>
				</TabsList>

				<TabsContent value='overview'>
					<Card>
						<CardHeader>
							<CardTitle>App Overview</CardTitle>
							<CardDescription>Details about your iOS app</CardDescription>
						</CardHeader>
						<CardContent>
							<AppMetadataCard app={app} />
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent
					value='current'
					className='space-y-4'
				>
					<Card>
						<CardHeader>
							<CardTitle>Current App Metadata</CardTitle>
							<CardDescription>
								Your app's current metadata in the App Store
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-6'>
							<div className='space-y-2'>
								<div className='flex items-center justify-between'>
									<h3 className='text-lg font-medium'>Title</h3>
									<Button
										variant='ghost'
										size='icon'
										onClick={() => copyToClipboard(app.name)}
									>
										<Copy className='h-4 w-4' />
										<span className='sr-only'>Copy title</span>
									</Button>
								</div>
								<div className='rounded-md border p-4'>
									<p>{app.name}</p>
								</div>
								<p className='text-xs text-muted-foreground text-right'>
									{app.name.length}/30 characters
								</p>
							</div>

							<div className='space-y-2'>
								<div className='flex items-center justify-between'>
									<h3 className='text-lg font-medium'>Subtitle</h3>
									<Button
										variant='ghost'
										size='icon'
										onClick={() => copyToClipboard(app.subtitle)}
									>
										<Copy className='h-4 w-4' />
										<span className='sr-only'>Copy subtitle</span>
									</Button>
								</div>
								<div className='rounded-md border p-4'>
									<p>{app.subtitle}</p>
								</div>
								<p className='text-xs text-muted-foreground text-right'>
									{app.subtitle.length}/30 characters
								</p>
							</div>

							<div className='space-y-2'>
								<div className='flex items-center justify-between'>
									<h3 className='text-lg font-medium'>Description</h3>
									<Button
										variant='ghost'
										size='icon'
										onClick={() => copyToClipboard(app.description)}
									>
										<Copy className='h-4 w-4' />
										<span className='sr-only'>Copy description</span>
									</Button>
								</div>
								<div className='rounded-md border p-4 max-h-[300px] overflow-y-auto'>
									<p className='whitespace-pre-line'>{app.description}</p>
								</div>
								<p className='text-xs text-muted-foreground text-right'>
									{app.description.length}/4000 characters
								</p>
							</div>
						</CardContent>
						<CardFooter>
							<Button
								onClick={handleOptimize}
								disabled={isOptimizing}
								className='w-full gap-1'
							>
								{isOptimizing ? (
									<>
										<LoadingSpinner className='mr-2' />
										Optimizing...
									</>
								) : (
									<>
										<RefreshCw className='h-4 w-4 mr-2' />
										Optimize Metadata
									</>
								)}
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent
					value='optimized'
					className='space-y-4'
				>
					{optimizationResults.length > 0 ? (
						optimizationResults.map((result, index) => (
							<Card
								key={result.id}
								className={index === 0 ? "border-primary" : ""}
							>
								<CardHeader>
									<div className='flex items-center justify-between'>
										<CardTitle>
											Optimized Version {index + 1}
											{index === 0 && (
												<Badge
													variant='default'
													className='ml-2'
												>
													Latest
												</Badge>
											)}
										</CardTitle>
										<p className='text-sm text-muted-foreground'>
											{new Date(result.createdAt).toLocaleString()}
										</p>
									</div>
									<CardDescription>
										AI-optimized metadata for better App Store rankings
									</CardDescription>
								</CardHeader>
								<CardContent className='space-y-6'>
									<div className='space-y-2'>
										<div className='flex items-center justify-between'>
											<h3 className='text-lg font-medium'>Title</h3>
											<Button
												variant='ghost'
												size='icon'
												onClick={() => copyToClipboard(result.optimizedTitle)}
											>
												<Copy className='h-4 w-4' />
												<span className='sr-only'>Copy title</span>
											</Button>
										</div>
										<div className='rounded-md border p-4'>
											<p>{result.optimizedTitle}</p>
										</div>
										<p className='text-xs text-muted-foreground text-right'>
											{result.optimizedTitle.length}/30 characters
										</p>
									</div>

									<div className='space-y-2'>
										<div className='flex items-center justify-between'>
											<h3 className='text-lg font-medium'>Subtitle</h3>
											<Button
												variant='ghost'
												size='icon'
												onClick={() =>
													copyToClipboard(result.optimizedSubtitle)
												}
											>
												<Copy className='h-4 w-4' />
												<span className='sr-only'>Copy subtitle</span>
											</Button>
										</div>
										<div className='rounded-md border p-4'>
											<p>{result.optimizedSubtitle}</p>
										</div>
										<p className='text-xs text-muted-foreground text-right'>
											{result.optimizedSubtitle.length}/30 characters
										</p>
									</div>

									<div className='space-y-2'>
										<div className='flex items-center justify-between'>
											<h3 className='text-lg font-medium'>Description</h3>
											<Button
												variant='ghost'
												size='icon'
												onClick={() =>
													copyToClipboard(result.optimizedDescription)
												}
											>
												<Copy className='h-4 w-4' />
												<span className='sr-only'>Copy description</span>
											</Button>
										</div>
										<div className='rounded-md border p-4 max-h-[300px] overflow-y-auto'>
											<p className='whitespace-pre-line'>
												{result.optimizedDescription}
											</p>
										</div>
										<p className='text-xs text-muted-foreground text-right'>
											{result.optimizedDescription.length}/4000 characters
										</p>
									</div>
								</CardContent>
							</Card>
						))
					) : (
						<div className='flex flex-col items-center justify-center p-8 border rounded-lg'>
							<p className='text-muted-foreground mb-4'>
								No optimized versions yet
							</p>
							<Button
								onClick={handleOptimize}
								disabled={isOptimizing}
							>
								{isOptimizing ? (
									<>
										<LoadingSpinner className='mr-2' />
										Optimizing...
									</>
								) : (
									"Generate Your First Optimization"
								)}
							</Button>
						</div>
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
}
