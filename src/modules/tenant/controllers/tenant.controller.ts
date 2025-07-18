import { Request, Response } from 'express';
import { TenantService } from '../services/tenant.service';
import { hasSomeRole } from '../../../config/roles';

export async function createTenant(req: Request, res: Response) {
  try {
    const ADMIN_GLOBAL_ID = process.env.admin_global as string;
    const user = (req as any).user;
    if (!user || !hasSomeRole(user, ['admin_global'])) {
      return res.status(403).json({ error: 'Apenas admin_global pode criar tenant.' });
    }
    const result = await TenantService.create(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getTenant(req: Request, res: Response) {
  try {
    const tenant = await TenantService.getById(req.params.id);
    if (!tenant) return res.status(404).json({ error: 'Tenant não encontrado' });
    res.json(tenant);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getAllTenants(req: Request, res: Response) {
  try {
    const tenants = await TenantService.getAll();
    res.json(tenants);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateTenant(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    if (!user || !hasSomeRole(user, ['admin_global', 'admin_tenant'])) {
      return res.status(403).json({ error: 'Permissão negada: apenas admin_global ou admin_tenant pode alterar tenant.' });
    }
    const tenant = await TenantService.update(req.params.id, req.body);
    res.json(tenant);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteTenant(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    if (!user || !hasSomeRole(user, ['admin_global', 'admin_tenant'])) {
      return res.status(403).json({ error: 'Permissão negada: apenas admin_global ou admin_tenant pode deletar tenant.' });
    }
    await TenantService.delete(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
} 