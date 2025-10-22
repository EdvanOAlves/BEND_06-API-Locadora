/**************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model
 * Autor: Edvan Alves
 * Data: 22/10/2025
 * Versão: 1.0.10.25
 **************************************************************************************************/

/**************************************************************************************************/
//COMANDOS UTILIZADOS


/**************************************************************************************************/
//BIBLIOTECAS UTILIZADAS
/**************************************************************************************************/

//Import da model do DAO de Genero
const generoDAO = require('../../model/DAO/genero.js');

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

// Retorna uma lista com todos os generos
const listarGeneros = async function () {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        // Chama a função do DAO para retornar a lista de Generos
        let resultGeneros = await generoDAO.getSelectAllGenres();

        if (!resultGeneros) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;        //500
        }
        if (resultGeneros.length < 0) {
            return MESSAGES.ERROR_NOT_FOUND;                    //404
        }

        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status; //Isso aqui é genial
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
        MESSAGES.DEFAULT_HEADER.items.generos = resultGeneros;
        return MESSAGES.DEFAULT_HEADER;                         //200

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;       //500
    }
}

// Retorna um genero correspondente ao id inserido
const buscarGeneroId = async function (id) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        //Válidação de chegada do ID, barrando NaNs e campos vazios
        if (isNaN(id) || id == '' || id == null || id == undefined || id <= 0) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += 'Id incorreto'; MESSAGES.ERROR_REQUIRED_FIELDS.message += 'Id incorreto';
            return MESSAGES.ERROR_REQUIRED_FIELDS;                              //400   
        }

        //Executando busca por id
        let resultGeneros = await generoDAO.getSelectByIdGenres(Number(id));

        //--------------Verificações da busca-----------//
        //Caso houve um erro na execução do model
        if (!resultGeneros) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL                         //500
        }

        //Caso não exista um item com id correspondente ao inserido
        if (resultGeneros <= 0) {
            return MESSAGES.ERROR_NOT_FOUND;                                    //404
        }

        //---------------------------------------------//

        //Montagem do Message
        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status;
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
        MESSAGES.DEFAULT_HEADER.items.genero = resultGeneros;

        return MESSAGES.DEFAULT_HEADER                                          //200

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500

    }

}

// Insere um registro de genero no banco de dados
const inserirGenero = async function (genero, contentType) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        //Validação do tipo do conteúdo da requisição, nosso sistema só aceita JSON
        if (String(contentType).toUpperCase() != 'APPLICATION/JSON')
            return MESSAGES.ERROR_CONTENT_TYPE;                                 //415

        // Chama a função de validar os dados do genero
        let falha = await verificarFalhas(genero)
        if (falha) {
            return falha                                                        //400
        }

        //Chama a função para inserir o novo genero no DB
        let resultGeneros = await generoDAO.setInsertGenres(genero);
        if (!resultGeneros) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;                        //500
        }

        //Preparo para retorno de caso 200
        //Chama a função para receber o ID gerado no BD
        let lastID = await generoDAO.getSelectLastId();

        if (!lastID){
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL                         //500
        }

        genero.id = lastID
        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status;
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code;
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message;
        MESSAGES.DEFAULT_HEADER.items = genero


        //TODO: É interessante retornar os dados registrados do genero, usando o get do DB

        return MESSAGES.DEFAULT_HEADER                                      //201

    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500
    }

}

// Atualiza o registro de um genero correspondente ao id 
const atualizarGenero = async function (genero, id, contentType) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        /*------------------------------VALIDAÇÕES------------------------------------*/
        //Validação do tipo do conteúdo da requisição, nosso sistema só aceita JSON
        if (String(contentType).toUpperCase() != 'APPLICATION/JSON')
            return MESSAGES.ERROR_CONTENT_TYPE;                                 //415

        // Chama a função de validar os dados do genero
        let falha = await verificarFalhas(genero)
        if (falha.length) {
            return falha                                                        //400 referente a dados de input(genero)
        }

        //Verificando existencia do genero
        let validarId = await buscarGeneroId(id);

        //Caso houve um erro na execução do model
        if (validarId.status_code != 200) {
            return validarId                                                    // 400 referente a id / 404 / 500 
        }
        /*-----------------------------------------------------------------------------*/

        //Adiciona o id do parâmetro no JSON de dados a ser encaminhado ao DAO
        genero.id = Number(id);

        //Chama a função para inserir o novo genero no DB
        let resultGeneros = await generoDAO.setUpdateGenres(genero, id);
        if (resultGeneros) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status;
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code;
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message;
            MESSAGES.DEFAULT_HEADER.items.genero = genero
            //TODO: É interessante retornar os dados registrados do genero, usando o get do DB

            return MESSAGES.DEFAULT_HEADER                                      //200
        } else
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;                        //500

    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500
    }

}

// Exclui o registro de um genero correspondente ao id
const excluirGenero = async function (id) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        //Verificando existencia do genero
        let validarId = await buscarGeneroId(id);

        //Caso houve um erro na execução do model
        if (validarId.status_code != 200) {
            return validarId                                                    // 400 referente a id / 404 / 500 
        }

        let resultGeneros = await generoDAO.setDeleteGenres(id);
        if (resultGeneros) {
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

// Função reutilizável para validação de dados de cadastro e atualização do genero
const verificarFalhas = async function (genero) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    let invalidInputs = [];

    if (genero.nome == '' || genero.nome == undefined || genero.nome == null || genero.nome.length > 100)
        invalidInputs.push('Nome');
    //Retornando em caso de campos invalidos
    if (invalidInputs.length) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += `Campos incorretos: ${invalidInputs}`;
        return MESSAGES.ERROR_REQUIRED_FIELDS;                              //400
    }
    else
        return false;

}

module.exports = {
    listarGeneros,
    buscarGeneroId,
    inserirGenero,
    atualizarGenero,
    excluirGenero
}