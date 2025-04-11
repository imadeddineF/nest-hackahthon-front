import { Header } from "@/components/dashboard/overview";

export default async function OverviewLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="h-screen">
			<Header />
			<div className="border-2 w-full h-full mt-3">{children}</div>
		</main>
	);
}
