import { z } from 'zod';

export interface UpdateLojaDto {
  nome?: string;
  cnpj?: string;
  responsavel_id?: string;
  endereco_id?: string;
}

export const updateLojaSchema = z.object({
  tenant_id: z.string().uuid().optional(),
  nome: z.string().min(2).optional(),
  cnpj: z.string().length(14).optional(),
  responsavel_id: z.string().uuid().optional(),
  endereco_id: z.string().uuid().optional()
}); 