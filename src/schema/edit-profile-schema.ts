import { z } from 'zod';

export const EditProfileSchema = z.object({
  name: z.string().min(1, { message: 'Nama harus diisi' }),
  email: z.string().email('Format email tidak valid'),
  phone: z.string().optional(),
});

export type EditProfileSchema = z.infer<typeof EditProfileSchema>;
