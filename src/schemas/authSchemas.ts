import {object, email, string} from "zod"

export const LoginSchema = object({
    email: email("Enter a valid email"),
    password: string().min(8, "Password must be atleast 8 characters")
})