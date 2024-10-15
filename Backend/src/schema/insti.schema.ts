import { z } from 'zod'

export const instiFilterSchema = z.object({
    horario: z
        .union([z.string(), z.array(z.string())]).optional(),
    nivel: z
        .union([z.string(), z.array(z.string())]).optional(),
    tipo: z
        .union([z.string(), z.array(z.string())]).optional(),
}).strict();
