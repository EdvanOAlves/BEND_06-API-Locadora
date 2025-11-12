/**************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MYSQL referente ao relacionamento entre filme e genero
 * Autor: Edvan Alves
 * Data: 05/11/2025
 * Versão: 1.0.11.25
**************************************************************************************************/

// import da dependencia do prisma, para execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma');

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient;


// Retorna todos os filmes e generos do banco de dados
const getSelectAllMovieGenres = async function () {
    try {
        //script SQL
        let sql = `SELECT * FROM tbl_filme_genero ORDER BY id DESC`

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

// Retorna o filme e gênero do Banco de dados, filtrando por id
const getSelectByIdMovieGenres = async function (id) {
    try {
        //script SQL
        let sql = `SELECT * FROM tbl_filme_genero  where id =${id}`

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


// Retorna todos os gêneros filtrando por um id de filme
const getSelectGenresByIdMovies = async function(filme_id){
    try {
        //Script SQL
        let sql = 
        `SELECT tbl_genero.genero_id, tbl_genero.nome
            FROM tbl_filme
                INNER JOIN tbl_filme_genero
                    ON tbl_filme.filme_id = tbl_filme_genero.filme_id
                INNER JOIN tbl_genero    
                    ON tbl_genero.genero_id = tbl_filme_genero.genero_id
                WHERE tbl_filme.filme_id = ${filme_id}`

        // Encaminha o script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql);
        if (Array.isArray(result))
            return result;
        else
            return false;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

// Retorna todos os filmes filtrando por um id de gênero
const getSelectMoviesByIdGenres = async function(genero_id){
    try {
        //Script SQL
        let sql = 
        `SELECT tbl_filme.id, tbl_filme.nome
            FROM tbl_genero
                INNER JOIN tbl_filme_genero
                    ON tbl_genero.genero_id = tbl_filme_genero.genero_id
                INNER JOIN tbl_filme    
                    ON tbl_filme.filme_id = tbl_filme_genero.filme_id
                WHERE tbl_genero.genero_id = ${genero_id}`

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
        let sql = `SELECT id FROM tbl_filme_genero ORDER BY id DESC LIMIT 1`;

        //Encaminha o script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql);

        if (Array.isArray(result)) {
            return Number(result[0].id);
        }
        else {
            return false;
        }

    } catch (error) {
        return false;
    }
}

// Insere um relacionamento de Filme com Gênero no banco de dados
const setInsertMoviesGenres = async function (filmeGenero) {
    try {
        let sql = `INSERT INTO tbl_filme_genero(filme_id, genero_id)
        VALUES('${filmeGenero.filme_id}', '${filmeGenero.genero_id}');`

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

// Altera um registro de relacionamento de Filme com Gênero no banco de dados
const setUpdateMoviesGenres = async function (filmeGenero) {
    try {
        let sql = `UPDATE tbl_filme_genero
        SET 
            filme_id = '${filmeGenero.filme_id}',
            genero_id = '${filmeGenero.genero_id}'
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

// Exclui um relacionamento de filme com genero pelo id no banco de dados
const setDeleteMoviesGenres = async function (id) {
    try {
        let sql = `DELETE FROM tbl_filme_genero
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

// Exclui todos os registros de relacionamento entre filme e gênero associados com o id de um filme
const setDeleteMovieGenresByMovieId = async function(filmeId){
    try {
        let sql = `DELETE FROM tbl_filme_genero
        WHERE filme_id = ${filmeId};`

        let result = await prisma.$executeRawUnsafe(sql);

        if (result){
            return true;
        }
        else
            return false;
        
    } catch (error) {
        console.log(error);
        return false
        
    }
}

module.exports = {
    getSelectAllMovieGenres,
    getSelectByIdMovieGenres,
    getSelectGenresByIdMovies,
    getSelectMoviesByIdGenres,
    getSelectLastId,
    setInsertMoviesGenres,
    setUpdateMoviesGenres,
    setDeleteMoviesGenres,
    setDeleteMovieGenresByMovieId
}