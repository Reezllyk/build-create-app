"use server"

import {redirect} from "next/navigation";
import {prisma} from "@/lib/db";
import bcrypt from "bcryptjs";

const MIN_PASSWORD_LENGTH = 8;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SignupState = { error?: string };

export async function signupAction(
    _prevState: SignupState | null,
    formData: FormData,
) : Promise<SignupState> {
    const name = formData.get("name") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!email) {
        return { error: "Email is required" };
    }

    if (!EMAIL_REGEX.test(email)) {
        return { error: "Incorrect email format"}
    }

    if (!password || password.length < MIN_PASSWORD_LENGTH) {
        return { error: "The password must be 8 characters long."}
    }

    const existing = await prisma.user.findUnique({
        where: { email }
    })

    if (existing) {
        return { error: "The email is already taken"}
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    })

    redirect("/login")
}