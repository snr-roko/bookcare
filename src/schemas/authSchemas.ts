import {object, email, string} from "zod"

export const LoginSchema = object({
    email: email("Enter a valid email"),
    password: string().min(8, "Password must be atleast 8 characters")
})

export const SignUpSchema = object({
    fullName: string().nonempty("Full Name is required"),
    email: email("Enter a valid email"),
    password: string().min(8, "Password must be atleast 8 characters"),
    confirmPassword: string().min(8, "Password must be atleast 8 characters")
}).refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"]
})