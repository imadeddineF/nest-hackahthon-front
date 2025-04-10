// // "use server";

// import { redirect } from "next/navigation";
// import { z } from "zod";

// const testUser = {
//     email: "adel@gmail.com",
//     password: "password123",
// };

// const loginSchema = z.object({
//     email: z.string().email().trim(),
//     password: z
//         .string()
//         .min(6, { message: "Password must be at least 6 characters long" })
//         .trim(),
// });

// export async function login(prevState: unknown, formData: FormData) {
//     const result = loginSchema.safeParse(Object.fromEntries(formData));
//     console.log(result);

//     if (!result.success) {
//         return {
//             error: result.error.flatten().fieldErrors,
//         };
//     }

//     const { email, password } = result.data;

//     if (email !== testUser.email || password !== testUser.password) {
//         return {
//             error: {
//                 email: "Invalid email or password",
//             },
//         };
//     }

//     return {
//         data: {
//             email,
//             password,
//         },
//     };

//     redirect("/dashboard");
// }
