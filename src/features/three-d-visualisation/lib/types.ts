export interface Position {
	x: number;
	y: number;
	z: number;
}

export interface Robot {
	id: string;
	name: string;
	type: "heavy-duty" | "lightweight";
	status: "active" | "idle" | "charging" | "error";
	position: Position;
	battery: number;
}
