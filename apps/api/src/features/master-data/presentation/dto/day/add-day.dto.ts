import { z } from 'zod';

export const AddDaySchema = z.object({
  name: z
    .string({
      required_error: 'Nama wajib diisi',
    })
    .min(3, 'Nama minimal 3 karakter'),
  status: z.union([
    z.boolean({
      required_error: 'Status wajib diisi',
    }),
    z
      .string({
        required_error: 'Status wajib diisi',
      })
      .transform((val) => {
        if (val.toLowerCase() === 'true') return true;
        if (val.toLowerCase() === 'false') return false;
        throw new Error(
          'Status harus berupa boolean atau string "true"/"false"',
        );
      }),
  ]),
});

export type AddDayDto = z.infer<typeof AddDaySchema>;
