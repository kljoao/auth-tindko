import { z } from 'zod';

export interface RefreshDto {
  refreshToken: string;
}

export const refreshSchema = z.object({
  refreshToken: z.string().min(1)
}); 