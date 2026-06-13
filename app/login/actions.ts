"use server"

import { redirect } from "next/navigation"
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export type LoginState = { error?: string }

export async function loginAction(
    _prevState: LoginState | null,
    formData: FormData
) : Promise<LoginState> {
    const email = String(formData.get("email")).trim();
    const password = String(formData.get("password")).trim();

    if (!email || !password) {
        return { error: "Input email or password" };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        })

        redirect("/dashboard")
    } catch (error) {
        console.log(error)
        if (error instanceof AuthError) {
            if (error.type === "CredentialsSignin") {
                return { error: "Incorrect email or password" };
            }

            return { error: "Authorization error" };
        }

        throw error;
    }
}