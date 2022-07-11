const bcryptjs = require("bcryptjs");
const {connect} = require('../../db');

exports.indexClientes = async function(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM clientes;');
    return rows;
}

exports.showClienteById = async function(id){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM clientes WHERE id=?', id);
    return rows[0];
}

exports.showClienteByEmail = async function(email){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM clientes WHERE email=?', email);
    return rows[0];
}

exports.showCliente = async function(id, email){
    const conn = await connect();
    const values = [email, id];
    const [rows] = await conn.query('SELECT * FROM clientes WHERE email=? AND id=?', values);
    return rows[0];
}

exports.storeCliente = async function(cliente){
    const conn = await connect();
    cliente.password = await bcryptjs.hash(cliente.password, 8);
    const values = [cliente.nome, cliente.email, cliente.password];
    const comandoSql = 'INSERT INTO clientes(nome, email, password_hash) VALUES(?, ?, ?);';
    const [rows] = await conn.query(comandoSql, values);
    return rows
}

exports.updateCliente = async function(cliente, id){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM clientes WHERE id = ?', id);

    cliente.password ? cliente.password = await bcryptjs.hash(cliente.password, 8) : cliente.password = rows[0].password_hash;
    const values = [cliente.nome || rows[0].nome, cliente.email || rows[0].email, cliente.password, id];
    const comandoSql = 'UPDATE clientes SET nome=?, email=?, password_hash=? WHERE id=?';
    const [rows1] = await conn.query(comandoSql, values);
    return rows1;
}

exports.deleteCliente = async function(id){
    const conn = await connect();

    const comandoSql = 'DELETE FROM clientes WHERE id=?';
    const [rows] = await conn.query(comandoSql, id);
    return rows 
}