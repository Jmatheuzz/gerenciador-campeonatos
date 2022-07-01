import Time from '../models/Time';
import Jogador from '../models/Jogador';

class JogadorController{
    async store(req, res) {
        try {
          const [time] = await Time.indexByNome(req.params.nomeTime);
          await Jogador.create({
            id_time:time.id,
            ...req.body
          });

          return res.json({"sucess":"true"});
        } catch (e) {
          return res.status(400).json({
            errors: e.errors.map((err) => err.message),
          });
        }
      }
    async indexByCHE(req, res){
      const [time] = await Time.indexByNome(req.params.nomeTime);
      const jogadores = await Jogador.indexByCHE(time.id);
      return res.json({
        jogadores
      })
    }
    
    async delete(req, res){
      try{
        const [time] = await Time.indexByNome(req.params.nomeTime);

        const nomeJogador = req.params.nomeJogador;
        await Jogador.delete(time.id, nomeJogador);
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

export default new JogadorController();