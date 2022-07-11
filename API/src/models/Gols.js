import golsQuerys from '../database/gols';

export default class Gols{
    static async create(gols, nomePartida, nomeJogador){
        const dados = await golsQuerys.storeGols(gols, nomePartida, nomeJogador);
        return dados;
    }

    static async indexByCHE(nomePartida){
        const dados = await golsQuerys.indexGolsByCHE(nomePartida);
        return dados;
    }

    static async update(idTime, gols, nomeGols){
        const dados = await golsQuerys.updateGols(idTime, gols, nomeGols);
        return dados;
    }


}