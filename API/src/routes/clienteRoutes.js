import {Router} from 'express';
import clienteController from '../controllers/ClienteController';
import loginRequired from '../middlewares/loginRequired';
const router = new Router();

router.post('/cadastro', clienteController.store);
router.put('/atualizar/', loginRequired, clienteController.update);
router.delete('/apagar/', loginRequired, clienteController.delete);
router.get('/index', loginRequired, clienteController.show);

export default router;