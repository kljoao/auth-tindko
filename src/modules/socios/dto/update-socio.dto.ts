import { z } from 'zod';

export interface UpdateSocioDto {
  nome?: string;
  cpf?: string;
  email?: string;
  is_dono?: boolean;
}

export const updateSocioSchema = z.object({
  tenant_id: z.string().uuid().optional(),
  nome: z.string().min(2).optional(),
  cpf: z.string().length(11).optional(),
  email: z.string().email().optional(),
  is_dono: z.boolean().optional()
}); 