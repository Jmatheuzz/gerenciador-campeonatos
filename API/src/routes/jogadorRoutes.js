import {Router} from 'express';
import jogadorController from '../controllers/JogadorController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/:nomeTime/index', loginRequired, jogadorController.indexByCHE);
router.post('/:nomeTime/create/', loginRequired, jogadorController.store);
router.delete('/:nomeTime/:nomeJogador/delete/', loginRequired, jogadorController.delete);
router.put('/:nomeTime/:nomeJogador/update/', loginRequired, jogadorController.update);


export default router;