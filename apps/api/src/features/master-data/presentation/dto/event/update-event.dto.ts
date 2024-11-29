import { z } from 'zod';

export const UpdateEventSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter').optional(),
});

export type UpdateEventDto = z.infer<typeof UpdateEventSchema>;
