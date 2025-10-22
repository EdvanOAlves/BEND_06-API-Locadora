/**************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MYSQL referente ao gênero
 * Autor: Edvan Alves
 * Data: 22/10/2025
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

// import da dependencia do prisma, para execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma');

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient;


// Retorna todos os generos do banco de dados
const getSelectAllGenres = async function () {
    try {
        //script SQL
        let sql = `SELECT * FROM tbl_genero ORDER BY genero_id DESC`

        //Encaminha o script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result;
        else
            return false;

    } catch (error) {
        // console.log(error);
        return false;
    }

}

// Retorna o gênero do Banco de dados, filtrando por id
const getSelectByIdGenres = async function (id) {
    try {
        //script SQL
        let sql = `SELECT * FROM tbl_genero  where genero_id =${id}`

        //Encaminha o script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result;
        else
            return false;

    } catch (error) {
        // console.log(error);
        return false;
    }

}

//Retorna o Id do ultimo genero registrado
const getSelectLastId = async function () {
    try {
        //Script SQL
        let sql = `SELECT genero_id FROM tbl_genero ORDER BY genero_id DESC LIMIT 1`;

        //Encaminha o script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql);

        if (Array.isArray(result)) {
            return Number(result[0].genero_id);
        }
        else {
            return false;
        }

    } catch (error) {
        return false;
    }
}

// Insere um genero novo no banco de dados
const setInsertGenres = async function (genero) {
    try {
        let sql = `INSERT INTO tbl_genero(nome)
    VALUES(
        '${genero.nome}');`

        //executeRawUnsafe -> Para executar script SQL sem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        console.log(error);
        return false
    }

}

// Altera um genero no banco de dados
const setUpdateGenres = async function (genero) {
    try {
        let sql = `UPDATE tbl_genero
        SET 
            nome = '${genero.nome}'
        WHERE genero_id = ${genero.id};`

        //executeRawUnsafe -> Para executar script SQL sem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql);
        if (result) {
            return true;
        }
        else
            return false;
    } catch (error) {
        return false
    }

}

// Exclui um genero pelo id no banco de dados
const setDeleteGenres = async function (id) {
    try {
        let sql = `DELETE FROM tbl_genero
        WHERE genero_id = ${id};`

        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true;
        else
            return false;
    } catch (error) {
        console.log(error)
        return false;
    }
}

module.exports = {
    getSelectAllGenres,
    getSelectByIdGenres,
    getSelectLastId,
    setInsertGenres,
    setUpdateGenres,
    setDeleteGenres
}