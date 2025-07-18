import { z } from 'zod';

export interface UpdateEnderecoDto {
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
}

export const updateEnderecoSchema = z.object({
  logradouro: z.string().min(2).optional(),
  numero: z.string().min(1).optional(),
  complemento: z.string().optional(),
  bairro: z.string().min(2).optional(),
  cidade: z.string().min(2).optional(),
  uf: z.string().length(2).optional(),
  cep: z.string().length(8).optional()
}); 