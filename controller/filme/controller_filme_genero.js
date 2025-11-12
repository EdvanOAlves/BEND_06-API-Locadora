/**************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model para o 
 *           CRUD na relação entre Filme e Gênero
 * Autor: Edvan Alves
 * Data: 01/11/2025
 * Versão: 1.0.11.25
 **************************************************************************************************/

const filmeGeneroDAO = require('../../model/DAO/filme_genero.js');

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

// Retorna uma lista com todos os registros de filmes x generos
const listarFilmesGeneros = async function () {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        // Chama a função do DAO para retornar a lista de Relacionamentos entre Filmes e Gêneros
        let resultFilmesGeneros = await filmeGeneroDAO.getSelectAllMovieGenres();

        if (!resultFilmesGeneros) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;        //500
        }
        if (resultFilmesGeneros.length < 0) {
            return MESSAGES.ERROR_NOT_FOUND;                    //404
        }

        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status; //Isso aqui é genial
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
        MESSAGES.DEFAULT_HEADER.items.filmes_generos = resultFilmesGeneros;
        return MESSAGES.DEFAULT_HEADER;                         //200

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;       //500
    }
}

// Retorna um registro de filme x genero correspondente ao id inserido
const buscarFilmeGeneroId = async function (id) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        //Válidação de chegada do ID, barrando NaNs e campos vazios
        if (isNaN(id) || id == '' || id == null || id == undefined || id <= 0) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += 'Id inválido';
            return MESSAGES.ERROR_REQUIRED_FIELDS;                              //400   
        }

        //Executando busca por id
        let resultFilmesGeneros = await filmeGeneroDAO.getSelectByIdMovieGenres(Number(id));

        //--------------Verificações da busca-----------//
        //Caso houve um erro na execução do model
        if (!resultFilmesGeneros) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL                         //500
        }

        //Caso não exista um item com id correspondente ao inserido
        if (resultFilmesGeneros <= 0) {
            return MESSAGES.ERROR_NOT_FOUND;                                    //404
        }

        //---------------------------------------------//

        //Montagem do Message
        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status;
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
        MESSAGES.DEFAULT_HEADER.items.filme_genero = resultFilmesGeneros;

        return MESSAGES.DEFAULT_HEADER                                          //200

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500
    }
}

// Retorna retorna os generos que um filme pertence
const listarGenerosIdFilme = async function (idFilme) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        //Válidação de chegada do ID, barrando NaNs e campos vazios
        if (isNaN(idFilme) || idFilme == '' || idFilme == null || idFilme == undefined || idFilme <= 0) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += 'Id inválido';
            return MESSAGES.ERROR_REQUIRED_FIELDS;                              //400   
        }

        //Executando busca por id
        let resultFilmesGeneros = await filmeGeneroDAO.getSelectGenresByIdMovies(Number(idFilme));
        //--------------Verificações da busca-----------//
        //Caso houve um erro na execução do model
        if (!resultFilmesGeneros) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL                         //500
        }

        //Caso não exista um item com id correspondente ao inserido
        if (resultFilmesGeneros <= 0) {
            return MESSAGES.ERROR_NOT_FOUND;                                    //404
        }

        //---------------------------------------------//

        //Montagem do Message
        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status;
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
        MESSAGES.DEFAULT_HEADER.items.filme_genero = resultFilmesGeneros;

        return MESSAGES.DEFAULT_HEADER                                          //200

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500
    }
}
// Retorna retorna os filmes pertencentes àquele genero
const listarFilmesIdGenero = async function (idGenero) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        //Válidação de chegada do ID, barrando NaNs e campos vazios
        if (isNaN(idGenero) || idGenero == '' || idGenero == null || idGenero == undefined || idGenero <= 0) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += 'Id inválido';
            return MESSAGES.ERROR_REQUIRED_FIELDS;                              //400   
        }

        //Executando busca por id
        let resultFilmesGeneros = await filmeGeneroDAO.getSelectMoviesByIdGenres(Number(idFilme));

        //--------------Verificações da busca-----------//
        //Caso houve um erro na execução do model
        if (!resultFilmesGeneros) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL                         //500
        }

        //Caso não exista um item com id correspondente ao inserido
        if (resultFilmesGeneros <= 0) {
            return MESSAGES.ERROR_NOT_FOUND;                                    //404
        }

        //---------------------------------------------//

        //Montagem do Message
        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status;
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
        MESSAGES.DEFAULT_HEADER.items.filme_genero = resultFilmesGeneros;

        return MESSAGES.DEFAULT_HEADER                                          //200

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500
    }
}

