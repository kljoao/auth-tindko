import prisma from '../../../prisma/client';
import { CreateSocioDto } from '../dto/create-socio.dto';
import { UpdateSocioDto } from '../dto/update-socio.dto';

export class SociosService {
  static async create(data: CreateSocioDto) {
    if (data.is_dono) {
      const donoExistente = await prisma.socios.findFirst({ where: { tenant_id: data.tenant_id, is_dono: true } });
      if (donoExistente) throw new Error('Já existe um sócio dono para este tenant');
    }
    return prisma.socios.create({ data });
  }

  static async getById(id: string) {
    return prisma.socios.findUnique({ where: { id } });
  }

  static async getAll() {
    return prisma.socios.findMany();
  }

  static async update(id: string, data: UpdateSocioDto) {
    if (data.is_dono) {
      const socio = await prisma.socios.findUnique({ where: { id } });
      if (!socio) throw new Error('Sócio não encontrado');
      const donoExistente = await prisma.socios.findFirst({ where: { tenant_id: socio.tenant_id, is_dono: true, NOT: { id } } });
      if (donoExistente) throw new Error('Já existe um sócio dono para este tenant');
    }
    return prisma.socios.update({ where: { id }, data });
  }

  static async delete(id: string) {
    return prisma.socios.delete({ where: { id } });
  }
} 