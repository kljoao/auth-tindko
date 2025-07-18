import { Request, Response } from 'express';
import { PapeisService } from '../services/papeis.service';
import { hasRole } from '../../../config/roles';

export async function createPapel(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    if (!user || !hasRole(user, 'admin_global')) {
      return res.status(403).json({ error: 'Permissão negada: apenas admin_global pode criar perfis.' });
    }
    const papel = await PapeisService.create(req.body);
    res.status(201).json(papel);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getPapel(req: Request, res: Response) {
  try {
    const papel = await PapeisService.getById(req.params.id);
    if (!papel) return res.status(404).json({ error: 'Papel não encontrado' });
    res.json(papel);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getAllPapeis(req: Request, res: Response) {
  try {
    const papeis = await PapeisService.getAll();
    res.json(papeis);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function updatePapel(req: Request, res: Response) {
  try {
    const papel = await PapeisService.update(req.params.id, req.body);
    res.json(papel);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function deletePapel(req: Request, res: Response) {
  try {
    await PapeisService.delete(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
} 