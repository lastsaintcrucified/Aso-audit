/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { ArrowRight, BarChart3, Smartphone, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className='flex min-h-screen flex-col'>
			<header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
				<div className='container flex h-16 items-center justify-between'>
					<div className='flex items-center gap-2 font-bold text-xl'>
						<BarChart3 className='h-6 w-6 text-primary' />
						<span>iOS Metadata Optimizer</span>
					</div>
					<nav className='hidden md:flex items-center gap-6'>
						<Link
							href='#features'
							className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
						>
							Features
						</Link>
						<Link
							href='#how-it-works'
							className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
						>
							How It Works
						</Link>
					</nav>
					<div className='flex items-center gap-4'>
						<Link href='/login'>
							<Button
								variant='ghost'
								size='sm'
							>
								Log in
							</Button>
						</Link>
						<Link href='/signup'>
							<Button size='sm'>Sign up</Button>
						</Link>
					</div>
				</div>
			</header>
			<main className='flex-1'>
				<section className='w-full py-12 '>
					<div className='container px-4 md:px-6'>
						<div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
							<div className='flex flex-col justify-center space-y-4'>
								<div className='space-y-2'>
									<h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
										Optimize Your iOS App's Metadata with AI
									</h1>
									<p className='max-w-[600px] text-muted-foreground md:text-xl'>
										Get AI-powered suggestions for your app's title, subtitle,
										and description to improve visibility and rankings in the
										App Store.
									</p>
								</div>
								<div className='flex flex-col gap-2 min-[400px]:flex-row'>
									<Link href='/signup'>
										<Button
											size='lg'
											className='gap-1.5'
										>
											Get Started
											<ArrowRight className='h-4 w-4' />
										</Button>
									</Link>
									<Link href='#how-it-works'>
										<Button
											size='lg'
											variant='outline'
										>
											Learn More
										</Button>
									</Link>
								</div>
							</div>
							<div className='flex items-center justify-center'>
								<div className='relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-b from-primary/20 to-primary/10 p-4'>
									<div className='bg-background rounded-lg shadow-lg p-6 h-full flex flex-col'>
										<div className='flex items-center justify-between mb-6'>
											<h3 className='text-lg font-semibold'>
												Metadata Optimization
											</h3>
											<span className='text-sm text-muted-foreground'>
												Demo
											</span>
										</div>
										<div className='space-y-6'>
											<div className='space-y-2'>
												<div className='flex items-center justify-between'>
													<h4 className='text-sm font-medium'>
														Original Title
													</h4>
													<span className='text-xs text-muted-foreground'>
														24/30
													</span>
												</div>
												<div className='bg-muted/50 rounded-md p-3 text-sm'>
													Task Manager - To Do List
												</div>
											</div>

											<div className='space-y-2'>
												<div className='flex items-center justify-between'>
													<h4 className='text-sm font-medium'>
														AI-Optimized Title
													</h4>
													<span className='text-xs text-green-500'>28/30</span>
												</div>
												<div className='bg-primary/10 border border-primary/20 rounded-md p-3 text-sm'>
													TaskMaster Pro: To-Do & Planner
													<div className='flex items-center mt-2 text-xs text-primary'>
														<Sparkles className='h-3 w-3 mr-1' />
														<span>Optimized for better visibility</span>
													</div>
												</div>
											</div>

											<div className='space-y-2'>
												<div className='flex items-center justify-between'>
													<h4 className='text-sm font-medium'>
														Original Subtitle
													</h4>
													<span className='text-xs text-muted-foreground'>
														18/30
													</span>
												</div>
												<div className='bg-muted/50 rounded-md p-3 text-sm'>
													Simple task manager
												</div>
											</div>

											<div className='space-y-2'>
												<div className='flex items-center justify-between'>
													<h4 className='text-sm font-medium'>
														AI-Optimized Subtitle
													</h4>
													<span className='text-xs text-green-500'>29/30</span>
												</div>
												<div className='bg-primary/10 border border-primary/20 rounded-md p-3 text-sm'>
													Productivity & Time Management
													<div className='flex items-center mt-2 text-xs text-primary'>
														<Sparkles className='h-3 w-3 mr-1' />
														<span>Added relevant keywords</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section
					id='features'
					className='w-full py-12 md:py-24 lg:py-32 bg-muted/40'
				>
					<div className='container px-4 md:px-6'>
						<div className='flex flex-col items-center justify-center space-y-4 text-center'>
							<div className='space-y-2'>
								<div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>
									Features
								</div>
								<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
									AI-Powered Metadata Optimization
								</h2>
								<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
									Our tool helps you create App Store metadata that ranks higher
									and converts better
								</p>
							</div>
						</div>
						<div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3'>
							<div className='flex flex-col items-center space-y-4 rounded-lg border p-6'>
								<div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
									<Sparkles className='h-8 w-8 text-primary' />
								</div>
								<h3 className='text-xl font-bold'>AI-Powered Suggestions</h3>
								<p className='text-center text-muted-foreground'>
									Get intelligent recommendations for your app's title,
									subtitle, and description
								</p>
							</div>
							<div className='flex flex-col items-center space-y-4 rounded-lg border p-6'>
								<div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
									<Smartphone className='h-8 w-8 text-primary' />
								</div>
								<h3 className='text-xl font-bold'>App Store Optimized</h3>
								<p className='text-center text-muted-foreground'>
									Specifically designed for iOS App Store metadata requirements
								</p>
							</div>
							<div className='flex flex-col items-center space-y-4 rounded-lg border p-6'>
								<div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
									<BarChart3 className='h-8 w-8 text-primary' />
								</div>
								<h3 className='text-xl font-bold'>Version History</h3>
								<p className='text-center text-muted-foreground'>
									Keep track of all your optimization attempts and compare
									results
								</p>
							</div>
						</div>
					</div>
				</section>
				<section
					id='how-it-works'
					className='w-full py-12 md:py-24 lg:py-32'
				>
					<div className='container px-4 md:px-6'>
						<div className='flex flex-col items-center justify-center space-y-4 text-center'>
							<div className='space-y-2'>
								<div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>
									How It Works
								</div>
								<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
									Simple 3-Step Process
								</h2>
								<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
									Get optimized metadata in minutes with our streamlined
									workflow
								</p>
							</div>
						</div>
						<div className='mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3'>
							<div className='flex flex-col items-center space-y-4'>
								<div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white'>
									1
								</div>
								<h3 className='text-xl font-bold'>Enter App Details</h3>
								<p className='text-center text-muted-foreground'>
									Input your app's current title, subtitle, and description
								</p>
							</div>
							<div className='flex flex-col items-center space-y-4'>
								<div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white'>
									2
								</div>
								<h3 className='text-xl font-bold'>AI Optimization</h3>
								<p className='text-center text-muted-foreground'>
									Our AI analyzes your metadata and generates optimized versions
								</p>
							</div>
							<div className='flex flex-col items-center space-y-4'>
								<div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white'>
									3
								</div>
								<h3 className='text-xl font-bold'>Update Your App</h3>
								<p className='text-center text-muted-foreground'>
									Copy the optimized metadata and update your App Store listing
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className='w-full border-t py-6 md:py-0'>
				<div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
					<div className='flex items-center gap-2 font-bold'>
						<BarChart3 className='h-5 w-5 text-primary' />
						<span>iOS Metadata Optimizer</span>
					</div>
					<p className='text-center text-sm leading-loose text-muted-foreground md:text-left'>
						© 2025 iOS Metadata Optimizer. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
