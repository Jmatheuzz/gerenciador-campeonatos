import fotoQuerys from '../database/foto';

export default class Foto{
    static async create(foto){
        const dados = await fotoQuerys.storeFoto(foto);
        return dados;
    }

    static async delete(idTime, nome){
        const dados = await fotoQuerys.deleteFoto(idTime, nome);
        return dados;
    }

    static async indexByCHE(id){
        const dados = await fotoQuerys.indexFotoByCHE(id);
        return dados;
    }

    static async update(idTime, foto, nomeJogador){
        const dados = await fotoQuerys.updateFoto(idTime, Jogador, nomeJogador);
        return dados;
    }


}