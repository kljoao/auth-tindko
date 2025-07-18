import { Router } from 'express';
import { createEndereco, getEndereco, getAllEnderecos, updateEndereco, deleteEndereco } from '../controllers/enderecos.controller';
import { validateBody } from '../../../middleware/validate.middleware';
import { createEnderecoSchema } from '../dto/create-endereco.dto';
import { updateEnderecoSchema } from '../dto/update-endereco.dto';

const router = Router();

router.post('/', validateBody(createEnderecoSchema), createEndereco);
router.get('/:id', getEndereco);
router.get('/', getAllEnderecos);
router.put('/:id', validateBody(updateEnderecoSchema), updateEndereco);
router.delete('/:id', deleteEndereco);

export default router; 