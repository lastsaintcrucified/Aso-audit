/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import {
	ArrowRight,
	BarChart3,
	CheckCircle,
	LineChart,
	Search,
	Smartphone,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className='flex min-h-screen flex-col'>
			<header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
				<div className='container flex h-16 items-center justify-between'>
					<div className='flex items-center gap-2 font-bold text-xl'>
						<BarChart3 className='h-6 w-6 text-primary' />
						<span>ASO Insight</span>
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
						<Link
							href='#pricing'
							className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
						>
							Pricing
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
				<section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
					<div className='container px-4 md:px-6'>
						<div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
							<div className='flex flex-col justify-center space-y-4'>
								<div className='space-y-2'>
									<h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
										Boost Your App's Visibility in the App Stores
									</h1>
									<p className='max-w-[600px] text-muted-foreground md:text-xl'>
										Analyze your app's ASO performance, compare with
										competitors, and get AI-powered recommendations to improve
										your rankings.
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
												App Analysis Dashboard
											</h3>
											<span className='text-sm text-muted-foreground'>
												Demo
											</span>
										</div>
										<div className='grid grid-cols-2 gap-4 mb-6'>
											<div className='bg-muted/50 rounded-md p-4'>
												<div className='text-sm text-muted-foreground mb-1'>
													Visibility Score
												</div>
												<div className='text-2xl font-bold'>72/100</div>
											</div>
											<div className='bg-muted/50 rounded-md p-4'>
												<div className='text-sm text-muted-foreground mb-1'>
													Keyword Rankings
												</div>
												<div className='text-2xl font-bold'>
													24 <span className='text-sm text-green-500'>↑3</span>
												</div>
											</div>
										</div>
										<div className='bg-muted/30 rounded-md p-4 mb-6'>
											<div className='h-32 flex items-center justify-center'>
												<LineChart className='h-24 w-24 text-primary/40' />
											</div>
										</div>
										<div className='bg-muted/30 rounded-md p-4'>
											<div className='text-sm font-medium mb-2'>
												Top Recommendations
											</div>
											<ul className='space-y-2 text-sm'>
												<li className='flex items-start gap-2'>
													<CheckCircle className='h-4 w-4 text-green-500 mt-0.5' />
													<span>
														Add "productivity" keyword to your app subtitle
													</span>
												</li>
												<li className='flex items-start gap-2'>
													<CheckCircle className='h-4 w-4 text-green-500 mt-0.5' />
													<span>
														Update screenshots to highlight new features
													</span>
												</li>
												<li className='flex items-start gap-2'>
													<CheckCircle className='h-4 w-4 text-green-500 mt-0.5' />
													<span>Respond to recent negative reviews</span>
												</li>
											</ul>
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
									Everything You Need for ASO
								</h2>
								<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
									Our comprehensive toolkit helps you optimize your app's
									presence in the app stores
								</p>
							</div>
						</div>
						<div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3'>
							<div className='flex flex-col items-center space-y-4 rounded-lg border p-6'>
								<div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
									<Search className='h-8 w-8 text-primary' />
								</div>
								<h3 className='text-xl font-bold'>Keyword Analysis</h3>
								<p className='text-center text-muted-foreground'>
									Track your app's keyword rankings and discover new
									opportunities to improve visibility
								</p>
							</div>
							<div className='flex flex-col items-center space-y-4 rounded-lg border p-6'>
								<div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
									<Smartphone className='h-8 w-8 text-primary' />
								</div>
								<h3 className='text-xl font-bold'>Competitor Analysis</h3>
								<p className='text-center text-muted-foreground'>
									Compare your app with up to 3 competitors to identify
									strengths and weaknesses
								</p>
							</div>
							<div className='flex flex-col items-center space-y-4 rounded-lg border p-6'>
								<div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
									<BarChart3 className='h-8 w-8 text-primary' />
								</div>
								<h3 className='text-xl font-bold'>Visibility Score</h3>
								<p className='text-center text-muted-foreground'>
									Get a comprehensive score that measures your app's overall
									visibility in the app stores
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
									Get actionable insights in minutes with our streamlined
									workflow
								</p>
							</div>
						</div>
						<div className='mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3'>
							<div className='flex flex-col items-center space-y-4'>
								<div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white'>
									1
								</div>
								<h3 className='text-xl font-bold'>Enter App URLs</h3>
								<p className='text-center text-muted-foreground'>
									Input your app's iOS/Android links and up to 3 competitors
								</p>
							</div>
							<div className='flex flex-col items-center space-y-4'>
								<div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white'>
									2
								</div>
								<h3 className='text-xl font-bold'>Analyze Data</h3>
								<p className='text-center text-muted-foreground'>
									Our system fetches metadata, compares keywords, and calculates
									visibility scores
								</p>
							</div>
							<div className='flex flex-col items-center space-y-4'>
								<div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white'>
									3
								</div>
								<h3 className='text-xl font-bold'>Get Recommendations</h3>
								<p className='text-center text-muted-foreground'>
									Receive AI-powered suggestions and export a professional
									report
								</p>
							</div>
						</div>
					</div>
				</section>
				<section
					id='pricing'
					className='w-full py-12 md:py-24 lg:py-32 bg-muted/40'
				>
					<div className='container px-4 md:px-6'>
						<div className='flex flex-col items-center justify-center space-y-4 text-center'>
							<div className='space-y-2'>
								<div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>
									Pricing
								</div>
								<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
									Simple, Transparent Pricing
								</h2>
								<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
									Choose the plan that fits your needs
								</p>
							</div>
						</div>
						<div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3'>
							<div className='flex flex-col rounded-lg border bg-background p-6'>
								<div className='space-y-2'>
									<h3 className='text-2xl font-bold'>Starter</h3>
									<p className='text-muted-foreground'>
										Perfect for indie developers
									</p>
								</div>
								<div className='mt-4 flex items-baseline text-3xl font-bold'>
									$29
									<span className='text-sm font-normal text-muted-foreground'>
										/month
									</span>
								</div>
								<ul className='mt-6 space-y-3 text-sm'>
									<li className='flex items-center gap-2'>
										<CheckCircle className='h-4 w-4 text-green-500' />
										<span>1 app analysis</span>
									</li>
									<li className='flex items-center gap-2'>
										<CheckCircle className='h-4 w-4 text-green-500' />
										<span>1 competitor comparison</span>
									</li>
									<li className='flex items-center gap-2'>
										<CheckCircle className='h-4 w-4 text-green-500' />
										<span>Weekly reports</span>
									</li>
									<li className='flex items-center gap-2'>
										<CheckCircle className='h-4 w-4 text-green-500' />
										<span>Basic recommendations</span>
									</li>
								</ul>
								<div className='mt-6'>
									<Link href='/signup'>
										<Button className='w-full'>Get Started</Button>
									</Link>
								</div>
							</div>
							<div className='flex flex-col rounded-lg border bg-background p-6 shadow-lg ring-2 ring-primary'>
								<div className='space-y-2'>
									<div className='inline-flex items-center rounded-full border border-primary bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
										Popular
									</div>
									<h3 className='text-2xl font-bold'>Pro</h3>
									<p className='text-muted-foreground'>
										For growing app businesses
									</p>
								</div>
								<div className='mt-4 flex items-baseline text-3xl font-bold'>
									$79
									<span className='text-sm font-normal text-muted-foreground'>
										/month
									</span>
								</div>
								<ul className='mt-6 space-y-3 text-sm'>
									<li className='flex items-center gap-2'>
										<CheckCircle className='h-4 w-4 text-green-500' />
										<span>5 app analyses</span>
									</li>
									<li className='flex items-center gap-2'>
										<CheckCircle className='h-4 w-4 text-green-500' />
										<span>3 competitor comparisons</span>
									</li>
									<li className='flex items-center gap-2'>
										<CheckCircle className='h-4 w-4 text-green-500' />
										<span>Daily reports</span>
									</li>
									<li className='flex items-center gap-2'>
										<CheckCircle className='h-4 w-4 text-green-500' />
										<span>Advanced AI recommendations</span>
									</li>
									<li className='flex items-center gap-2'>
										<CheckCircle className='h-4 w-4 text-green-500' />
										<span>PDF export</span>
									</li>
								</ul>
								<div className='mt-6'>
									<Link href='/signup'>
										<Button className='w-full'>Get Started</Button>
									</Link>
								</div>
							</div>
							<div className='flex flex-col rounded-lg border bg-background p-6'>
								<div className='space-y-2'>
									<h3 className='text-2xl font-bold'>Enterprise</h3>
									<p className='text-muted-foreground'>
										For large app portfolios
									</p>
								</div>
								<div className='mt-4 flex items-baseline text-3xl font-bold'>
									$199
									<span className='text-sm font-normal text-muted-foreground'>
										/month
									</span>
								</div>
								<ul className='mt-6 space-y-3 text-sm'>
									<li className='flex items-center gap-2'>
										<CheckCircle className='h-4 w-4 text-green-500' />
										<span>Unlimited app analyses</span>
									</li>
									<li className='flex items-center gap-2'>
										<CheckCircle className='h-4 w-4 text-green-500' />
										<span>Unlimited competitor comparisons</span>
									</li>
									<li className='flex items-center gap-2'>
										<CheckCircle className='h-4 w-4 text-green-500' />
										<span>Real-time reports</span>
									</li>
									<li className='flex items-center gap-2'>
										<CheckCircle className='h-4 w-4 text-green-500' />
										<span>Premium AI recommendations</span>
									</li>
									<li className='flex items-center gap-2'>
										<CheckCircle className='h-4 w-4 text-green-500' />
										<span>White-labeled PDF export</span>
									</li>
									<li className='flex items-center gap-2'>
										<CheckCircle className='h-4 w-4 text-green-500' />
										<span>API access</span>
									</li>
								</ul>
								<div className='mt-6'>
									<Link href='/signup'>
										<Button className='w-full'>Contact Sales</Button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className='w-full border-t py-6 md:py-0'>
				<div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
					<div className='flex items-center gap-2 font-bold'>
						<BarChart3 className='h-5 w-5 text-primary' />
						<span>ASO Insight</span>
					</div>
					<p className='text-center text-sm leading-loose text-muted-foreground md:text-left'>
						© 2025 ASO Insight. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
