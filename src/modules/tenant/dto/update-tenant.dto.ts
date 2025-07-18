import { z } from 'zod';

export interface UpdateTenantDto {
  razao_social?: string;
  nome_fantasia?: string;
  cnpj_matriz?: string;
  inscricao_estadual?: string;
  regime_tributario?: string;
}

export const updateTenantSchema = z.object({
  razao_social: z.string().min(2).optional(),
  nome_fantasia: z.string().min(2).optional(),
  cnpj_matriz: z.string().length(14).optional(),
  inscricao_estadual: z.string().min(2).optional(),
  regime_tributario: z.string().min(2).optional()
}); 