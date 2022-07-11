const {connect} = require('../../db');

exports.indexFotoByCHE = async function(id){
    const conn = await connect();
    const [rows] = await conn.query('SELECT filename FROM avatar_cliente WHERE id_cliente=?', id);
    return rows;
}

exports.deleteFoto = async function(idUser){
    const conn = await connect();
    const comandoSql = 'DELETE FROM avatar_cliente WHERE id_cliente = ?;';
    const dados = await conn.query(comandoSql, idUser);
    return dados;
}




exports.storeFoto = async function(foto){
    const conn = await connect();
    const values = [foto.originalname, foto.filename, foto.id_cliente];
    const comandoSql = 'INSERT INTO avatar_cliente(originalname, filename, id_cliente) VALUES(?, ?, ?);';
    const dados = await conn.query(comandoSql, values);
    return dados;
}
