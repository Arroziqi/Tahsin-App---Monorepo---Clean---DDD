import { z } from 'zod';

export const UpdateDaySchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter').optional(),
  status: z.boolean().optional(),
});

export type UpdateDayDto = z.infer<typeof UpdateDaySchema>;
