import { z } from 'zod';

export interface ForgotPasswordDto {
  email: string;
}

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido')
}); 