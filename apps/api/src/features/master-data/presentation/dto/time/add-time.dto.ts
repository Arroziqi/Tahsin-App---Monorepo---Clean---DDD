import { z } from 'zod';

export const AddTimeSchema = z.object({
  time: z
    .string({
      required_error: 'Waktu harus diisi',
      invalid_type_error: 'Waktu harus berupa string',
    })
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format waktu harus HH:mm'),
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
    .default(true)
    .describe('Status harus diisi'),
});

export type AddTimeDto = z.infer<typeof AddTimeSchema>;
