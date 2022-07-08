import jogadorQuerys from '../database/jogador';

export default class Jogador{
    static async create(Jogador){
        const dados = await jogadorQuerys.storeJogador(Jogador);
        return dados;
    }

    static async delete(idTime, nome){
        const dados = await jogadorQuerys.deleteJogador(idTime, nome);
        return dados;
    }

    static async indexByCHE(idTime){
        const dados = await jogadorQuerys.indexJogadorByCHE(idTime);
        return dados;
    }

    static async update(idTime, Jogador, nomeJogador){
        const dados = await jogadorQuerys.updateJogador(idTime, Jogador, nomeJogador);
        return dados;
    }


}