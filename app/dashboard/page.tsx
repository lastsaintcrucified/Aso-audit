/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Smartphone, Trash2 } from "lucide-react";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/loading-spinner";
import { EmptyState } from "@/components/empty-state";
import { getUserApps, deleteApp } from "@/lib/firestore";
import type { AppMetadata } from "@/types/app-data";

export default function DashboardPage() {
	const { toast } = useToast();
	const { user } = useAuth();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [apps, setApps] = useState<AppMetadata[]>([]);
	const [deletingAppId, setDeletingAppId] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			if (!user) return;

			try {
				setIsLoading(true);
				const userApps = await getUserApps(user.uid);
				setApps(userApps);
			} catch (error: any) {
				toast({
					title: "Error loading apps",
					description: error.message || "Failed to load your apps",
					variant: "destructive",
				});
			} finally {
				setIsLoading(false);
			}
		}

		fetchData();
	}, [user]);

	const handleAddNewApp = () => {
		router.push("/dashboard/new-app");
	};

	const handleViewApp = (appId: string) => {
		router.push(`/dashboard/apps/${appId}`);
	};

	const handleDeleteApp = async (appId: string) => {
		try {
			setDeletingAppId(appId);
			await deleteApp(appId);
			setApps(apps.filter((app) => app.id !== appId));
			toast({
				title: "App deleted",
				description: "The app has been successfully deleted",
			});
		} catch (error: any) {
			toast({
				title: "Error deleting app",
				description: error.message || "Failed to delete the app",
				variant: "destructive",
			});
		} finally {
			setDeletingAppId(null);
		}
	};

	if (isLoading) {
		return (
			<div className='flex h-full items-center justify-center min-h-[400px]'>
				<LoadingSpinner className='h-8 w-8' />
			</div>
		);
	}

	if (apps.length === 0) {
		return (
			<div className='flex flex-col gap-6'>
				<div className='flex items-center justify-between'>
					<div>
						<h1 className='text-3xl font-bold tracking-tight'>My iOS Apps</h1>
						<p className='text-muted-foreground'>
							Optimize your app's metadata for better App Store rankings
						</p>
					</div>
					<Button onClick={handleAddNewApp}>
						<Plus className='mr-2 h-4 w-4' />
						Add New App
					</Button>
				</div>

				<EmptyState
					title='No apps added yet'
					description='Add your first iOS app to start optimizing its metadata.'
					action={
						<Button onClick={handleAddNewApp}>
							<Plus className='mr-2 h-4 w-4' />
							Add New App
						</Button>
					}
					icon={<Smartphone className='h-10 w-10 text-muted-foreground' />}
				/>
			</div>
		);
	}

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>My iOS Apps</h1>
					<p className='text-muted-foreground'>
						Optimize your app's metadata for better App Store rankings
					</p>
				</div>
				<Button onClick={handleAddNewApp}>
					<Plus className='mr-2 h-4 w-4' />
					Add New App
				</Button>
			</div>

			<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{apps.map((app) => (
					<Card
						key={app.id}
						className='overflow-hidden'
					>
						<CardHeader className='pb-2'>
							<CardTitle className='truncate'>{app.name}</CardTitle>
						</CardHeader>
						<CardContent className='pb-2'>
							<p className='text-sm text-muted-foreground mb-2 line-clamp-1'>
								{app.subtitle}
							</p>
							<p className='text-sm text-muted-foreground line-clamp-3'>
								{app.description}
							</p>
						</CardContent>
						<CardFooter className='flex justify-between pt-2'>
							<Button
								variant='outline'
								size='sm'
								onClick={() => handleViewApp(app.id)}
							>
								View Details
							</Button>
							<Button
								variant='ghost'
								size='icon'
								className='text-destructive hover:text-destructive'
								onClick={() => handleDeleteApp(app.id)}
								disabled={deletingAppId === app.id}
							>
								{deletingAppId === app.id ? (
									<LoadingSpinner className='h-4 w-4' />
								) : (
									<Trash2 className='h-4 w-4' />
								)}
								<span className='sr-only'>Delete</span>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
