// Tipos globais do projeto 
import { AuthPayload } from '../middleware/auth.middleware';

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthPayload;
  }
} 