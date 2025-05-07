/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BarChart3, Eye, EyeOff } from "lucide-react";

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

export default function LoginPage() {
	const router = useRouter();
	const { toast } = useToast();
	const { login } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await login(email, password);
			router.push("/dashboard");
		} catch (error: any) {
			toast({
				title: "Login failed",
				description:
					error.message || "Please check your credentials and try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='container flex h-screen w-screen flex-col items-center justify-center'>
			<Link
				href='/'
				className='absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2 font-bold'
			>
				<BarChart3 className='h-6 w-6 text-primary' />
				<span>ASO Insight</span>
			</Link>
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
				<Card>
					<CardHeader className='space-y-1'>
						<CardTitle className='text-2xl'>Sign in</CardTitle>
						<CardDescription>
							Enter your email and password to sign in to your account
						</CardDescription>
					</CardHeader>
					<form onSubmit={handleLogin}>
						<CardContent className='grid gap-4'>
							<div className='grid gap-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									placeholder='m@example.com'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className='grid gap-2'>
								<div className='flex items-center justify-between'>
									<Label htmlFor='password'>Password</Label>
									<Link
										href='/forgot-password'
										className='text-sm text-muted-foreground underline underline-offset-4 hover:text-primary'
									>
										Forgot password?
									</Link>
								</div>
								<div className='relative'>
									<Input
										id='password'
										type={showPassword ? "text" : "password"}
										placeholder='••••••••'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
									<Button
										type='button'
										variant='ghost'
										size='icon'
										className='absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground'
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeOff className='h-4 w-4' />
										) : (
											<Eye className='h-4 w-4' />
										)}
										<span className='sr-only'>
											{showPassword ? "Hide password" : "Show password"}
										</span>
									</Button>
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button
								className='w-full mt-4'
								type='submit'
								disabled={isLoading}
							>
								{isLoading ? "Signing in..." : "Sign in"}
							</Button>
						</CardFooter>
					</form>
				</Card>
				<div className='text-center text-sm text-muted-foreground'>
					Don&apos;t have an account?{" "}
					<Link
						href='/signup'
						className='underline underline-offset-4 hover:text-primary'
					>
						Sign up
					</Link>
				</div>
			</div>
		</div>
	);
}
