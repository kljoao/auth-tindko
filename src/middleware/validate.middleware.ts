import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validateBody(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parse = schema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'Dados inválidos', details: parse.error.issues });
    }
    req.body = parse.data;
    next();
  };
} 