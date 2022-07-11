const {connect} = require('../../db');

exports.indexTorneiosByCHE = async function(id){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM torneio WHERE id_cliente=?', id);
    return rows;
}

exports.indexTorneiosByNome = async function(nome){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM torneio WHERE nome=?', String(nome).replace(/-/g, ' ')); 
    return rows;
}

exports.storeTorneio = async function(torneio){
    const conn = await connect();
    const values = [torneio.nome, torneio.descricao, torneio.qtd_times, torneio.premiacao, torneio.id_cliente];
    const comandoSql = 'INSERT INTO torneio(nome, descricao, qtd_times, premiacao, id_cliente) VALUES(?, ?, ?, ?, ?);';
    const dados = await conn.query(comandoSql, values);
    return dados;
}

exports.updateTorneio = async function(idCliente, torneio, nomeTorneio){
    const conn = await connect();
    nomeTorneio = String(nomeTorneio).replace(/-/g, ' ');
    const [rows] = await conn.query('SELECT * FROM torneio WHERE nome = ?', nomeTorneio);

    const values = [torneio.nome || rows[0].nome, torneio.descricao || rows[0].descricao, torneio.qtd_times || rows[0].qtd_times, torneio.premiacao || rows[0].premiacao, nomeTorneio, idCliente];

    const comandoSql = 'UPDATE torneio SET nome=?, descricao=?, qtd_times=?, premiacao=? WHERE nome=? AND id_cliente=?';
    const [rows1] = await conn.query(comandoSql, values);
    return rows1;
}

exports.deleteTorneio = async function(idCliente, nome){
    const conn = await connect();
    const comandoSql = 'DELETE FROM torneio WHERE id_cliente=? AND nome=?';
    nome = String(nome).replace(/-/g, ' ');
    console.log(nome)

    const values = [idCliente, nome];
    const [rows] = await conn.query(comandoSql, values);
    return rows;
}