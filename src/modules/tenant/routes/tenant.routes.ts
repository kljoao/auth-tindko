import { Router } from 'express';
import { createTenant, getTenant, getAllTenants, updateTenant, deleteTenant } from '../controllers/tenant.controller';
import { authenticateJWT } from '../../../middleware/auth.middleware';
import { validateBody } from '../../../middleware/validate.middleware';
import { createTenantSchema } from '../dto/create-tenant.dto';
import { updateTenantSchema } from '../dto/update-tenant.dto';

const router = Router();

router.post('/', authenticateJWT, validateBody(createTenantSchema), createTenant);
router.get('/', getAllTenants);
router.get('/:id', getTenant);
router.put('/:id', validateBody(updateTenantSchema), updateTenant);
router.delete('/:id', deleteTenant);

export default router; 