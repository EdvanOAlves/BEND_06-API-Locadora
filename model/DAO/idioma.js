/**************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MYSQL referente ao idioma
 * Autor: Edvan Alves
 * Data: 29/10/2025
 * Versão: 1.0.10.25
**************************************************************************************************/

/*************************************************************************************************/
//COMANDOS UTILIZADOS

//$queryRawUnsafe -> permite executar um script SQL de uma variável 
// E que retorna valores do banco (SELECT)
//$executeRawUnsafe -> permite executar um script SQL de uma variável
//E NÃO retorna dados do banco (INSERT, UPDATE, DELETE)

//$queryRaw -> permite executar um script SQL
//SEM estar em uma variável e que retorna valores do banco (SELECT)
//Faz tratamentos de segurança contra SQL Injection
//$executeRaw -> Permite executar um script SQL
//SEM estar em uma variável
//E NÃO retorna dados do banco
//faz tratamentos de segurança contra SQL Injection

/**************************************************************************************************/

/*************************************************************************************************/
//BIBLIOTECAS UTILIZADAS

/*************************************************************************************************/
/*
    Exemplos de dependências para conexões com o BD
        Para Banco de Dados Relacionais
        Sequelize   -> muito utilizado em projetos desde o inicio do node
        Prisma      -> dependência mais atual que trabalha com BD (MYSQL, PostgreSQL, SQL Server) (SQL ou ORM)
            npm install prisma --save          ->Instalar o prisma(conexão com o Database)
            npm install @prisma/client --save  ->Instalar o cliente do Prisma(Executar scripts SQL no DB)    
        //Comandos do prisma
            npx prisma init                     -> Prompt de comando para inicializar o prisma no projeto
            npx prisma migrate dev              -> Sincroniza o primsa e DB, precisa de um npx prisma migrate reset
            npx prisma migrate reset            -> Vai resetar o banco de dados direcionado no schema.prisma (Cuidado)

            npx prisma generate                 -> Sincroniza o prisma e o DB, geralmente utilizado para rodar o projeto em um pc novo
            
        Knex        -> dependência atual que trabalha com MYSQL

        Para Banco de Dados não Relacionais
        Mongoose    -> dependência para o MongoDB (Não relacional)
*/

// Importando dependência do Prisma
const {PrismaClient} = require('../../generated/prisma');

//Criando novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient;

// Retorna todos os idiomas cadastrados
const getSelectAllLanguages = async function() {
    try {
        //Script SQL
        let sql = `SELECT * FROM tbl_idioma ORDER BY idioma_id DESC` 

        //Realizando busca no DB
        let result = await prisma.$queryRawUnsafe(sql)
        

        if (Array.isArray(result)){
            return result;
        }else
            return false;
        
    } catch (error) {
        return false;
        
    }
}

// Retorna um idioma correspondente ao id
const getSelectByIdLanguages = async function(id){
    try {
        //Script SQL
        let sql = `SELECT * FROM tbl_idioma
        WHERE idioma_id = ${id}`;

        //Realizando busca no DB
        let result = await prisma.$queryRawUnsafe(sql);
        
        if (Array.isArray(result))
            return result;
        else
            return false
    } catch (error) {
        return false;
        
    }
}

// Retorna o id do último idioma cadastrado
const getSelectLastId = async function(){
    try {
        // Script SQL
        let sql = `SELECT idioma_id FROM tbl_idioma ORDER BY idioma_id DESC LIMIT 1`
        
        // Realizando busca no DB
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].idioma_id);
        else
            return false;
    } catch (error) {
        return false;
    }
}

// Insere um registro de idioma no DB
const setInsertLanguages = async function(idioma){
    try {
        // Script SQL
        let sql = `INSERT INTO tbl_idioma(nome)
        VALUES (
        '${idioma.nome}');`

        // Executando no DB
        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true;
        else
            return false;
        
    } catch (error) {
        // console.log(error)
        return false;
    }
}

// Atualiza o registro de um idioma no DB
const setUpdateLanguages = async function(idioma){
    try {
        // Script SQL
        let sql = `UPDATE tbl_idioma
        SET
            nome = '${idioma.nome}'
        WHERE idioma_id = ${idioma.id}`

        // Executando no DB
        let result = await prisma.$executeRawUnsafe(sql);
        
        if (result)
            return true;
        else
            return false;
        
    } catch (error) {
        // console.log(error)
        return false
        
    }
}

// Deleta o registro de um idioma no DB
const setDeleteLanguages = async function(id){
    try {
        // Script SQL
        let sql = `DELETE FROM tbl_idioma
        WHERE idioma_id = ${id}`

        // Executando no DB
        
    } catch (error) {
        // console.log(error)
        return false;
        
    }
}



module.exports = {
    getSelectAllLanguages,
    getSelectByIdLanguages,
    getSelectLastId,
    setInsertLanguages,
    setUpdateLanguages,
    setDeleteLanguages
}