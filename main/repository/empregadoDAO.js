const mysql = require('../infra/db/mysqldb');

async function salvarEmpregado(empregado){
    const insert = 'insert into empregado(nome,telefone,email,endereco) values (?,?,?,?)'
    const con = await mysql.getConnection();
    const values = [empregado.nome,empregado.telefone,empregado.email,empregado.endereco];
    await con.execute(insert,values);
}

async function listarEmpregados(){
    const select = 'select * from empregado';
    const con = await mysql.getConnection();
    return await con.execute(select);
}

async function pegarEmpregado(id){
    const selectId = ' select * from empregado where id =?'
    const con = await mysql.getConnection();
    const value = [id];
    return await con.execute(selectId,value);
}

async function atualizarEmpregado(empregado){
    const atualizar = 'update  empregado set nome = ?, telefone = ? , email = ? , endereco = ? where id = ?';
    const con = await mysql.getConnection();
    const values = [empregado.nome,empregado.telefone,empregado.email,empregado.endereco,empregado.id];
    await con.execute(atualizar,values);
}

async function deletarEmpregado(id){
    const deletarSQL = 'delete from empregado where id =?'
    const con = await mysql.getConnection();
    const values = [id];
    await con.execute(deletarSQL,values);
}





module.exports = {salvarEmpregado,listarEmpregados,deletarEmpregado,atualizarEmpregado,pegarEmpregado};