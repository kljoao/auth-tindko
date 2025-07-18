import prisma from '../../../prisma/client';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { UpdateTenantDto } from '../dto/update-tenant.dto';

export class TenantService {
  static async create(data: CreateTenantDto) {
    return prisma.$transaction(async (tx) => {
      // 1. Criar endereço
      const endereco = await tx.enderecos.create({ data: data.endereco });
      // 2. Criar tenant
      const tenant = await tx.tenants.create({
        data: {
          razao_social: data.razao_social,
          nome_fantasia: data.nome_fantasia,
          cnpj_matriz: data.cnpj_matriz,
          inscricao_estadual: data.inscricao_estadual,
          regime_tributario: data.regime_tributario,
          endereco_id: endereco.id
        }
      });
      // 3. Criar sócios
      const socios = await Promise.all(
        data.socios.map((socio) =>
          tx.socios.create({
            data: {
              tenant_id: tenant.id,
              nome: socio.nome,
              cpf: socio.cpf,
              email: socio.email,
              is_dono: socio.is_dono,
              participacao: socio.participacao
            }
          })
        )
      );
      return {
        tenant,
        endereco,
        socios
      };
    });
  }

  static async getById(id: string) {
    return prisma.tenants.findUnique({ where: { id } });
  }

  static async getAll() {
    return prisma.tenants.findMany();
  }

  static async update(id: string, data: UpdateTenantDto) {
    return prisma.tenants.update({ where: { id }, data });
  }

  static async delete(id: string) {
    return prisma.tenants.delete({ where: { id } });
  }
} 