 import z from "zod"
 
 export const createUserZodSchema = z.object({
      name: z.string().max(50, "Name must be at most 50 characters"),

    email: z.string().email("Invalid email format"),

  
   password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    .optional(),


     phone: z.string()
    .regex(/^01[3-9]\d{8}$/, "Phone number must be a valid Bangladeshi number")
    .optional(),

    address: z.string()
    .min(5, "Address must be at least 5 characters long")
    .max(100, "Address must be at most 100 characters")
    .optional(),

})