import partidasQuerys from '../database/partidas';

export default class Partida{
    static async create(partida){
        const dados = await partidasQuerys.storePartida(partida);
        return dados;
    }

    static async delete(idTorneio, nome){
        const dados = await partidasQuerys.deletePartida(idTorneio, nome);
        return dados;
    }

    static async indexByCHE(idTorneio){
        const dados = await partidasQuerys.indexPartidasByCHE(idTorneio);
        return dados;
    }

    static async indexByNome(nome){
        const dados = await partidasQuerys.indexPartidasByNome(nome);
        return dados;
    }
    
    static async update(idTorneio, partida, nomePartida){
        const dados = await partidasQuerys.updatePartida(idTorneio, partida, nomePartida);
        return dados;
    }


}