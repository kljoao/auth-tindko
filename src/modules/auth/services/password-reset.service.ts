import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const prisma = new PrismaClient();

export class PasswordResetService {
  static async createResetToken(email: string, ipAddress?: string, userAgent?: string) {
    // Verificar se o usuário existe
    const user = await prisma.usuarios.findUnique({
      where: { email }
    });
    
    if (!user) {
      // Por segurança, não revelar se o email existe ou não
      return { success: true, message: 'Se o email existir, você receberá um link para reset de senha.' };
    }
    
    // Revogar tokens de reset anteriores não utilizados
    await prisma.password_reset_tokens.updateMany({
      where: {
        usuario_id: user.id,
        is_used: false,
        expires_at: {
          gt: new Date()
        }
      },
      data: {
        is_used: true
      }
    });
    
    // Gerar token único
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = await bcrypt.hash(token, 10);
    
    // Criptografar IP se fornecido
    let hashedIP = null;
    if (ipAddress) {
      hashedIP = await bcrypt.hash(ipAddress, 10);
    }
    
    // Definir expiração (1 hora)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    
    // Salvar token no banco
    await prisma.password_reset_tokens.create({
      data: {
        usuario_id: user.id,
        token_hash: tokenHash,
        expires_at: expiresAt,
        ip_address: hashedIP,
        user_agent: userAgent
      }
    });
    
    // TODO: Enviar email com o token
    // Por enquanto, retornar o token para teste
    return {
      success: true,
      message: 'Token de reset criado com sucesso.',
      token: token, // Remover em produção
      expiresAt: expiresAt
    };
  }
  
  static async validateResetToken(token: string) {
    // Buscar token não usado e não expirado
    const resetToken = await prisma.password_reset_tokens.findFirst({
      where: {
        is_used: false,
        expires_at: {
          gt: new Date()
        }
      },
      include: {
        usuario: true
      }
    });
    
    if (!resetToken) {
      return null;
    }
    
    // Verificar se o token corresponde
    const isValid = await bcrypt.compare(token, resetToken.token_hash);
    if (!isValid) {
      return null;
    }
    
    return {
      resetToken,
      user: resetToken.usuario
    };
  }
  
  static async resetPassword(token: string, newPassword: string) {
    const tokenData = await this.validateResetToken(token);
    if (!tokenData) {
      throw new Error('Token de reset inválido ou expirado');
    }
    
    // Hash da nova senha
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    
    // Atualizar senha do usuário
    await prisma.usuarios.update({
      where: { id: tokenData.user.id },
      data: { senha_hash: newPasswordHash }
    });
    
    // Marcar token como usado
    await prisma.password_reset_tokens.update({
      where: { id: tokenData.resetToken.id },
      data: { is_used: true }
    });
    
    // Revogar todos os refresh tokens do usuário (forçar novo login)
    await prisma.refresh_tokens.updateMany({
      where: {
        usuario_id: tokenData.user.id,
        is_revoked: false
      },
      data: { is_revoked: true }
    });
    
    return {
      success: true,
      message: 'Senha alterada com sucesso. Você será deslogado de todos os dispositivos.'
    };
  }
  
  static async cleanupExpiredTokens() {
    return prisma.password_reset_tokens.deleteMany({
      where: {
        expires_at: {
          lt: new Date()
        }
      }
    });
  }
  
  static async getUserResetHistory(usuarioId: string) {
    return prisma.password_reset_tokens.findMany({
      where: {
        usuario_id: usuarioId
      },
      orderBy: {
        criado_em: 'desc'
      }
    });
  }
} 