import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthPayload {
  id: string;
  nome: string;
  email: string;
  role_id: string;
  [key: string]: any;
}

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthPayload;
    (req as any).user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}
