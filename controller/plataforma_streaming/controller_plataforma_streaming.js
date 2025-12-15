/**************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model
 * Autor: Edvan Alves
 * Data: 01/11/2025
 * Versão: 1.0.11.25
 **************************************************************************************************/

/**************************************************************************************************/
//COMANDOS UTILIZADOS


/**************************************************************************************************/
//BIBLIOTECAS UTILIZADAS
/**************************************************************************************************/

//Import da model do DAO de plataformas de streaming
const plataformaDAO = require('../../model/DAO/plataforma_streaming.js');

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

// Retorna uma lista com todas as plataformas
const listarPlataformas = async function () {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        // Chama a função do DAO para retornar a lista de plataformas
        let resultPlataforma = await plataformaDAO.getSelectAllPlatforms();

        if (!resultPlataforma) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;        //500
        }
        if (resultPlataforma.length < 0) {
            return MESSAGES.ERROR_NOT_FOUND;                    //404
        }

        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status; //Isso aqui é genial
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
        MESSAGES.DEFAULT_HEADER.items.plataformas = resultPlataforma;
        return MESSAGES.DEFAULT_HEADER;                         //200

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;       //500
    }
}

// Retorna uma plataforma correspondente ao id inserido
const buscarPlataformaId = async function (id) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        //Válidação de chegada do ID, barrando NaNs e campos vazios
        if (isNaN(id) || id == '' || id == null || id == undefined || id <= 0) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += 'Id inválido';
            return MESSAGES.ERROR_REQUIRED_FIELDS;                              //400   
        }

        //Executando busca por id
        let resultPlataforma = await plataformaDAO.getSelectByIdPlatform(Number(id));

        //--------------Verificações da busca-----------//
        //Caso houve um erro na execução do model
        if (!resultPlataforma) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL                         //500
        }

        //Caso não exista um item com id correspondente ao inserido
        if (resultPlataforma.length <= 0) {
            return MESSAGES.ERROR_NOT_FOUND;                                    //404
        }

        //---------------------------------------------//

        //Montagem do Message
        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status;
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
        MESSAGES.DEFAULT_HEADER.items.plataforma = resultPlataforma;

        return MESSAGES.DEFAULT_HEADER                                          //200

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500

    }

}

// Insere um registro de Plataforma no banco de dados
const inserirPlataforma = async function (plataforma, contentType) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        //Validação do tipo do conteúdo da requisição, nosso sistema só aceita JSON
        if (String(contentType).toUpperCase() != 'APPLICATION/JSON')
            return MESSAGES.ERROR_CONTENT_TYPE;                                 //415

        // Chama a função de validar os dados da plataforma
        let falha = await verificarFalhas(plataforma)
        if (falha) {
            return falha                                                        //400
        }

        //Chama a função para inserir a nova plataforma no DB
        let resultPlataforma = await plataformaDAO.setInsertPlatform(plataforma);
        if (!resultPlataforma) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;                        //500
        }

        //Preparo para retorno de caso 200
        //Chama a função para receber o ID gerado no BD
        let lastID = await plataformaDAO.getSelectLastId();

        if (!lastID){
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL                         //500
        }

        plataforma.id = lastID
        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status;
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code;
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message;
        MESSAGES.DEFAULT_HEADER.items = plataforma

        return MESSAGES.DEFAULT_HEADER                                      //201

    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500
    }

}

// Atualiza o registro de um plataforma correspondente ao id 
const atualizarPlataforma = async function (plataforma, id, contentType) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        /*------------------------------VALIDAÇÕES------------------------------------*/
        //Validação do tipo do conteúdo da requisição, nosso sistema só aceita JSON
        if (String(contentType).toUpperCase() != 'APPLICATION/JSON')
            return MESSAGES.ERROR_CONTENT_TYPE;                                 //415

        // Chama a função de validar os dados da plataforma
        let falha = await verificarFalhas(plataforma)
        if (falha.length) {
            return falha                                                        //400 referente a dados de input(plataforma)
        }

        //Verificando existencia da plataforma
        let validarId = await buscarPlataformaId(id);

        //Caso houve um erro na execução do model
        if (validarId.status_code != 200) {
            return validarId                                                    // 400 referente a id / 404 / 500 
        }
        /*-----------------------------------------------------------------------------*/

        //Adiciona o id do parâmetro no JSON de dados a ser encaminhado ao DAO
        plataforma.id = Number(id);

        //Chama a função para inserir a nova plataforma no DB
        let resultPlataforma = await plataformaDAO.setUpdatePlatform(plataforma);
        if (resultPlataforma) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status;
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code;
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message;
            MESSAGES.DEFAULT_HEADER.items.plataforma = plataforma;

            return MESSAGES.DEFAULT_HEADER                                      //200
        } else
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;                        //500

    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500
    }

}

// Exclui o registro de uma plataforma correspondente ao id
const excluirPlataforma = async function (id) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        //Verificando existencia da plataforma
        let validarId = await buscarPlataformaId(id);

        //Caso houve um erro na execução do model
        if (validarId.status_code != 200) {
            return validarId                                                    // 400 referente a id / 404 / 500 
        }

        let resultPlataforma = await plataformaDAO.setDeletePlatform(id);
        if (resultPlataforma) {
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

// Função reutilizável para validação de dados de cadastro e atualização da plataforma
const verificarFalhas = async function (plataforma) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    let invalidInputs = [];
    if (plataforma.nome == '' || plataforma.nome == undefined || plataforma.nome == null || plataforma.nome.length > 100)
        invalidInputs.push('Nome');
    if (plataforma.descricao > 250)
        invalidInputs.push('Descrição');
    if (plataforma.preco == '' || plataforma.preco == undefined || plataforma.preco == null ||plataforma.preco.length > 8 || isNaN(plataforma.preco))
        invalidInputs.push('Preço assinatura');
    if (plataforma.nome.length > 255)
        invalidInputs.push('Site');

    //Retornando em caso de campos invalidos
    if (invalidInputs.length) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ` Campos incorretos: ${invalidInputs}`;
        return MESSAGES.ERROR_REQUIRED_FIELDS;                              //400
    }
    else
        return false;

}

module.exports = {
    listarPlataformas,
    buscarPlataformaId,
    inserirPlataforma,
    atualizarPlataforma,
    excluirPlataforma
}