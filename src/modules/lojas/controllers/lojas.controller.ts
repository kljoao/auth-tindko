import { Request, Response } from 'express';
import { LojasService } from '../services/lojas.service';

export async function createLoja(req: Request, res: Response) {
  try {
    const loja = await LojasService.create(req.body);
    res.status(201).json(loja);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getLoja(req: Request, res: Response) {
  try {
    const loja = await LojasService.getById(req.params.id);
    if (!loja) return res.status(404).json({ error: 'Loja não encontrada' });
    res.json(loja);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getAllLojas(req: Request, res: Response) {
  try {
    const lojas = await LojasService.getAll();
    res.json(lojas);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateLoja(req: Request, res: Response) {
  try {
    const loja = await LojasService.update(req.params.id, req.body);
    res.json(loja);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteLoja(req: Request, res: Response) {
  try {
    await LojasService.delete(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
} 