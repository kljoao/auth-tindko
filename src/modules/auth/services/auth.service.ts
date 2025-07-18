import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RefreshTokenService } from './refresh-token.service';

const prisma = new PrismaClient();

export class AuthService {
  static async login(email: string, senha: string, deviceInfo?: string, ipAddress?: string, userAgent?: string) {
    const user = await prisma.usuarios.findUnique({ 
      where: { email }, 
      include: { papel: true } 
    });
    if (!user) throw new Error('Usuário ou senha inválidos');
    const senhaOk = await bcrypt.compare(senha, user.senha_hash);
    if (!senhaOk) throw new Error('Usuário ou senha inválidos');
    
    // Gerar JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        nome: user.nome,
        email: user.email,
        role_id: user.papel_id 
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' }
    );
    
    // Gerar refresh token
    const refreshTokenData = await RefreshTokenService.createRefreshToken(
      user.id, 
      deviceInfo, 
      ipAddress, 
      userAgent
    );
    
    return { 
      token, 
      refreshToken: refreshTokenData.token,
      user: { id: user.id, nome: user.nome, email: user.email, role_id: user.papel_id } 
    };
  }
  
  static async refresh(refreshToken: string) {
    const tokenData = await RefreshTokenService.validateRefreshToken(refreshToken);
    if (!tokenData) {
      throw new Error('Refresh token inválido ou expirado');
    }
    
    // Gerar novo JWT
    const newToken = jwt.sign(
      { 
        id: tokenData.user.id, 
        nome: tokenData.user.nome,
        email: tokenData.user.email,
        role_id: tokenData.user.papel_id 
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' }
    );
    
    // Gerar novo refresh token (opcional - pode manter o mesmo)
    const newRefreshTokenData = await RefreshTokenService.createRefreshToken(
      tokenData.user.id,
      tokenData.refreshToken.device_info || undefined,
      tokenData.refreshToken.ip_address || undefined,
      tokenData.refreshToken.user_agent || undefined
    );
    
    // Revogar o refresh token antigo
    await RefreshTokenService.revokeRefreshToken(tokenData.refreshToken.id);
    
    return {
      token: newToken,
      refreshToken: newRefreshTokenData.token,
      user: { id: tokenData.user.id, nome: tokenData.user.nome, email: tokenData.user.email, role_id: tokenData.user.papel_id }
    };
  }
  
  static async logout(refreshToken: string) {
    const tokenData = await RefreshTokenService.validateRefreshToken(refreshToken);
    if (tokenData) {
      await RefreshTokenService.revokeRefreshToken(tokenData.refreshToken.id);
    }
    return { message: 'Logout realizado com sucesso' };
  }
  
  static async logoutAll(userId: string) {
    await RefreshTokenService.revokeAllUserTokens(userId);
    return { message: 'Logout de todos os dispositivos realizado com sucesso' };
  }
} 