import { Router } from 'express';
import { createPapel, getPapel, getAllPapeis, updatePapel, deletePapel } from '../controllers/papeis.controller';
import { validateBody } from '../../../middleware/validate.middleware';
import { createPapelSchema } from '../dto/create-papel.dto';
import { updatePapelSchema } from '../dto/update-papel.dto';

const router = Router();

router.post('/', validateBody(createPapelSchema), createPapel);
router.get('/', getAllPapeis);
router.get('/:id', getPapel);
router.put('/:id', validateBody(updatePapelSchema), updatePapel);
router.delete('/:id', deletePapel);

export default router; 