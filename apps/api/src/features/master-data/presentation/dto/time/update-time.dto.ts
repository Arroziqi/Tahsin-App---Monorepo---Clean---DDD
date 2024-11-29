import { z } from 'zod';

export const UpdateTimeSchema = z.object({
  time: z.string().min(3, 'Nama minimal 3 karakter').optional(),
  status: z.boolean().optional(),
});

export type UpdateTimeDto = z.infer<typeof UpdateTimeSchema>;
