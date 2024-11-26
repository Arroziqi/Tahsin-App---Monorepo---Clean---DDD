import { z } from 'zod';

export const UpdateLevelSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter').optional(),
});

export type UpdateLevelDto = z.infer<typeof UpdateLevelSchema>;
