import {Router} from 'express';
import timeController from '../controllers/TimeController';
import loginRequired from '../middlewares/loginRequired';


const router = new Router();

router.get('/:nome/index/', loginRequired, timeController.indexByCHE);
router.post('/:nome/create/', loginRequired, timeController.store);
router.delete('/:nome/delete/:nomeTime/', loginRequired, timeController.delete);
router.put('/:nome/update/:nomeTime', loginRequired, timeController.update);


export default router;