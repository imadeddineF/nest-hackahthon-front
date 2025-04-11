import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import React from "react";

export default function Home() {
	return (
		<div>
			<Link href={"/dashboard"}>
				<Button>Got to Dashboard</Button>
			</Link>
		</div>
	);
}
