import { Router } from 'express';
import { createLoja, getLoja, getAllLojas, updateLoja, deleteLoja } from '../controllers/lojas.controller';
import { validateBody } from '../../../middleware/validate.middleware';
import { createLojaSchema } from '../dto/create-loja.dto';
import { updateLojaSchema } from '../dto/update-loja.dto';

const router = Router();

router.post('/', validateBody(createLojaSchema), createLoja);
router.get('/', getAllLojas);
router.get('/:id', getLoja);
router.put('/:id', validateBody(updateLojaSchema), updateLoja);
router.delete('/:id', deleteLoja);

export default router; 