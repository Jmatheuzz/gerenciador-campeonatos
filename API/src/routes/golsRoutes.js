import {Router} from 'express';
import golsController from '../controllers/golsController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/:nomePartida/index/', loginRequired, golsController.indexByCHE);
router.post('/:nomePartida/:nomeJogador/create/', loginRequired, golsController.store);


export default router;