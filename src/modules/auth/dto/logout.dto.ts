import { z } from 'zod';

export interface LogoutDto {
  refreshToken: string;
}

export const logoutSchema = z.object({
  refreshToken: z.string().min(1)
}); 