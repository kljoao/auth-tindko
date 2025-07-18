import { z } from 'zod';

export interface UpdatePapelDto {
  nome?: string;
  descricao?: string;
}

export const updatePapelSchema = z.object({
  nome: z.string().min(2).optional(),
  descricao: z.string().optional()
}); 