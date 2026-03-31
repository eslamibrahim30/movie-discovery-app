import { z } from "zod";

export const getRegisterSchema = (t) => z.object({
  username: z.string().min(4, t?.usernameMin || "Username must be at least 4 characters"),
  email: z.string().email(t?.invalidEmail || "Invalid email address"),
  password: z.string().min(8, t?.passwordMin || "Password must be at least 8 characters"),
});

export const getLoginSchema = (t) => z.object({
  email: z.string().email(t?.invalidEmail || "Invalid email address"),
  password: z.string().min(1, t?.passwordRequired || "Password is required"),
});

export const registerSchema = getRegisterSchema({});
export const loginSchema = getLoginSchema({});