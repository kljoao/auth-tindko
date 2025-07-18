import { z } from 'zod';

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório'),
  newPassword: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
}); 