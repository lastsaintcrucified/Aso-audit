/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Smartphone } from "lucide-react";
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
import { useToast } from "@/components/ui/use-toast";
import { AppMetadataCard } from "@/components/app-metadata-card";
import { saveAppFromUrl } from "@/app/actions/save-app";
import type { AppMetadata } from "@/types/app-data";
import { fetchAppMetadata } from "@/app/actions/fetch-app-metadata";

export default function NewAppPage() {
	const { toast } = useToast();
	const { user } = useAuth();
	const router = useRouter();
	const [isFetching, setIsFetching] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [appUrl, setAppUrl] = useState("");
	const [appMetadata, setAppMetadata] = useState<AppMetadata | null>(null);

	const handleFetchMetadata = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!user) {
			toast({
				title: "Authentication required",
				description: "Please sign in to add an app",
				variant: "destructive",
			});
			return;
		}

		if (!appUrl) {
			toast({
				title: "App Store URL required",
				description: "Please enter the URL of your iOS app",
				variant: "destructive",
			});
			return;
		}

		// Validate the URL format
		if (!appUrl.includes("apps.apple.com")) {
			toast({
				title: "Invalid App Store URL",
				description: "Please enter a valid iOS App Store URL",
				variant: "destructive",
			});
			return;
		}

		setIsFetching(true);

		try {
			const metadata = await fetchAppMetadata(appUrl);
			// console.log("Fetched metadata:", metadata);
			setAppMetadata(metadata);
			toast({
				title: "Metadata fetched successfully",
				description: "Review the app details and click 'Add App' to save",
			});
		} catch (error: any) {
			toast({
				title: "Error fetching metadata",
				description: error.message || "Failed to fetch app metadata",
				variant: "destructive",
			});
		} finally {
			setIsFetching(false);
		}
	};

	const handleSaveApp = async () => {
		if (!user || !appMetadata) return;

		setIsSaving(true);

		try {
			const savedApp = await saveAppFromUrl(appUrl, user.uid);

			toast({
				title: "App added successfully",
				description: "Your app has been added and is ready for optimization",
			});

			router.push(`/dashboard/apps/${savedApp.id}`);
		} catch (error: any) {
			toast({
				title: "Error adding app",
				description: error.message || "Failed to add your app",
				variant: "destructive",
			});
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<div className='flex flex-col gap-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Add New iOS App</h1>
				<p className='text-muted-foreground'>
					Enter your App Store URL to automatically fetch your app's metadata
				</p>
			</div>

			<Card>
				<form onSubmit={handleFetchMetadata}>
					<CardHeader>
						<CardTitle>iOS App Store URL</CardTitle>
						<CardDescription>
							Enter the URL of your app from the App Store to automatically
							fetch its metadata
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='app-url'>App Store URL</Label>
							<div className='flex gap-2'>
								<Input
									id='app-url'
									placeholder='https://apps.apple.com/us/app/your-app-id'
									value={appUrl}
									onChange={(e) => setAppUrl(e.target.value)}
									className='flex-1'
								/>
								<Button
									type='submit'
									disabled={isFetching || !appUrl}
								>
									{isFetching ? (
										<strong>....Fetching</strong>
									) : (
										<>
											<Smartphone className='h-4 w-4' />
											<span className='ml-2'>Fetch Metadata</span>
										</>
									)}
								</Button>
							</div>
							<p className='text-xs text-muted-foreground'>
								Example: https://apps.apple.com/us/app/instagram/id389801252
							</p>
						</div>
					</CardContent>
				</form>
			</Card>

			{appMetadata && (
				<Card>
					<CardHeader>
						<CardTitle>App Preview</CardTitle>
						<CardDescription>
							Review your app's metadata before adding it to your dashboard
						</CardDescription>
					</CardHeader>
					<CardContent>
						<AppMetadataCard app={appMetadata} />
					</CardContent>
					<CardFooter className='flex justify-end'>
						<Button
							onClick={handleSaveApp}
							disabled={isSaving}
							className='gap-1'
						>
							{isSaving ? (
								<>Adding App...</>
							) : (
								<>
									Add App
									<ArrowRight className='h-4 w-4' />
								</>
							)}
						</Button>
					</CardFooter>
				</Card>
			)}
		</div>
	);
}
