import { z } from 'zod';

export interface CreateTenantDto {
  razao_social: string;
  nome_fantasia: string;
  cnpj_matriz: string;
  inscricao_estadual: string;
  regime_tributario: string;
  endereco: {
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
  };
  socios: Array<{
    nome: string;
    cpf: string;
    email: string;
    is_dono: boolean;
    participacao: number;
  }>;
}

export const createTenantSchema = z.object({
  razao_social: z.string().min(2),
  nome_fantasia: z.string().min(2),
  cnpj_matriz: z.string().length(14),
  inscricao_estadual: z.string().min(2),
  regime_tributario: z.string().min(2),
  endereco: z.object({
    logradouro: z.string().min(2),
    numero: z.string().min(1),
    complemento: z.string().optional(),
    bairro: z.string().min(2),
    cidade: z.string().min(2),
    uf: z.string().length(2),
    cep: z.string().length(8)
  }),
  socios: z.array(z.object({
    nome: z.string().min(2),
    cpf: z.string().length(11),
    email: z.string().email(),
    is_dono: z.boolean(),
    participacao: z.number().min(0).max(100)
  })).min(1)
}); 