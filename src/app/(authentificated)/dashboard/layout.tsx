import { DashboardNavbar } from "@/components/layout";
// import DashboardSidebar from "@/components/layout/sidebar";
import { ReduxProvider } from "@/providers/redux-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { DashboardContent } from "@/providers/dashboard-content";

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ReduxProvider>
			<TooltipProvider delayDuration={120}>
				<NuqsAdapter>
					<SidebarProvider>
						<AppSidebar />
						<DashboardContent>{children}</DashboardContent>
					</SidebarProvider>
				</NuqsAdapter>
			</TooltipProvider>
		</ReduxProvider>
	);
}
