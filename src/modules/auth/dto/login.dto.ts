import { z } from 'zod';

export interface LoginDto {
  email: string;
  senha: string;
}

export const loginSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6)
}); 