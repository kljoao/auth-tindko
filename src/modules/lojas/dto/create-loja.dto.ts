import { z } from 'zod';

export interface CreateLojaDto {
  tenant_id: string;
  nome: string;
  cnpj: string;
  responsavel_id: string;
  endereco_id: string;
}

export const createLojaSchema = z.object({
  tenant_id: z.string().uuid(),
  nome: z.string().min(2),
  cnpj: z.string().length(14),
  responsavel_id: z.string().uuid(),
  endereco_id: z.string().uuid()
}); 