"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Home, Plus, Settings } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
} from "@/components/ui/sidebar";

export function DashboardSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar>
			<SidebarHeader className='flex items-center px-4 py-2'>
				<Link
					href='/'
					className='flex items-center gap-2 font-bold'
				>
					<BarChart3 className='h-6 w-6 text-primary' />
					<span>iOS Metadata Optimizer</span>
				</Link>
			</SidebarHeader>
			<SidebarSeparator />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Dashboard</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									isActive={pathname === "/dashboard"}
								>
									<Link href='/dashboard'>
										<Home className='h-4 w-4' />
										<span>My Apps</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									isActive={pathname === "/dashboard/reports"}
								>
									<Link href='/dashboard/reports'>
										<FileText className='h-4 w-4' />
										<span>Reports</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarSeparator />
				<SidebarGroup>
					<SidebarGroupLabel>Apps</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									isActive={pathname === "/dashboard/new-app"}
								>
									<Link href='/dashboard/new-app'>
										<Plus className='h-4 w-4' />
										<span>Add New App</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							isActive={pathname === "/dashboard/settings"}
						>
							<Link href='/dashboard/settings'>
								<Settings className='h-4 w-4' />
								<span>Settings</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
