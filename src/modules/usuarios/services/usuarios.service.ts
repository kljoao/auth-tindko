import prisma from '../../../prisma/client';
import bcrypt from 'bcrypt';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';

export class UsuariosService {
  static async create(data: CreateUsuarioDto) {
    const ADMIN_GLOBAL_ID = process.env.admin_global;
    if (data.papel_id !== ADMIN_GLOBAL_ID && !data.tenant_id) {
      throw new Error('tenant_id é obrigatório para usuários que não são admin_global');
    }
    const senha_hash = await bcrypt.hash(data.senha, 10);
    const { senha, tenant_id, ...rest } = data;
    let dataToCreate: any = { ...rest, senha_hash };
    if (tenant_id !== undefined) {
      dataToCreate.tenant_id = tenant_id;
    }
    return prisma.usuarios.create({
      data: dataToCreate
    });
  }

  static async getById(id: string) {
    return prisma.usuarios.findUnique({ where: { id } });
  }

  static async getAll() {
    return prisma.usuarios.findMany();
  }

  static async update(id: string, data: UpdateUsuarioDto) {
    const ADMIN_GLOBAL_ID = process.env.admin_global;
    if (data.papel_id && data.papel_id !== ADMIN_GLOBAL_ID && !data.tenant_id) {
      throw new Error('tenant_id é obrigatório para usuários que não são admin_global');
    }
    let updateData: any = { ...data };
    if (data.senha) {
      updateData.senha_hash = await bcrypt.hash(data.senha, 10);
      delete updateData.senha;
    }
    return prisma.usuarios.update({ where: { id }, data: updateData });
  }

  static async delete(id: string) {
    return prisma.usuarios.delete({ where: { id } });
  }
} 