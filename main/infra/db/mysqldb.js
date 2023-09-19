
async function getConnection(){
    if(global.connection && global.connection.state == 'disconnected'){
        return global.connection;
    }

    const mysql = await require('mysql2/promise');

    const con = await mysql.createConnection('mysql://root:ifpe@localhost:3306/empregado');
    global.connection = con;
    return con;

}
module.exports = {getConnection}