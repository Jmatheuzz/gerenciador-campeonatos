import Time from '../models/Time';
import Torneio from '../models/Torneio';

class TimeController{
    async store(req, res) {
        try {
          const [torneio] = await Torneio.indexByNome(req.params.nome.replace(/-/g, ' '));
          await Time.create({
            id_torneio:torneio.id,
            ...req.body
          });

          return res.json({"sucess":"true"});
        } catch (e) {
          console.log(e)
        }
      }
    async indexByCHE(req, res){
      const [torneio] = await Torneio.indexByNome(req.params.nome.replace(/-/g, ' '));
      const Times = await Time.indexByCHE(torneio.id);
      return res.json({
        Times
      })
    }
    
    async delete(req, res){
      try{
        const [torneio] = await Torneio.indexByNome(req.params.nome);

        const nomeTime = req.params.nomeTime;
        await Time.delete(torneio.id, nomeTime);
        return res.json({
          "sucess":"true"
        })
      }catch(e){
        return res.status(400).json(
          console.log(e)
        );
      }

    }

    async update(req, res){
      try{
        const [torneio] = await Torneio.indexByNome(req.params.nome);

        const nomeTime = req.params.nomeTime;
        const novoTime = req.body;
        await Time.update(torneio.id, novoTime, nomeTime);
        return res.json({
          "sucess":"true"
        })
      }catch(e){
        return res.status(400).json(
          console.log(e)
        );
      }

    }
}

export default new TimeController();