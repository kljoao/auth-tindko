import { Request, Response } from 'express';
import { EnderecosService } from '../services/enderecos.service';
import { hasSomeRole } from '../../../config/roles';

export async function createEndereco(req: Request, res: Response) {
  try {
    const endereco = await EnderecosService.create(req.body);
    res.status(201).json(endereco);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getEndereco(req: Request, res: Response) {
  try {
    const endereco = await EnderecosService.getById(req.params.id);
    if (!endereco) return res.status(404).json({ error: 'Endereço não encontrado' });
    res.json(endereco);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getAllEnderecos(req: Request, res: Response) {
  try {
    const enderecos = await EnderecosService.getAll();
    res.json(enderecos);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateEndereco(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    if (!user || !hasSomeRole(user, ['admin_global', 'admin_tenant', 'gerente_regional'])) {
      return res.status(403).json({ error: 'Permissão negada: apenas admin_global, admin_tenant ou gerente_regional podem atualizar endereços.' });
    }
    const endereco = await EnderecosService.update(req.params.id, req.body);
    res.json(endereco);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteEndereco(req: Request, res: Response) {
  try {
    await EnderecosService.delete(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
} 