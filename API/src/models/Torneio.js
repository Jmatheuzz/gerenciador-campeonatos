import torneioQuerys from '../database/torneio';

export default class Torneio{
    static async create(torneio){
        const dados = await torneioQuerys.storeTorneio(torneio);
        return dados;
    }

    static async delete(idCliente, nome){
        const dados = await torneioQuerys.deleteTorneio(idCliente, nome);
        return dados;
    }

    static async index(idCliente){
        const dados = await torneioQuerys.indexTorneiosByCHE(idCliente);
        return dados;
    }

    static async indexByNome(nome){
        const dados = await torneioQuerys.indexTorneiosByNome(nome);
        return dados;
    }
    
    static async update(idCliente, torneio, nomeTorneio){
        const dados = await torneioQuerys.updateTorneio(idCliente, torneio, nomeTorneio);
        return dados;
    }


}