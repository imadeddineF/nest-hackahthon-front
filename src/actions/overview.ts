"use server";

import { CustomAxios } from "@/utils/customAxios";

const baseurl = "stats";

export async function getWarehousesStatsHandler(
	by?: "month" | "year" | "week"
) {
	try {
		const response = await CustomAxios(
			`${baseurl}/one/warehouses?by=${by}`,
			"GET"
		);
		console.log("response", response);
		if (response.status >= 200 && response.status < 300) {
			return response.data.data;
		}
		throw new Error(response?.data.message ?? "Something went wrong");
	} catch (error: any) {
		if (
			error.response &&
			error.response.data &&
			error.response.data.translatedError
		) {
			throw {
				message: error.response.data.error,
				TranslatedMessage: error.response.data.translatedError,
				errorCode: error.response.data.code,
			};
		}
	}
}

export async function getStoreOrdersStatsCustomHandler(
	startDate: string,
	endDate: string
) {
	try {
		const response = await CustomAxios(
			`${baseurl}/two/warehouses?startDate=${startDate}&endDate=${endDate}`,
			"GET"
		);

		console.log("response", response);
		if (response.status >= 200 && response.status < 300) {
			return response.data.data;
		}
		throw new Error(response?.data.message ?? "Something went wrong");
	} catch (error: any) {
		if (
			error.response &&
			error.response.data &&
			error.response.data.translatedError
		) {
			throw {
				message: error.response.data.error,
				TranslatedMessage: error.response.data.translatedError,
				errorCode: error.response.data.code,
			};
		}
	}
}
