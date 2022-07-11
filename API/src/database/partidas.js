const {connect} = require('../../db');

exports.indexPartidasByCHE = async function(idTorneio){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM partida WHERE id_torneio=?', idTorneio);
    return rows;
}

exports.indexPartidasByNome = async function(nomePartida){
    const conn = await connect();
    nomePartida = String(nomePartida).replace(/-/g, ' ');
    nomePartida = String(nomePartida).split('+');

    const [[idTime1]] = await conn.query('SELECT id FROM time WHERE nome=?', nomePartida[0]);
    const [[idTime2]] = await conn.query('SELECT id FROM time WHERE nome=?', nomePartida[1]);

    const [rows] = await conn.query('SELECT * FROM partida WHERE id_time1=? AND id_time2=?', [idTime1.id, idTime2.id]); 
    return rows;
}

exports.storePartida = async function(partida){
    const conn = await connect();
    const values = [partida.id_torneio, partida.id_time1, partida.id_time2, partida.data_hora, partida.local, partida.qtd_chutes_time1, partida.qtd_chutes_time2, partida.qtd_faltas_time1, partida.qtd_faltas_time2, partida.placar];

    const comandoSql = 'INSERT INTO partida(id_torneio, id_time1, id_time2, data_hora, local, qtd_chutes_time1, qtd_chutes_time2, qtd_faltas_time1, qtd_faltas_time2, placar) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    const dados = await conn.query(comandoSql, values);
    return dados;
}

exports.updatePartida = async function(idTorneio, partida, nomePartida){
    const conn = await connect();

    nomePartida = String(nomePartida).replace(/-/g, ' ');
    nomePartida = String(nomePartida).split('+');
    const [[idTime1]] = await conn.query('SELECT id FROM time WHERE nome=?', nomePartida[0]);
    const [[idTime2]] = await conn.query('SELECT id FROM time WHERE nome=?', nomePartida[1]);
    const subValues = [idTorneio, idTime1.id, idTime2.id];
    const [[rows]] = await conn.query('SELECT * FROM partida WHERE id_torneio = ? AND id_time1=? AND id_time2=?', subValues);
    
    
    let values = [partida.id_torneio || rows.id_torneio, partida.id_time1 || rows.id_time1, partida.id_time2 || rows.id_time2, partida.data_hora || rows.data_hora, partida.local || rows.local, partida.qtd_chutes_time1 || rows.qtd_chutes_time1, partida.qtd_chutes_time2 || rows.qtd_chutes_time2, partida.qtd_faltas_time1 || rows.qtd_faltas_time1, partida.qtd_faltas_time2 || rows.qtd_faltas_time2, partida.placar ||rows.placar];
    
    values = [...values,...subValues];
    console.log(values)
    const comandoSql = 'UPDATE partida SET id_torneio=?, id_time1=?, id_time2=?, data_hora=?, local=?, qtd_chutes_time1=?, qtd_chutes_time2=?, qtd_faltas_time1=?, qtd_faltas_time2=?, placar=? WHERE id_torneio=? AND id_time1=? AND id_time2=?; ';
    const [rows1] = await conn.query(comandoSql, values);
    return rows1;
}

exports.deletePartida = async function(idTorneio, nomePartida){
    const conn = await connect();
    const comandoSql = 'DELETE FROM partida WHERE id_torneio=? AND id_time1=? AND id_time2=?';
    nomePartida = String(nomePartida).replace(/-/g, ' ');
    nomePartida = String(nomePartida).split('+');
    const [[idTime1]] = await conn.query('SELECT id FROM time WHERE nome=?', nomePartida[0]);
    const [[idTime2]] = await conn.query('SELECT id FROM time WHERE nome=?', nomePartida[1]);
    const values = [idTorneio, idTime1.id, idTime2.id];
    const [rows] = await conn.query(comandoSql, values);
    return rows;
}