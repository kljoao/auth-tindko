import { PrismaClient } from '@prisma/client';
import { CreateEnderecoDto } from '../dto/create-endereco.dto';
import { UpdateEnderecoDto } from '../dto/update-endereco.dto';

const prisma = new PrismaClient();

export class EnderecosService {
  static async create(data: CreateEnderecoDto) {
    return prisma.enderecos.create({ data });
  }

  static async getById(id: string) {
    return prisma.enderecos.findUnique({ where: { id } });
  }

  static async getAll() {
    return prisma.enderecos.findMany();
  }

  static async update(id: string, data: UpdateEnderecoDto) {
    return prisma.enderecos.update({ where: { id }, data });
  }

  static async delete(id: string) {
    return prisma.enderecos.delete({ where: { id } });
  }
} 