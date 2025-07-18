import { Request, Response } from 'express';
import { SociosService } from '../services/socios.service';

export async function createSocio(req: Request, res: Response) {
  try {
    const socio = await SociosService.create(req.body);
    res.status(201).json(socio);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getSocio(req: Request, res: Response) {
  try {
    const socio = await SociosService.getById(req.params.id);
    if (!socio) return res.status(404).json({ error: 'Sócio não encontrado' });
    res.json(socio);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getAllSocios(req: Request, res: Response) {
  try {
    const socios = await SociosService.getAll();
    res.json(socios);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateSocio(req: Request, res: Response) {
  try {
    const socio = await SociosService.update(req.params.id, req.body);
    res.json(socio);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteSocio(req: Request, res: Response) {
  try {
    await SociosService.delete(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
} 