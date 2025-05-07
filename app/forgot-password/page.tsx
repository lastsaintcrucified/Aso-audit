/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { BarChart3 } from "lucide-react";

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
import { LoadingSpinner } from "@/components/loading-spinner";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const { resetPassword } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await resetPassword(email);
			toast({
				title: "Password reset email sent",
				description: "Please check your inbox for further instructions.",
			});
		} catch (error: any) {
			toast({
				title: "Error",
				description: error.message || "Failed to send reset email.",
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
						<CardTitle className='text-2xl'>Reset password</CardTitle>
						<CardDescription>
							Enter your email address to receive a password reset link
						</CardDescription>
					</CardHeader>
					<form onSubmit={handleSubmit}>
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
						</CardContent>
						<CardFooter>
							<Button
								className='w-full mt-4'
								type='submit'
								disabled={isLoading}
							>
								{isLoading ? <LoadingSpinner /> : "Send reset link"}
							</Button>
						</CardFooter>
					</form>
				</Card>
				<div className='text-center text-sm text-muted-foreground'>
					<Link
						href='/login'
						className='underline underline-offset-4 hover:text-primary'
					>
						Back to login
					</Link>
				</div>
			</div>
		</div>
	);
}
