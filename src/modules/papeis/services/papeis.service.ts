import prisma from '../../../prisma/client';
import { CreatePapelDto } from '../dto/create-papel.dto';
import { UpdatePapelDto } from '../dto/update-papel.dto';

export class PapeisService {
  static async create(data: CreatePapelDto) {
    return prisma.papeis.create({ data });
  }

  static async getById(id: string) {
    return prisma.papeis.findUnique({ where: { id } });
  }

  static async getAll() {
    return prisma.papeis.findMany();
  }

  static async update(id: string, data: UpdatePapelDto) {
    return prisma.papeis.update({ where: { id }, data });
  }

  static async delete(id: string) {
    return prisma.papeis.delete({ where: { id } });
  }
} 