import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { PasswordResetService } from '../services/password-reset.service';
import { loginSchema } from '../dto/login.dto';
import { refreshSchema } from '../dto/refresh.dto';
import { logoutSchema } from '../dto/logout.dto';
import { forgotPasswordSchema } from '../dto/forgot-password.dto';
import { resetPasswordSchema } from '../dto/reset-password.dto';

export async function login(req: Request, res: Response) {
  try {
    const parse = loginSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'Dados inválidos', details: parse.error.issues });
    }
    const { email, senha } = parse.data;
    
    // Extrair informações do dispositivo
    const deviceInfo = req.headers['user-agent'] || 'Unknown';
    const ipAddress = req.ip || req.connection.remoteAddress || 'Unknown';
    
    const result = await AuthService.login(email, senha, deviceInfo, ipAddress);
    return res.json(result);
  } catch (err: any) {
    return res.status(401).json({ error: err.message });
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    const parse = refreshSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'Dados inválidos', details: parse.error.issues });
    }
    const { refreshToken } = parse.data;
    
    const result = await AuthService.refresh(refreshToken);
    return res.json(result);
  } catch (err: any) {
    return res.status(401).json({ error: err.message });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const parse = logoutSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'Dados inválidos', details: parse.error.issues });
    }
    const { refreshToken } = parse.data;
    
    const result = await AuthService.logout(refreshToken);
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function logoutAll(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    
    const result = await AuthService.logoutAll(user.id);
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
} 

export async function forgotPassword(req: Request, res: Response) {
  try {
    const parse = forgotPasswordSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'Dados inválidos', details: parse.error.issues });
    }
    const { email } = parse.data;
    
    // Extrair informações do dispositivo
    const deviceInfo = req.headers['user-agent'] || 'Unknown';
    const ipAddress = req.ip || req.connection.remoteAddress || 'Unknown';
    
    const result = await PasswordResetService.createResetToken(email, ipAddress, deviceInfo);
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const parse = resetPasswordSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'Dados inválidos', details: parse.error.issues });
    }
    const { token, newPassword } = parse.data;
    
    const result = await PasswordResetService.resetPassword(token, newPassword);
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
} 