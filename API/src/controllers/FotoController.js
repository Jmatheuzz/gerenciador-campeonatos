import multer from 'multer';
import multerConfig from '../config/multerConfig';

import Foto from '../models/Foto';
let fs = require('fs');

const upload = multer(multerConfig).single('avatar-cliente');

class FotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const id_cliente = req.userId;
        await Foto.create({ originalname, filename, id_cliente });
        return res.json({"sucess":"true"});
      } catch (e) {
        console.log(e)
      }
    });
  }

  async update(req, res){
    await Foto.delete(req.userId);
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const id_cliente = req.userId;
        await Foto.create({ originalname, filename, id_cliente });
        return res.json({"sucess":"true"});
      } catch (e) {
        console.log(e)
      }
    });
  }
}

export default new FotoController();