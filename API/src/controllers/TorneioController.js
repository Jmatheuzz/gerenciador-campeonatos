import Torneio from '../models/Torneio';


class TorneioController{
    async store(req, res) {
        try {
          const novoTorneio = await Torneio.create({
            id_cliente:req.userId,
            ...req.body
          });
          console.log(novoTorneio)
          const {nome, descricao } = novoTorneio;
          return res.json({"sucess":"true"});
        } catch (e) {
          return res.status(400).json(
            {
              errors: e.errors.map((err) => err.message)
            }
          );
        }
      }
    async indexByCHE(req, res){
      const idCliente = req.userId;
      const torneios = await Torneio.index(idCliente);
      return res.json({
        torneios
      })
    }
    
    async delete(req, res){
      try{
        const idCliente = req.userId;
        const nomeTorneio = req.params.nome;
        await Torneio.delete(idCliente, nomeTorneio);
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
        const idCliente = req.userId;
        const nomeTorneio = req.params.nome;
        const novoTorneio = req.body;
        await Torneio.update(idCliente, novoTorneio, nomeTorneio);
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

export default new TorneioController();