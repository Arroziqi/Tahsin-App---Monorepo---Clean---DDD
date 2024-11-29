import { z } from 'zod';

export const AddTimeSchema = z.object({
  time: z.string().min(3, 'Waktu minimal 3 karakter'),
  status: z.boolean(),
});

export type AddTimeDto = z.infer<typeof AddTimeSchema>;
