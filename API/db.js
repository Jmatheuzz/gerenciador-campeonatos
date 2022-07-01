import dotenv from 'dotenv'
dotenv.config();

exports.connect = async function(){ 
    
    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection;
    }
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection(`mysql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE}`);
    console.log("conectou");
    global.connection = connection;
    return connection;

}






