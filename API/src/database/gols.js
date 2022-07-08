const {connect} = require('../../db');

exports.indexGolsByCHE = async function(nomePartida){
    const conn = await connect();
    nomePartida = String(nomePartida).replace(/-/g, ' ');
    nomePartida = String(nomePartida).split('+');
    const [[idTime1]] = await conn.query('SELECT id FROM time WHERE nome=?', nomePartida[0]);
    const [[idTime2]] = await conn.query('SELECT id FROM time WHERE nome=?', nomePartida[1]);

    const values1 = [idTime1.id, idTime2.id];

    const [[partida]] = await conn.query('SELECT id FROM partida WHERE id_time1=? AND id_time2=?', values1);
    const [rows] = await conn.query('SELECT * FROM gols WHERE id_partida=?', partida.id); 
    return rows;
}


exports.storeGols = async function(gols, nomePartida, nomeJogador){
    const conn = await connect();
    nomePartida = String(nomePartida).replace(/-/g, ' ');
    nomePartida = String(nomePartida).split('+');

    nomeJogador = String(nomeJogador).replace(/-/g, ' ');

    const [[idTime1]] = await conn.query('SELECT id FROM time WHERE nome=?', nomePartida[0]);
    const [[idTime2]] = await conn.query('SELECT id FROM time WHERE nome=?', nomePartida[1]);

    const values1 = [idTime1.id, idTime2.id];

    const [[partida]] = await conn.query('SELECT id FROM partida WHERE id_time1=? AND id_time2=?', values1);
    const [[jogador]] = await conn.query('SELECT id FROM jogador WHERE nome = ?', nomeJogador);
    
    const values = [ partida.id, jogador.id, gols.qtd_gols, gols.gol_contra];
    const comandoSql = 'INSERT INTO gols(id_partida, id_jogador, qtd_gols, gol_contra) VALUES(?, ?, ?, ?);';
    const rows = await conn.query(comandoSql, values);
    return rows;
}
