"use server";

import { CustomAxios } from "@/utils/customAxios";

const baseurl = "warehouses";

export async function apiGetAllWarehousesHandler(warehouseId: string) {
	try {
		const response = await CustomAxios(`${baseurl}/${warehouseId}`, "GET");
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

export async function apiGetWarehouseByIdHandler(warehousesId: string) {
	try {
		const response = await CustomAxios(`${baseurl}/${warehousesId}`, "GET");
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

export async function apiRemoveWarehouseHandler(warehousesId: string) {
	try {
		const response = await CustomAxios(`${baseurl}/${warehousesId}`, "DELETE");
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

export async function apiCreateWarehouseHandler(
	warehousesId: string,
	data: any
) {
	try {
		console.log("data to be sent", data);
		const response = await CustomAxios(
			`${baseurl}/${warehousesId}`,
			"POST",
			data
		);
		console.log("response from createOrderHandler", response);
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

export async function apiRemoveMultipleWarehousesHandler(
	warehousesIds: string[]
) {
	try {
		const response = await CustomAxios(`${baseurl}/deleteWarehouse`, "DELETE", {
			warehousesIds: warehousesIds,
		});
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

export async function updateWarehouseHandler(warehousesId: string, data: any) {
	try {
		const response = await CustomAxios(`${baseurl}/${warehousesId}`, "PUT", {
			data: data,
		});
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