// Insere um registro de filme x genero no banco de dados
const inserirFilmeGenero = async function (filmeGenero, contentType) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        //Validação do tipo do conteúdo da requisição, nosso sistema só aceita JSON
        if (String(contentType).toUpperCase() != 'APPLICATION/JSON')
            return MESSAGES.ERROR_CONTENT_TYPE;                                 //415

        // Chama a função de validar os dados do filme x genero
        let falha = await verificarFalhas(filmeGenero)
        if (falha) {
            return falha                                                        //400
        }

        //Chama a função para inserir o registro no DB
        let resultFilmesGeneros = await filmeGeneroDAO.setInsertMoviesGenres(filmeGenero);
        if (!resultFilmesGeneros) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;                        //500
        }

        //Preparo para retorno de caso 200
        //Chama a função para receber o ID gerado no BD
        let lastID = await filmeGeneroDAO.getSelectLastId();

        if (!lastID){
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL                         //500
        }

        filmeGenero.id = lastID
        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status;
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code;
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message;
        MESSAGES.DEFAULT_HEADER.items = filmeGenero

        return MESSAGES.DEFAULT_HEADER                                      //201

    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500
    }

}

// Atualiza o registro de um filme x genero correspondente ao id 
const atualizarFilmeGenero = async function (filmeGenero, id, contentType) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        /*------------------------------VALIDAÇÕES------------------------------------*/
        //Validação do tipo do conteúdo da requisição, nosso sistema só aceita JSON
        if (String(contentType).toUpperCase() != 'APPLICATION/JSON')
            return MESSAGES.ERROR_CONTENT_TYPE;                                 //415

        // Chama a função de validar os dados do registro
        let falha = await verificarFalhas(filmeGenero)
        if (falha.length) {
            return falha                                                        //400 referente a dados de input
        }

        //Verificando existencia do registro de relacionamento
        let validarId = await buscarFilmeGeneroId(id);

        //Caso houve um erro na execução do model
        if (validarId.status_code != 200) {
            return validarId                                                    // 400 referente a id / 404 / 500 
        }
        /*-----------------------------------------------------------------------------*/

        //Adiciona o id do parâmetro no JSON de dados a ser encaminhado ao DAO
        filmeGenero.id = Number(id);

        //Chama a função para inserir o novo registro de relacionamento no DB
        let resultFilmesGeneros = await filmeGeneroDAO.setUpdateMoviesGenres(filmeGenero);
        if (resultFilmesGeneros) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status;
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code;
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message;
            MESSAGES.DEFAULT_HEADER.items.filme_genero = filmeGenero;

            return MESSAGES.DEFAULT_HEADER                                      //200
        } else
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;                        //500

    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500
    }

}

// Exclui o registro de um relacionamento correspondente ao id
const excluirFilmeGenero = async function (id) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        //Verificando existencia do filmexGenero
        let validarId = await buscarFilmeGeneroId(id);

        //Caso houve um erro na execução do model
        if (validarId.status_code != 200) {
            return validarId                                                    // 400 referente a id / 404 / 500 
        }

        let resultFilmesGeneros = await filmeGeneroDAO.setDeleteMoviesGenres(id);
        if (resultFilmesGeneros) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status;
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code;
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message;

            return MESSAGES.DEFAULT_HEADER                                      //204
        }
        else
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;                            //500

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500 
    }
}

// Para deletar os relacionamentos de gênero correspondentes ao idFilme
const excluirFilmesGenerosIdFilme = async function (filmeId){
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        // //Verificando existencia do filmexGenero
        // let validarId = await buscarFilmeGeneroId(filmeId);

        // //Caso houve um erro na execução do model
        // if (validarId.status_code != 200) {
        //     return validarId                                                    // 400 referente a id / 404 / 500 
        // }
        //TODO: Deve precisar de uma tratativa para 404, filmes sem genero cadastrados


        
        let resultFilmesGeneros = await filmeGeneroDAO.setDeleteMovieGenresByMovieId(filmeId);
        if (resultFilmesGeneros) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status;
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code;
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message;

            return MESSAGES.DEFAULT_HEADER                                          //200
        }
        else
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;                            //500

    } catch (error) {
        return MESSAGES.ERROR_RELATION_DELETION;                                    //500 
    }
}

// Função reutilizável para validação de dados de cadastro e atualização do registro
const verificarFalhas = async function (filmeGenero) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    let invalidInputs = [];
    if (filmeGenero.filme_id == '' || filmeGenero.filme_id == undefined || filmeGenero.filme_id == null || isNaN(filmeGenero.filme_id) || filmeGenero.filme_id <= 0)
        invalidInputs.push('Filme_id');
    if (filmeGenero.genero_id == '' || filmeGenero.genero_id == undefined || filmeGenero.genero_id == null || isNaN(filmeGenero.genero_id) || filmeGenero.genero_id <= 0)
        invalidInputs.push('Genero_id');

    //Retornando em caso de campos invalidos
    if (invalidInputs.length) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ` Campos incorretos: ${invalidInputs}`;
        return MESSAGES.ERROR_REQUIRED_FIELDS;                              //400
    }
    else
        return false;

}

module.exports = {
    listarFilmesGeneros,
    buscarFilmeGeneroId,
    listarGenerosIdFilme,
    listarFilmesIdGenero,
    inserirFilmeGenero,
    atualizarFilmeGenero,
    excluirFilmeGenero,
    excluirFilmesGenerosIdFilme
}