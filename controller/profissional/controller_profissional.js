/**************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model
 * Autor: Edvan Alves
 * Data: 10/12/2025
 * Versão: 1.1.12.25
 * Autor: Edvan Alves | 10/12/2025
 **************************************************************************************************/

/**************************************************************************************************/
//COMANDOS UTILIZADOS


/**************************************************************************************************/
//BIBLIOTECAS UTILIZADAS
/**************************************************************************************************/

//Import da model do DAO de profissional
const profissionalDAO = require('../../model/DAO/profissional.js');

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

// Import da Controller de relação entre profissional e Gênero

// Retorna uma lista com todos os profissionais
const listarProfissionais = async function () {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        // Chama a função do DAO para retornar a lista de profissionais
        let resultProfissionais = await profissionalDAO.getSelectAllProfessionals();

        if (!resultProfissionais) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;        //500
        }
        if (resultProfissionais.length < 0) {
            return MESSAGES.ERROR_NOT_FOUND;                    //404
        }

        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status; //Isso aqui é genial
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
        MESSAGES.DEFAULT_HEADER.items.profissionais = resultProfissionais;
        return MESSAGES.DEFAULT_HEADER;                         //200

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;       //500
    }
}

// Retorna um pjrofissional correspondente ao id inserido
const buscarProfissionalId = async function (id) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        //Válidação de chegada do ID, barrando NaNs e campos vazios
        if (isNaN(id) || id == '' || id == null || id == undefined || id <= 0) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += 'Id inválido';
            return MESSAGES.ERROR_REQUIRED_FIELDS;                              //400   
        }

        //Executando busca por id
        let resultProfissionais = await profissionalDAO.getSelectByIdProfessional(Number(id));

        //--------------Verificações da busca-----------//
        //Caso houve um erro na execução do model
        if (!resultProfissionais) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL                         //500
        }

        //Caso não exista um item com id correspondente ao inserido
        if (resultProfissionais <= 0) {
            return MESSAGES.ERROR_NOT_FOUND;                                    //404
        }

        //---------------------------------------------//

        //Montagem do Message
        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status;
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
        MESSAGES.DEFAULT_HEADER.items.profissional = resultProfissionais;

        return MESSAGES.DEFAULT_HEADER                                          //200

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500

    }

}

// Insere um registro de profissional no banco de dados
const inserirProfissional = async function (profissional, contentType) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        //Validação do tipo do conteúdo da requisição, nosso sistema só aceita JSON
        if (String(contentType).toUpperCase() != 'APPLICATION/JSON')
            return MESSAGES.ERROR_CONTENT_TYPE;                                 //415

        // Chama a função de validar os dados do profissional
        let falha = await verificarFalhas(profissional)
        if (falha) {
            return falha                                                        //400
        }

        //Chama a função para inserir o novo profissional no DB
        let resultProfissionais = await profissionalDAO.setInsertProfessional(professional);
        if (!resultProfissionais) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;                        //500
        }

        //Preparo para retorno de caso 200
        //Chama a função para receber o ID gerado no BD
        let lastID = await profissionalDAO.getSelectLastId();
        console.log(lastID)

        if (!lastID)
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL                         //500
        // Ainda acho que poderia ter uma tratativa melhor para isso
        //
        // - Se caiu nesse cenário o insert funcionou, ele só não conseguiu
        //   retornar o id para o usuário, tinha que ser uma mensagem diferente
        //   Ou... Deletar o ultimo registro para o usuário cadastrar de novo?




        // Adicionando o id do profissional no JSON
        profissional.id = lastID
        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status;
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code;
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message;
        MESSAGES.DEFAULT_HEADER.items = profissional

        return MESSAGES.DEFAULT_HEADER                                      //201

    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500
    }

}

// Atualiza o registro de um profissional correspondente ao id 
const atualizarProfissional = async function (profissional, id, contentType) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        /*------------------------------VALIDAÇÕES------------------------------------*/
        //Validação do tipo do conteúdo da requisição, nosso sistema só aceita JSON
        if (String(contentType).toUpperCase() != 'APPLICATION/JSON')
            return MESSAGES.ERROR_CONTENT_TYPE;                                 //415

        // Chama a função de validar os dados do profissional
        let falha = await verificarFalhas(profissional)
        if (falha.length) {
            return falha                                                        //400 referente a dados de input
        }

        //Verificando existencia do profissional
        let validarId = await buscarProfissionalId(id);

        //Caso houve um erro na execução do model
        if (validarId.status_code != 200) {
            return validarId                                                    // 400 referente a id / 404 / 500 
        }
        /*-----------------------------------------------------------------------------*/

        //Adiciona o id do parâmetro no JSON de dados a ser encaminhado ao DAO
        profissional.id = Number(id);

        //Chama a função para atualizar o registro no DB
        let resultProfissionais = await profissionalDAO.setUpdateProfessional(profissional, id);
        if (resultProfissionais) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status;
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code;
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message;
            MESSAGES.DEFAULT_HEADER.items.profissional = profissional

            return MESSAGES.DEFAULT_HEADER                                      //200
        } else
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;                        //500

    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500
    }

}

// Exclui o registro de um profissional correspondente ao id
const excluirProfissional = async function (id) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        //Verificando existencia do profissional
        let validarId = await buscarProfissional(id);

        //Caso houve um erro na execução do model
        if (validarId.status_code != 200) {
            return validarId                                                    // 400 referente a id / 404 / 500 
        }

        let resultProfissionais = await profissionalDAO.setDeleteProfessionals(id);
        if (resultProfissionais) {
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

// Função reutilizável para validação de dados de cadastro e atualização do profissional
const verificarFalhas = async function (profissional) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    let invalidInputs = [];

    if (isNaN(profissional.id) || profissional.id == '' || profissional.id == null || profissional.id == undefined || profissional.id <= 0) {
        invalidInputs.push('Id de usuario');
        //Sexo_id vai ser "M" "F"
    if (!isNaN(profissional.sexo_id) || profissional.sexo_id == '' || profissional.sexo_id == null || profissional.sexo_id == undefined || profissional.sexo_id.length < 1) {
        invalidInputs.push('Id de usuario');
    if (profissional.nome == '' || profissional.nome == undefined || profissional.nome == null || profissional.nome.length > 100)
        invalidInputs.push('Nome');
    if (profissional.biografia == undefined)
        invalidInputs.push('biografia');
    if (profissional.foto == '' || profissional.foto == undefined || profissional.foto == null || profissional.foto.length > 255)
        invalidInputs.push('foto');
    if (profissional.data_nascimento == undefined || profissional.data_nascimento != 10)
        invalidInputs.push('Data de Nascimento');
    if (profissional.data_falecimento == undefined)
        invalidInputs.push('Data de Falecimento');

    //Retornando em caso de campos invalidos
    if (invalidInputs.length) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += `Campos incorretos: ${invalidInputs}`;
        return MESSAGES.ERROR_REQUIRED_FIELDS;                              //400
    }
    else
        return false;

}

module.exports = {
    listarProfissionais,
    buscarProfissionalId,
    inserirProfissional,
    atualizarProfissional,
    excluirProfissional
}