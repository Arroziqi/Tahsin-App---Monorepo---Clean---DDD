import { z } from 'zod';

export const UpdateTimeSchema = z.object({
  time: z.string().min(3, 'Nama minimal 3 karakter').optional(),
  status: z
    .union([z.boolean(), z.string()])
    .refine((value) => {
      if (typeof value === 'string') {
        return ['true', 'false', '1', '0'].includes(value.toLowerCase());
      }
      return true;
    }, 'Status harus berupa boolean atau string yang dapat dikonversi ke boolean (true/false, 1/0)')
    .transform((value) => {
      if (typeof value === 'string') {
        return value.toLowerCase() === 'true' || value === '1';
      }
      return value;
    })
    .optional(),
});

export type UpdateTimeDto = z.infer<typeof UpdateTimeSchema>;
