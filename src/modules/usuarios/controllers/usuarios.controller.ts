import { Request, Response } from 'express';
import { UsuariosService } from '../services/usuarios.service';
import { createUsuarioSchema } from '../dto/create-usuario.dto';
import { updateUsuarioSchema } from '../dto/update-usuario.dto';
import { hasSomeRole, isSelfOrHasSomeRole } from '../../../config/roles';

export async function createUsuario(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    if (!user || !hasSomeRole(user, ['admin_global', 'admin_tenant', 'gerente_regional', 'gerente'])) {
      return res.status(403).json({ error: 'Permissão negada: apenas admin_global, admin_tenant, gerente_regional ou gerente podem criar usuários.' });
    }
    const parse = createUsuarioSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'Dados inválidos', details: parse.error.issues });
    }
    const usuario = await UsuariosService.create(parse.data);
    res.status(201).json(usuario);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getUsuario(req: Request, res: Response) {
  try {
    const usuario = await UsuariosService.getById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getAllUsuarios(req: Request, res: Response) {
  try {
    const usuarios = await UsuariosService.getAll();
    res.json(usuarios);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateUsuario(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    if (!user || !isSelfOrHasSomeRole(user, req.params.id, ['admin_global', 'admin_tenant', 'gerente_regional', 'gerente'])) {
      return res.status(403).json({ error: 'Permissão negada: apenas o próprio usuário ou admin_global, admin_tenant, gerente_regional ou gerente podem atualizar este usuário.' });
    }
    const parse = updateUsuarioSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'Dados inválidos', details: parse.error.issues });
    }
    const usuario = await UsuariosService.update(req.params.id, parse.data);
    res.json(usuario);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteUsuario(req: Request, res: Response) {
  try {
    await UsuariosService.delete(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getMe(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ error: 'Não autenticado' });
    }
    const usuario = await UsuariosService.getById(user.id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
} 