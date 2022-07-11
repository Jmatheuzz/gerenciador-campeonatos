import Partidas from '../models/Partidas';
import Torneio from '../models/Torneio';
import Time from '../models/Time';
import Partida from '../models/Partidas';

class PartidaController{
    async store(req, res) {
        try {
          const [torneio] = await Torneio.indexByNome(req.params.nomeTorneio.replace(/-/g, ' '));
          console.log(torneio, req.params.nomeTorneio.replace(/ /g, '-'))
          const [time1] = await Time.indexByNome(req.params.nomeTime1.replace(/-/g, ' '));
          const [time2] = await Time.indexByNome(req.params.nomeTime2.replace(/-/g, ' '));
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
      const [torneio] = await Torneio.indexByNome(req.params.nomeTorneio.replace(/-/g, ' '));
      console.log(torneio);
      const partidas = await Partida.indexByCHE(torneio.id);
      return res.json({
        partidas
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