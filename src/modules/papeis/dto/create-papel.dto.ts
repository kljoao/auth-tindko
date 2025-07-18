import { z } from 'zod';

export interface CreatePapelDto {
  nome: string;
  descricao?: string;
}

export const createPapelSchema = z.object({
  nome: z.string().min(2),
  descricao: z.string().optional()
}); 