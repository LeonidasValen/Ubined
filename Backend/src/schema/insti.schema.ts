import { z } from 'zod'

export const instiFilterSchema = z.object({
    horario: z
        .union([z.string(), z.array(z.string())]).optional(),
    nivel: z
        .union([z.string(), z.array(z.string())]).optional(),
    tipo: z
        .union([z.string(), z.array(z.string())]).optional(),
    searchUser:
        z.string().optional()
}).strict();

const schoolTypes = ['Pública', 'Privada'] as const;
const horariosValidos = ['Mañana', 'Tarde', 'Noche', 'Contraturno'] as const;
const cargosValidos = ['Director/a', 'Subdirector/a', 'Secretario/a', 'Vicedirector/a', 'Jefe de área', 'Rector/a', 'Vicerrector/a', 'Decano'] as const;

export const schoolSchema = z.object({
    nameSchool: z
        .string({ required_error: "Nombre de la escuela es requerido" })
        .min(2, { message: 'El Nombre debe tener 2 cacteres' })
        .max(100, { message: 'El Nombre no debe exeder los 100 cacteres' })
        .regex(/^[a-zA-Z0-9\sñÑáéíóúÁÉÍÓÚüÜ-]+$/, { message: "El nombre del instituto no puede contener caracteres especiales." }),

    id_provincia: z
        .coerce.number({
            required_error: "La provincia es requerido.",
            invalid_type_error: "La Provincia no es valido"
        })
        .int({ message: "La Provincia no es valido" })
        .positive({ message: "La Provincia no es valido" })
        .max(99, { message: "Numero de provincia no valido" }),

    id_localidad: z
        .coerce.number({
            required_error: "La provincia es requerido.",
            invalid_type_error: "La Localidad no es valido"
        })
        .int({ message: "La Localidad no es valido" })
        .positive({ message: "La Localidad no es valido" })
        .max(99, { message: "Numero de localidad no valido" }),

    address: z
        .string({ required_error: "Dirección es requerida" })
        .min(2, { message: 'La dirección debe tener al menos 2 caracteres' })
        .max(100, { message: 'La dirección no debe exceder los 100 caracteres' }),

    phone: z
        .coerce.number({
            required_error: "Teléfono es requerido",
            invalid_type_error: "Teléfono no es valido"
        })
        .int({ message: "Teléfono no es valido" })
        .positive({ message: "Teléfono no es valido" })
        .max(999999999999, { message: "Teléfono es muy grande" }),

    email: z
        .string({ required_error: "Email es requerido" })
        .min(2, { message: 'El email debe tener al menos 2 caracteres' })
        .max(500, { message: 'El email no debe exceder los 500 caracteres' })
        .email({ message: "El email no es valido" }),

    socialLink: z
        .array(
            z.object({
                id_social: z
                    .number({
                        required_error: 'La Red Social es requerida',
                        invalid_type_error: 'La Red Social no es valido'
                    })
                    .int()
                    .positive(),
                link: z
                    .string()
                    .url({ message: 'Debe ser un enlace válido' })
                    .or(z.literal('')) // Permitir string vacío si no lo completan
            })
        )
        .optional(),

    web: z
        .string({
            required_error: "CUE es requerido",
            invalid_type_error: "CUE debe ser un número"
        })
        .url({ message: "La web no es valido" })
        .optional(),

    schoolType: z
        .enum(schoolTypes, {
            required_error: "Tipo de la escuela es requerido",
            invalid_type_error: "El tipo de escuela seleccionado no es válido."
        }),

    cue: z
        .coerce.number({
            required_error: "CUE es requerido",
            invalid_type_error: "CUE debe ser un número"
        })
        .int({ message: "CUE debe ser un número entero" })
        .positive({ message: "CUE debe ser un número positivo" })
        .max(9999999, { message: "CUE debe ser menor a 9999999" }),

    nivel: z
        .enum(['Inicial', 'Primario', 'Secundario', 'Técnico', 'Universitario'], {
            required_error: "Nivel de la escuela es requerido",
            invalid_type_error: "El nivel de la escuela seleccionado no es válido."
        }),

    horary: z.string()
        .nonempty('El campo horary no puede estar vacío')
        .trim()
        .refine((val) => {
            const partes = val.split('/');
            return partes.every((parte) => horariosValidos.includes(parte as any));
        }, {
            message: 'Uno o más valores de horario no son válidos',
        }),

    descrip: z
        .string({ required_error: "Descripción es requerida" })
        .min(2, { message: 'La descripción debe tener al menos 2 caracteres' })
        .max(1500, { message: 'La descripción no debe exceder los 1000 caracteres' }),

    requirement: z
        .string({ required_error: "Requerimientos para ingresar o inscribirse a la escuela es requerido" })
        .min(2, { message: 'El requerimiento debe tener al menos 2 caracteres' })
        .max(500, { message: 'El requerimiento no debe exceder los 500 caracteres' }),


    offerts: z.array(
        z.object({
            id_modalidad: z
                .number({
                    required_error: "Modalidad es requerida",
                    invalid_type_error: "Modalidad no es válida"
                })
                .int({ message: "Modalidad debe ser un número entero" })
                .positive({ message: "Modalidad debe ser positiva" })
        })
    ).optional(),

    managers: z.array(
        z.object({
            cargo: z.enum(cargosValidos, {
                required_error: "Cargo es requerido",
                invalid_type_error: "El cargo seleccionado no es válido."
            }),
            nombre: z
                .string({ required_error: "Nombre es requerido" })
                .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
                .max(50, { message: 'El nombre no debe exceder los 50 caracteres' })
                .regex(/^[a-zA-Z0-9\sñÑáéíóúÁÉÍÓÚüÜ-]+$/, { message: "El nombre no puede contener caracteres especiales." }),
        })
    ).min(2, { message: "Debes agregar al menos 2 cargos" })
})

