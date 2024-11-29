import { z } from 'zod';

export const AddDaySchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  status: z.boolean(),
});

export type AddDayDto = z.infer<typeof AddDaySchema>;
