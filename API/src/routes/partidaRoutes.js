import {Router} from 'express';
import partidaController from '../controllers/PartidaController';
import loginRequired from '../middlewares/loginRequired';
const router = new Router();

router.get('/:nomeTorneio/index', loginRequired, partidaController.indexByCHE);
router.post('/:nomeTorneio/:nomeTime1/:nomeTime2/create', loginRequired,  partidaController.store);
router.delete('/:nomeTorneio/:nomePartida/delete', loginRequired,  partidaController.delete);
router.put('/:nomeTorneio/:nomePartida/update', loginRequired,  partidaController.update);


export default router;