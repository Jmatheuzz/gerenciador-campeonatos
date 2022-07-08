import {Router} from 'express';
import torneioController from '../controllers/TorneioController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/index/', loginRequired, torneioController.indexByCHE);
router.post('/create/', loginRequired, torneioController.store);
router.delete('/delete/:nome', loginRequired, torneioController.delete);
router.put('/update/:nome', loginRequired, torneioController.update);

export default router;