import prisma from '../../../prisma/client';
import { CreateLojaDto } from '../dto/create-loja.dto';
import { UpdateLojaDto } from '../dto/update-loja.dto';

export class LojasService {
  static async create(data: CreateLojaDto) {
    const lojaExistente = await prisma.lojas.findFirst({
      where: { endereco_id: data.endereco_id }
    });
    
    if (lojaExistente) {
      throw new Error('Já existe uma loja cadastrada neste endereço');
    }
    
    return prisma.lojas.create({ data });
  }

  static async getById(id: string) {
    return prisma.lojas.findUnique({ where: { id } });
  }

  static async getAll() {
    return prisma.lojas.findMany();
  }

  static async update(id: string, data: UpdateLojaDto) {
    if (data.endereco_id) {
      const lojaExistente = await prisma.lojas.findFirst({
        where: { 
          endereco_id: data.endereco_id,
        }
      });
      
      if (lojaExistente) {
        throw new Error('Já existe uma loja cadastrada neste endereço');
      }
    }
    
    return prisma.lojas.update({ where: { id }, data });
  }

  static async delete(id: string) {
    return prisma.lojas.delete({ where: { id } });
  }
}