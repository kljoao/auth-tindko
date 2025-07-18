import { z } from 'zod';

export interface CreateSocioDto {
  tenant_id: string;
  nome: string;
  cpf: string;
  email: string;
  is_dono?: boolean;
  participacao: number;
}

export const createSocioSchema = z.object({
  tenant_id: z.string().uuid(),
  nome: z.string().min(2),
  cpf: z.string().length(11),
  email: z.string().email(),
  is_dono: z.boolean().optional(),
  participacao: z.number().min(0).max(100)
}); 