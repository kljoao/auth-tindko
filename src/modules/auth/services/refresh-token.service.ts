import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const prisma = new PrismaClient();

export class RefreshTokenService {
  static async hashIP(ipAddress: string): Promise<string> {
    return bcrypt.hash(ipAddress, 10);
  }
  
  static async compareIP(ipAddress: string, hashedIP: string): Promise<boolean> {
    return bcrypt.compare(ipAddress, hashedIP);
  }
  
  static async createRefreshToken(usuarioId: string, deviceInfo?: string, ipAddress?: string, userAgent?: string) {
    // Gerar token aleatório
    const token = crypto.randomBytes(64).toString('hex');
    const tokenHash = await bcrypt.hash(token, 10);
    
    // Criptografar IP se fornecido
    let hashedIP = null;
    if (ipAddress) {
      hashedIP = await this.hashIP(ipAddress);
    }
    
    // Definir expiração (30 dias)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    
    // Salvar no banco
    const refreshToken = await prisma.refresh_tokens.create({
      data: {
        usuario_id: usuarioId,
        token_hash: tokenHash,
        expires_at: expiresAt,
        device_info: deviceInfo,
        ip_address: hashedIP,
        user_agent: userAgent
      }
    });
    
    return {
      id: refreshToken.id,
      token: token, // Retornar o token puro apenas uma vez
      expiresAt: refreshToken.expires_at
    };
  }
  
  static async validateRefreshToken(token: string) {
    // Buscar todos os refresh tokens não revogados e não expirados
    const refreshTokens = await prisma.refresh_tokens.findMany({
      where: {
        is_revoked: false,
        expires_at: {
          gt: new Date()
        }
      },
      include: {
        usuario: {
          include: {
            papel: true
          }
        }
      }
    });
    
    // Verificar se algum token corresponde
    for (const refreshToken of refreshTokens) {
      const isValid = await bcrypt.compare(token, refreshToken.token_hash);
      if (isValid) {
        return {
          refreshToken,
          user: refreshToken.usuario
        };
      }
    }
    
    return null;
  }
  
  static async revokeRefreshToken(tokenId: string) {
    return prisma.refresh_tokens.update({
      where: { id: tokenId },
      data: { is_revoked: true }
    });
  }
  
  static async revokeAllUserTokens(usuarioId: string) {
    return prisma.refresh_tokens.updateMany({
      where: { 
        usuario_id: usuarioId,
        is_revoked: false
      },
      data: { is_revoked: true }
    });
  }
  
  static async cleanupExpiredTokens() {
    return prisma.refresh_tokens.deleteMany({
      where: {
        expires_at: {
          lt: new Date()
        }
      }
    });
  }
  
  static async getUserTokens(usuarioId: string) {
    return prisma.refresh_tokens.findMany({
      where: {
        usuario_id: usuarioId,
        is_revoked: false,
        expires_at: {
          gt: new Date()
        }
      },
      orderBy: {
        criado_em: 'desc'
      }
    });
  }
  
  // Função para verificar se um IP específico foi usado (para auditoria)
  static async findTokensByIP(usuarioId: string, ipAddress: string) {
    const userTokens = await this.getUserTokens(usuarioId);
    const matchingTokens = [];
    
    for (const token of userTokens) {
      if (token.ip_address && await this.compareIP(ipAddress, token.ip_address)) {
        matchingTokens.push(token);
      }
    }
    
    return matchingTokens;
  }
  
  // Função para auditoria de segurança - verificar tokens suspeitos
  static async getSecurityAudit(usuarioId: string) {
    const tokens = await this.getUserTokens(usuarioId);
    
    // Agrupar por device_info para identificar múltiplos dispositivos
    const deviceGroups = tokens.reduce((acc: Record<string, any[]>, token: any) => {
      const device = token.device_info || 'Unknown';
      if (!acc[device]) {
        acc[device] = [];
      }
      acc[device].push(token);
      return acc;
    }, {} as Record<string, any[]>);
    
    return {
      totalActiveTokens: tokens.length,
      uniqueDevices: Object.keys(deviceGroups).length,
      deviceBreakdown: deviceGroups,
      oldestToken: tokens.length > 0 ? tokens[tokens.length - 1] : null,
      newestToken: tokens.length > 0 ? tokens[0] : null
    };
  }
} 