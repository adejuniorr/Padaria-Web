import { z } from "zod";

export const productSchema = z.object({
  nome: z.string().min(1, "O nome do produto deve ser informado"),
  categoria: z.enum(['Pães', 'Doces', 'Salgados'], { errorMap: () => ({ message: 'Por favor, selecione uma categoria' }) }),
  descricao: z.string().optional(),
  preco: z
    .string()
    .min(1, 'O preço do produto deve ser informado')
    .max(6, 'O preço deve ser abaixo de R$ 1000,00')
    .transform((val) => parseFloat(val.replace(',', '.'))),
  img: z.string().optional(),
});

export type ProductForm = z.infer<typeof productSchema>;