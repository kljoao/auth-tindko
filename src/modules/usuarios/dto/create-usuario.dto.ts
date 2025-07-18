import { z } from 'zod';

export interface CreateUsuarioDto {
  tenant_id?: string;
  loja_id?: string;
  nome: string;
  email: string;
  senha: string;
  papel_id: string;
}

export const createUsuarioSchema = z.object({
  tenant_id: z.string().uuid().optional(),
  loja_id: z.string().uuid().optional(),
  nome: z.string().min(2),
  email: z.string().email(),
  senha: z.string().min(6),
  papel_id: z.string().uuid()
}); 