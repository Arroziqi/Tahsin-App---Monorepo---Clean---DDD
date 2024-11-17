import { z } from 'zod';

export const SignupUserSchema = z.object({
  username: z.string().min(3, 'Username minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export type SignupDto = z.infer<typeof SignupUserSchema>;
