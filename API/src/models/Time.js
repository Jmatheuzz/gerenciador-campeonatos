import timeQuerys from '../database/time';

export default class Time{
    static async create(time){
        const dados = await timeQuerys.storeTime(time);
        return dados;
    }

    static async delete(idTorneio, nome){
        const dados = await timeQuerys.deleteTime(idTorneio, nome);
        return dados;
    }

    static async indexByCHE(idCliente){
        const dados = await timeQuerys.indexTimesByCHE(idCliente);
        return dados;
    }

    static async indexByNome(nome){
        const dados = await timeQuerys.indexTimesByNome(nome);
        return dados;
    }

    static async update(idCliente, time, nometime){
        const dados = await timeQuerys.updateTimes(idCliente, time, nometime);
        return dados;
    }


}