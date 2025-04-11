"use server";

import { CustomAxios } from "@/utils/customAxios";

const baseurl = "settings";

export async function getUserInfoHandler(userId: string) {
	try {
		const response = await CustomAxios(`${baseurl}/${userId}`, "GET");

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

export async function updateUserInfoHandler(userId: string, data: FormData) {
	try {
		const response = await CustomAxios(`${baseurl}/${userId}`, "PUT", data);
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
