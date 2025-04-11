"use server";

import { CustomAxios } from "@/utils/customAxios";

const baseurl = "notifications";

export async function getAllNotificationsHandler({
	limit,
	page,
}: {
	page?: number;
	limit?: number;
}) {
	try {
		let requestUrl = `${baseurl}?page=${page}&limit=${limit}`;
		const response = await CustomAxios(requestUrl, "GET");
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

export async function getReadNotificationsHandler({
	limit,
	page,
}: {
	page?: number;
	limit?: number;
}) {
	try {
		let requestUrl = `${baseurl}/read?page=${page}&limit=${limit}`;
		const response = await CustomAxios(requestUrl, "GET");
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

export async function getUnreadNotificationsHandler({
	limit,
	page,
}: {
	page?: number;
	limit?: number;
}) {
	try {
		let requestUrl = `${baseurl}/unread?page=${page}&limit=${limit}`;
		const response = await CustomAxios(requestUrl, "GET");
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

export async function deleteNotificationsHandler(notificationsIds: any[]) {
	try {
		const response = await CustomAxios(`${baseurl}`, "DELETE", {
			notificationsIds: notificationsIds,
		});
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

export async function updateToReadNotificationsHandler(
	notificationsIds: any[]
) {
	try {
		const response = await CustomAxios(`${baseurl}`, "PUT", {
			notificationsIds: notificationsIds,
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
