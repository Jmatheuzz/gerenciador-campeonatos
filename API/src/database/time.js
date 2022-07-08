const {connect} = require('../../db');

exports.indexTimesByCHE = async function(idTorneio){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM time WHERE id_torneio=?', idTorneio); 
    return rows;
}
exports.indexTimesByNome = async function(nomeTime){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM time WHERE nome=?', nomeTime); 
    return rows;
}


exports.storeTime = async function(time){
    const conn = await connect();
    const values = [ time.id_torneio, time.nome, time.abrev];
    const comandoSql = 'INSERT INTO time(id_torneio, nome, abrev) VALUES(?, ?, ?);';
    const rows = conn.query(comandoSql, values);
    return rows;
}

exports.updateTimes = async function(idTorneio, times, nomeTime){
    const conn = await connect();
    nomeTime = String(nomeTime).replace(/-/g, ' ');
    const [rows] = await conn.query('SELECT * FROM time WHERE nome = ?', nomeTime);

    const values = [times.nome || rows[0].nome, times.abrev || rows[0].abrev, nomeTime, idTorneio];

    const comandoSql = 'UPDATE time SET nome=?, abrev=? WHERE nome=? AND id_torneio=?';
    const [rows1] = await conn.query(comandoSql, values);
    return rows1;
}

exports.deleteTime = async function(idTorneio, nome){
    const conn = await connect();
    const comandoSql = 'DELETE FROM time WHERE id_torneio=? AND nome=?';
    nome = String(nome).replace(/-/g, ' ');
    const values = [idTorneio, nome];
    const [rows] = await conn.query(comandoSql, values);
    return rows;
}