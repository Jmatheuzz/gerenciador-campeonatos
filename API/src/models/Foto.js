import fotoQuerys from '../database/foto';

export default class Foto{
    static async create(foto){
        const dados = await fotoQuerys.storeFoto(foto);
        return dados;
    }

    static async delete(idUser){
        const dados = await fotoQuerys.deleteFoto(idUser);
        return dados;
    }

    static async indexByCHE(id){
        const dados = await fotoQuerys.indexFotoByCHE(id);
        return dados;
    }



}