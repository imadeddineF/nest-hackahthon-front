"use server";

import { CustomAxios } from "@/utils/customAxios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";

const baseurl = "auth";

interface ApiErrorResponse {
	error: string;
	translatedError: string;
	code: string;
}

interface ApiError {
	response?: {
		data?: ApiErrorResponse;
	};
}

export async function apiLoginHandler(email: string, password: string) {
	const cookieStore = await cookies();

	try {
		const response = await CustomAxios(`${baseurl}/login`, "POST", {
			email,
			password,
			stay: true,
		});
		if (response.status >= 200 && response.status < 300) {
			cookieStore.set("auth_token", response.data.data.token);
			cookieStore.set("userId", response.data.data.userId);

			console.log("response.data: ", response.data);
			redirect("/dashboard");
		}
	} catch (error) {
		const axiosError = error as AxiosError<ApiError>;
		const errorData = axiosError.response?.data as ApiErrorResponse | undefined;
		if (errorData) {
			throw {
				message: errorData.error,
				TranslatedMessage: errorData.translatedError,
				errorCode: errorData.code,
			};
		}
	}
}

export async function apiRegisterHandler(
	formData: FormData,
	_inviteToken?: string
) {
	const cookieStore = await cookies();

	try {
		const response = await CustomAxios(`${baseurl}/register`, "POST", formData);

		if (response.status >= 200 && response.status < 300) {
			console.log("response.data", response.data);
			cookieStore.set("userId", JSON.stringify(response.data.data));
			cookieStore.set("auth_token", response.data.data.token);

			console.log("response.data: ", response.data);

			redirect("/dashboard");
		}
	} catch (error) {
		const axiosError = error as AxiosError<ApiError>;
		const errorData = axiosError.response?.data as ApiErrorResponse | undefined;
		if (errorData) {
			throw {
				message: errorData.error,
				TranslatedMessage: errorData.translatedError,
				errorCode: errorData.code,
			};
		}
	}
}

export async function apiLogoutHandler() {
	const cookieStore = await cookies();

	try {
		cookieStore.delete("userId");
		cookieStore.delete("auth_token");
		redirect("/login");
	} catch (error) {
		const axiosError = error as AxiosError<ApiError>;
		const errorData = axiosError.response?.data as ApiErrorResponse | undefined;
		if (errorData) {
			throw {
				message: errorData.error,
				TranslatedMessage: errorData.translatedError,
				errorCode: errorData.code,
			};
		}
	}
}
