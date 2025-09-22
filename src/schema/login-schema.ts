// src/schema/userSchema.ts
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z
    .string()
    .min(6, { message: 'Kata sandi harus minimal 6 karakter.' }),
});

// Type otomatis dari schema
export type LoginSchema = z.infer<typeof LoginSchema>;
