"use client";

import type { AppMetadata } from "@/types/app-data";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Info, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppMetadataCardProps {
	app: AppMetadata;
}

export function AppMetadataCard({ app }: AppMetadataCardProps) {
	return (
		<div className='space-y-4'>
			<div className='flex items-start gap-4'>
				<div className='h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden'>
					{app.iconUrl ? (
						<img
							src={app.iconUrl || "/placeholder.svg?height=80&width=80"}
							alt={app.name}
							className='h-full w-full object-cover'
						/>
					) : (
						<span className='text-2xl font-bold text-primary'>
							{app.name.charAt(0)}
						</span>
					)}
				</div>
				<div className='flex-1'>
					<h3 className='font-semibold text-lg'>{app.name}</h3>
					<p className='text-sm text-muted-foreground'>{app.subtitle}</p>
					<div className='flex items-center gap-2 mt-1'>
						<Badge
							variant='outline'
							className='h-5 px-1.5'
						>
							iOS
						</Badge>
						<span className='text-xs text-muted-foreground'>
							{app.category}
						</span>
					</div>
				</div>
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<div className='space-y-3'>
					<div className='flex items-center gap-2 text-sm'>
						<User className='h-4 w-4 text-muted-foreground' />
						<span className='text-muted-foreground'>Developer:</span>
						<span className='font-medium truncate'>
							{app.developer || "Unknown"}
						</span>
					</div>

					<div className='flex items-center gap-2 text-sm'>
						<Star className='h-4 w-4 text-yellow-500' />
						<span className='text-muted-foreground'>Rating:</span>
						<span className='font-medium'>
							{app.rating?.toFixed(1) || "N/A"}
						</span>
						<span className='text-xs text-muted-foreground'>
							({app.reviewCount?.toLocaleString() || 0} reviews)
						</span>
					</div>

					<div className='flex items-center gap-2 text-sm'>
						<Calendar className='h-4 w-4 text-muted-foreground' />
						<span className='text-muted-foreground'>Updated:</span>
						<span className='font-medium'>
							{app.lastUpdated
								? new Date(app.lastUpdated).toLocaleDateString()
								: "Unknown"}
						</span>
					</div>

					<div className='flex items-center gap-2 text-sm'>
						<Info className='h-4 w-4 text-muted-foreground' />
						<span className='text-muted-foreground'>Version:</span>
						<span className='font-medium'>{app.version || "Unknown"}</span>
						<span className='text-xs text-muted-foreground'>
							({app.size || "Unknown"})
						</span>
					</div>
				</div>

				<div className='space-y-3'>
					<div className='text-sm'>
						<div className='font-medium mb-1'>App Store Link</div>
						<Button
							variant='outline'
							size='sm'
							className='w-full text-xs h-8 gap-1'
							onClick={() => window.open(app.appStoreUrl, "_blank")}
						>
							<ExternalLink className='h-3.5 w-3.5' />
							View on App Store
						</Button>
					</div>

					<div className='text-sm'>
						<div className='font-medium mb-1'>Price</div>
						<div className='text-sm'>{app.price || "Free"}</div>
					</div>

					<div className='text-sm'>
						<div className='font-medium mb-1'>Metadata Status</div>
						<Badge
							variant='outline'
							className='bg-yellow-50'
						>
							Ready for Optimization
						</Badge>
					</div>
				</div>
			</div>

			<div>
				<p className='text-sm font-medium mb-1'>Description Preview</p>
				<p className='text-xs text-muted-foreground line-clamp-3'>
					{app.description}
				</p>
			</div>

			{app.screenshotUrls && app.screenshotUrls.length > 0 && (
				<div>
					<p className='text-sm font-medium mb-1'>App Store Screenshots</p>
					<div className='flex gap-2 overflow-x-auto pb-2'>
						{app.screenshotUrls.slice(0, 3).map((screenshot, index) => (
							<img
								key={index}
								src={screenshot || "/placeholder.svg?height=96&width=48"}
								alt={`Screenshot ${index + 1}`}
								className='h-24 w-auto rounded-md object-cover border'
							/>
						))}
						{app.screenshotUrls.length > 3 && (
							<div className='flex h-24 w-16 items-center justify-center rounded-md bg-muted'>
								<span className='text-sm text-muted-foreground'>
									+{app.screenshotUrls.length - 3}
								</span>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
