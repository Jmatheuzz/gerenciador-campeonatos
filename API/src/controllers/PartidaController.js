import Partidas from '../models/Partidas';
import Torneio from '../models/Torneio';
import Time from '../models/Time';

class PartidaController{
    async store(req, res) {
        try {
          const [torneio] = await Torneio.indexByNome(req.params.nomeTorneio);
          const [time1] = await Time.indexByNome(req.params.nomeTime1);
          const [time2] = await Time.indexByNome(req.params.nomeTime2);
          await Partidas.create({
            id_torneio:torneio.id,
            id_time1: time1.id,
            id_time2: time2.id,
            ...req.body
          });

          return res.json({"sucess":"true"});
        } catch (e) {
          console.log(e)
        }
      }
    async indexByCHE(req, res){
      const [torneio] = await Torneio.indexByNome(req.params.nome);
      const Times = await Time.indexByCHE(torneio.id);
      return res.json({
        Times
      })
    }
    
    async delete(req, res){
      try{
        console.log(req.params.nomePartida)
        const [torneio] = await Torneio.indexByNome(req.params.nomeTorneio);

        const nomePartida = req.params.nomePartida;
        await Partidas.delete(torneio.id, nomePartida);
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
        const [torneio] = await Torneio.indexByNome(req.params.nomeTorneio);

        const nomePartida = req.params.nomePartida;

        const novaPartida = req.body;
        await Partidas.update(torneio.id, novaPartida, nomePartida);
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

export default new PartidaController();