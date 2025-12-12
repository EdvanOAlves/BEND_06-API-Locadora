/**************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MYSQL referente ao relacionamento entre ator e filme (por meio do personagem)
 * Autor: Edvan Alves
 * Data: 10/12/2025
 * Versão: 1.0.12.25
**************************************************************************************************/

// import da dependencia do prisma, para execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma');

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient;


// Retorna todos os personagens do banco de dados
const getSelectAllCharacters = async function () {
    try {
        //script SQL
        let sql = `SELECT 
        tbl_profissional.profissional_id, tbl_profissional.nome
        tbl_personagem.personagem_id, tbl_personagem.nome, tbl_personagem.papel,
        tbl_filme.filme_id, tbl_filme_nome
        * FROM tbl_filme_genero 
        JOIN tbl_filme ON tbl_personagem.filme_id = tbl_filme.filme_id 
        JOIN tbl_profissional ON tbl_personagem.profissional_id = tbl_profissional.profissional_id
        ORDER BY id DESC`

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

// Retorna o personagem do Banco de dados, filtrando por id
const getSelectByIdCharacter = async function (id) {
    try {
        //script SQL
        let sql = `SELECT 
        tbl_profissional.profissional_id, tbl_profissional.nome
        tbl_personagem.personagem_id, tbl_personagem.nome, tbl_personagem.papel,
        tbl_filme.filme_id, tbl_filme_nome
        * FROM tbl_filme_genero 
        JOIN tbl_filme ON tbl_personagem.filme_id = tbl_filme.filme_id 
        JOIN tbl_profissional ON tbl_personagem.profissional_id = tbl_profissional.profissional_id  
        where id =${id}`

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


// Retorna todos os filmes que um profissional participou
const getSelectMoviesByIdProfessional = async function(profissional_id){
    try {
        //Script SQL
        let sql = 
        `SELECT tbl_personagem.personagem_id, tbl_personagem.nome, tbl_personagem.papel,
        tbl_filme.filme_id, tbl_filme.nome, tbl_filme_data_lancamento
            FROM tbl_profissional
                INNER JOIN tbl_personagem
                    ON tbl_profissional.profissional_id = tbl_personagem.profissional_id
                INNER JOIN tbl_filme    
                    ON tbl_personagem.filme_id = tbl_filme.filme_id
                WHERE tbl_profissional.profissional_id = ${profissional_id}`

        // Encaminha o script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql);

        if (Array.isArray(result))
            return result;
        else
            return false;
    }
    catch (error){
        // console.log(error);
        return false;
    }
}


// Retorna todos os profissionais envolvidos na produção de um filme
const getSelectProfessionalsByIdMovies = async function(filme_id){
    try {
        //Script SQL
        let sql = 
        `SELECT tbl_personagem.personagem_id, tbl_personagem.nome, tbl_personagem.papel,
        tbl_profissional.profissional_id, tbl_profissional.nome, tbl_profissional.biografia, 
            FROM tbl_filme
                INNER JOIN tbl_personagem
                    ON tbl_filme.filme_id = tbl_personagem.filme_id
                INNER JOIN tbl_profissional    
                    ON tbl_personagem.personagem_id = tbl_profissional.profissional_id
                WHERE tbl_filme.filme_id = ${filme_id}`

        // Encaminha o script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql);

        if (Array.isArray(result))
            return result;
        else
            return false;
    }
    catch (error){
        // console.log(error);
        return false;
    }
}

//Retorna o ultimo Id cadastrado
const getSelectLastId = async function () {
    try {
        //Script SQL
        let sql = `SELECT personagem_id FROM tbl_personagem ORDER BY id DESC LIMIT 1`;

        //Encaminha o script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql);

        if (Array.isArray(result)) {
            return Number(result[0].personagem_id);
        }
        else {
            return false;
        }

    } catch (error) {
        return false;
    }
}

// Insere um relacionamento(personagem) no banco de dados
const setInsertCharacter = async function (personagem) {
    try {
        let sql = `INSERT INTO tbl_personagem(nome, papel, profissional_id, filme_id)
        VALUES('${personagem.nome}', '${personagem.papel}', ${personagem.profissional_id}, ${profissional.filme_id});`

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

// Altera um registro de relacionamento(personagem) no banco de dados
const setUpdateCharacter = async function (personagem) {
    try {
        let sql = `UPDATE tbl_personagem
        SET 
            nome = '${personagem.nome}'
            papel = '${personagem.papel}'
            filme_id = '${personagem.filme_id}',
            profissional_id = '${personagem.profissional_id}'
        WHERE id = ${filmeGenero.id};`

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

// Exclui um personagem pelo id no banco de dados
const setDeleteCharacter = async function (id) {
    try {
        let sql = `DELETE FROM tbl_Personagem
        WHERE id = ${id};`

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
    getSelectAllCharacters,
    getSelectByIdCharacter,
    getSelectMoviesByIdProfessional,
    getSelectProfessionalsByIdMovies,
    getSelectLastId,
    setInsertCharacter,
    setUpdateCharacter,
    setDeleteCharacter
}