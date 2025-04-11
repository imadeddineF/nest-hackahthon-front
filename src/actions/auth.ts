"use server";

import { CustomAxios } from "@/utils/customAxios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const baseurl = "auth";

export async function apiLoginHandler(email: string, password: string) {
	const cookieStore = cookies();

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

export async function apiRegisterHandler(
	formData: FormData,
	inviteToken?: string
) {
	const cookieStore = cookies();

	try {
		const response = await CustomAxios(`${baseurl}/register`, "POST", formData);

		if (response.status >= 200 && response.status < 300) {
			console.log("response.data", response.data);
			cookieStore.set("userId", JSON.stringify(response.data.data));
			cookieStore.set("auth_token", response.data.data.token);

			console.log("response.data: ", response.data);

			redirect("/dashboard");
		}
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

export async function apiLogoutHandler() {
	const cookieStore = cookies();

	try {
		cookieStore.delete("userId");
		cookieStore.delete("auth_token");
		// return Promise.resolve("success");

		redirect("/login");
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
