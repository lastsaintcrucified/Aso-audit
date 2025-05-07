"use client";

import type React from "react";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useAuth } from "@/contexts/auth-context";
import { LoadingSpinner } from "@/components/loading-spinner";

interface AuthGuardProps {
	children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
	const { user, loading } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		// Check if the user is on a protected route and not authenticated
		if (!loading && !user && pathname.startsWith("/dashboard")) {
			router.push("/login");
		}
	}, [user, loading, router, pathname]);

	// If still loading auth state, show a loading spinner
	if (loading) {
		return (
			<div className='flex h-screen w-full items-center justify-center'>
				<LoadingSpinner className='h-8 w-8' />
			</div>
		);
	}

	// If on a protected route but no user, the useEffect will handle redirect
	// Don't render anything in the meantime
	if (!user && pathname.startsWith("/dashboard")) {
		return null;
	}

	// Otherwise, render the children normally
	return <>{children}</>;
}
