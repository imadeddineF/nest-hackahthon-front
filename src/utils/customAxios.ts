import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
const hosted = "";
const local = "";
import { SSE } from "sse.js";
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || hosted;

console.log("env ", BASE_URL);

export const CustomAxios = async (
	path: string,
	method: "GET" | "POST" | "PUT" | "DELETE",
	data?: any
) => {
	const token = Cookies.get("auth_token");
	console.log("path");
	console.log(`${BASE_URL}${path}`);
	const res = await axios({
		url: `${BASE_URL}${path}`,
		method,
		data,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		withCredentials: true,
	});
	return res;
};

export const CustomAxiosServerSide = async (
	path: string,
	method: "GET",
	token: string
) => {
	const res = await axios({
		url: `${BASE_URL}${path}`,
		method,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		withCredentials: true,
	});
	return res;
};

export const checkNetworkServer = (err: any) => {
	if (axios.isAxiosError(err)) {
		if (err.code === "ERR_NETWORK" && err.message === "Network Error") {
			console.log("no network connection or no serveur response received");
			return "ERR_NETWORK";
		}
	} else {
		return null;
	}
};
