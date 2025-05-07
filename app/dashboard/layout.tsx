import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<div className='flex w-full min-h-screen flex-col'>
				<DashboardHeader />
				<div className='flex flex-1'>
					<DashboardSidebar />
					<main className='flex-1 p-6'>{children}</main>
				</div>
			</div>
		</SidebarProvider>
	);
}
