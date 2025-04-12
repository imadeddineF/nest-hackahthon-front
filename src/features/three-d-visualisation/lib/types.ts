export interface Position {
	x: number;
	y: number;
	z: number;
}

export interface Robot {
	id: string;
	name: string;
	type: "light-duty" | "heavy-duty";
	status: string;
	position: Position;
	battery: number;
}
