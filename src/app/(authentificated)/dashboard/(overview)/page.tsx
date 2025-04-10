"use client";
// import WarningToast from "@/components/toasts/warningToast";
// import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/dashboard/overview/data-table";
import { SectionCards } from "@/components/dashboard/overview/section-cards";
// import { useTranslations } from "next-intl";
import React from "react";
import data from "./data.json";
import dynamic from "next/dynamic";

export default function Overview() {
	// const t = useTranslations();
	// const handleClick = () => {
	//   WarningToast(
	//     "Title",
	//     "lorem ipsum dolor sit amet, consectetur adipiscing elit"
	//   );
	// };

	const ChartAreaComponent = dynamic(
		() =>
			import("@/components/dashboard/overview/chart-area").then(
				(mod) => mod.ChartArea
			),
		{ ssr: false }
	);

	const ChartPieDonutComponent = dynamic(
		() =>
			import("@/components/dashboard/overview").then(
				(mod) => mod.ChartPieDonut
			),
		{ ssr: false }
	);
	const ChartPieLegendComponent = dynamic(
		() =>
			import("@/components/dashboard/overview").then(
				(mod) => mod.ChartPieLegend
			),
		{ ssr: false }
	);

	const ChartBarLabelComponent = dynamic(
		() =>
			import("@/components/dashboard/overview").then(
				(mod) => mod.ChartBarLabel
			),
		{ ssr: false }
	);

	const ChartBarMultipleComponent = dynamic(
		() =>
			import("@/components/dashboard/overview").then(
				(mod) => mod.ChartBarMultiple
			),
		{ ssr: false }
	);

	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 w-full">
					<SectionCards />
					<div className="">
						<ChartAreaComponent />
					</div>
					<div className="flex gap-4 md:gap-6 items-center">
						<ChartBarLabelComponent />
						<ChartBarMultipleComponent />
					</div>
					<div className="flex gap-4 md:gap-6 items-center">
						<ChartPieLegendComponent />
						<ChartPieDonutComponent />
					</div>
					<DataTable data={data} />
				</div>
			</div>
		</div>
	);
}
