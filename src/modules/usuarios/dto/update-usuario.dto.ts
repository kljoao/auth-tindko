import { z } from 'zod';

export interface UpdateUsuarioDto {
  loja_id?: string;
  nome?: string;
  email?: string;
  senha?: string;
  papel_id?: string;
  tenant_id?: string;
}

export const updateUsuarioSchema = z.object({
  tenant_id: z.string().uuid().optional(),
  loja_id: z.string().uuid().optional(),
  nome: z.string().min(2).optional(),
  email: z.string().email().optional(),
  senha: z.string().min(6).optional(),
  papel_id: z.string().uuid().optional()
}); 