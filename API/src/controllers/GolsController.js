import Partidas from '../models/Partidas';
import Jogador from '../models/Jogador';
import Gols from '../models/Gols';

class GolsController{
    async store(req, res) {
        try {
          await Gols.create(req.body, req.params.nomePartida, req.params.nomeJogador);

          return res.json({"sucess":"true"});
        } catch (e) {
          console.log(e)
        }
      }

    async indexByCHE(req, res){

      const golsPartida = await Gols.indexByCHE(req.params.nomePartida);
      return res.json({
        golsPartida
      })
    }
    

    async update(req, res){
      try{
        const [time] = await Time.indexByNome(req.params.nomeTime);

        const nomeJogador = req.params.nomeJogador;
        const novoJogador = req.body;
        await Jogador.update(time.id, novoJogador, nomeJogador);
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

export default new GolsController();