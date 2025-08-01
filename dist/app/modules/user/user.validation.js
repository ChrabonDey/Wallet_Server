"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default.string().max(50, "Name must be at most 50 characters"),
    email: zod_1.default.string().email("Invalid email format"),
    password: zod_1.default.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
        .optional(),
    phone: zod_1.default.string()
        .regex(/^01[3-9]\d{8}$/, "Phone number must be a valid Bangladeshi number")
        .optional(),
    address: zod_1.default.string()
        .min(5, "Address must be at least 5 characters long")
        .max(100, "Address must be at most 100 characters")
        .optional(),
});
