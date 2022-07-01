const {connect} = require('../../db');

exports.indexJogadorByCHE = async function(idTime){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM jogador WHERE id_time=?', idTime); 
    return rows;
}


exports.storeJogador = async function(jogador){
    const conn = await connect();
    const values = [ jogador.id_time, jogador.nome];
    const comandoSql = 'INSERT INTO jogador(id_time, nome) VALUES(?, ?);';
    const rows = conn.query(comandoSql, values);
    return rows;
}

exports.updateJogador = async function(idTime, jogador, nomeJogador){
    const conn = await connect();
    nomeJogador = String(nomeJogador).replace(/-/g, ' ');
    const [rows] = await conn.query('SELECT * FROM Jogador WHERE nome = ?', nomeJogador);

    const values = [jogador.nome || rows[0].nome, nomeJogador, idTime];

    const comandoSql = 'UPDATE jogador SET nome=? WHERE nome=? AND id_time=?';
    const [rows1] = await conn.query(comandoSql, values);
    return rows1;
}

exports.deleteJogador = async function(idTime, nome){
    const conn = await connect();
    const comandoSql = 'DELETE FROM jogador WHERE id_time=? AND nome=?';
    nome = String(nome).replace(/-/g, ' ');
    const values = [idTime, nome];
    const [rows] = await conn.query(comandoSql, values);
    return rows;
}