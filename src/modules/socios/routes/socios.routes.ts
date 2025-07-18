import { Router } from 'express';
import { createSocio, getSocio, getAllSocios, updateSocio, deleteSocio } from '../controllers/socios.controller';
import { validateBody } from '../../../middleware/validate.middleware';
import { createSocioSchema } from '../dto/create-socio.dto';
import { updateSocioSchema } from '../dto/update-socio.dto';

const router = Router();

router.post('/', validateBody(createSocioSchema), createSocio);
router.get('/', getAllSocios);
router.get('/:id', getSocio);
router.put('/:id', validateBody(updateSocioSchema), updateSocio);
router.delete('/:id', deleteSocio);

export default router; 