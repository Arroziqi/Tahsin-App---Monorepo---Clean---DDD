import { z } from 'zod';

export const UpdateDaySchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter').optional(),
  status: z
    .union([
      z.boolean(),
      z.string().transform((val) => {
        if (val.toLowerCase() === 'true') return true;
        if (val.toLowerCase() === 'false') return false;
        throw new Error(
          'Status harus berupa boolean atau string "true"/"false"',
        );
      }),
    ])
    .optional(),
});

export type UpdateDayDto = z.infer<typeof UpdateDaySchema>;
