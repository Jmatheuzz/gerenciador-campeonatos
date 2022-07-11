import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';

import fotoController from '../controllers/FotoController';

const router = new Router();

router.post('/create', loginRequired, fotoController.store);
router.post('/update', loginRequired, fotoController.update);

export default router;