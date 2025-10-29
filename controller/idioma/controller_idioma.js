/**************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model
 * Autor: Edvan Alves
 * Data: 29/10/2025
 * Versão: 1.0.10.25
 **************************************************************************************************/

/**************************************************************************************************/
//COMANDOS UTILIZADOS


/**************************************************************************************************/
//BIBLIOTECAS UTILIZADAS
/**************************************************************************************************/

// Import da model do DAO de Idioma
const idiomaDAO = require('../../model/DAO/idioma.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js');


// Retorna todos os registros de idiomas
const listarIdiomas = async function() {
    // Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        // Chama a função do DAO para retornar a lista de idiomas
        let resultIdiomas = idiomaDAO.getSelectAllLanguages();

        if (!resultIdiomas){
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;        //500
        }
        if (resultIdiomas.length < 0){
            return MESSAGES.ERROR_NOT_FOUND;                    //404
        }

        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status;
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
        MESSAGES.DEFAULT_HEADER.items.idiomas = resultIdiomas;
        return MESSAGES.DEFAULT_HEADER;
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER        //500
        
    }
}

// Retorna o registro de idioma com id correspondente
const buscarIdiomaId = async function(id){
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        // Validação do ID recebido, só executar a busca se for um valor válido
        if (isNaN(id)|| id <= 0 || id == '' || id == undefined || id == null){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += 'Id inválido';
            return  MESSAGES.ERROR_REQUIRED_FIELDS;
        }

        // Chama a função do DAO para realizar a busca
        const resultIdioma = idiomaDAO.getSelectByIdLanguages(id);

        //--------------Verificações da busca-----------//
        if (!resultIdioma){
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;                        //500
        }
        if (resultIdioma.length < 0){
            return MESSAGES.ERROR_NOT_FOUND;                                    //404
        }
        //----------------------------------------------//

        // Montagem do Message
        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status;
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message;
        MESSAGES.DEFAULT_HEADER.items.idioma = resultIdioma;
        return MESSAGES.DEFAULT_HEADER                                          //200


    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER                        //500
    }
}


const inserirIdioma = async function(idioma){
    let MESSAGES =JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        // Validação do tipo do conteúdo da requisição, nosso sistema só aceita JSON
        if (String(contentType).toUpperCase() != 'APPLICATION/JSON')
            return MESSAGES.ERROR_CONTENT_TYPE;                                 //415
        
        // Chama a função para validar os dados do gênero
        let falha = await verificarFalhas(idioma)

        if  (falha){
            return falha;
        }
        
        //Chama a função para inserir o novo idioma no DB

        let resultIdiomas = await idiomaDAO.setInsertLanguages(idioma);
        if (!resultIdioma){
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;                        //500
        }

        // Preparo para retorno de caso 200
        // Chamando a função para buscar o ID gerado no DB
        let lastID = await idiomaDAO.getSelectLastId();

        if (!lastID){
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL                         //500
            // Ainda acho que poderia ter uma tratativa melhor para isso
            //
            // - Se caiu nesse cenário o insert funcionou, ele só não conseguiu
            //   retornar o id para o usuário, tinha que ser uma mensagem diferente
            //   Ou... Deletar o ultimo registro para o usuário cadastrar de novo?
        }

        idioma.id = lastID

        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM;
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code;
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message;
        MESSAGES.DEFAULT_HEADER.items = idioma;
        
        return MESSAGES.DEFAULT_HEADER                                          //201

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500
    }
}

// Atualiza o registro de um idioma correspondente ao id
const atualizarIdioma = async function (idioma, id, contentType) {
    // Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        /*------------------------------VALIDAÇÕES------------------------------------*/
        //Validação do tipo do conteúdo da requisição, nosso sistema só aceita JSON
        if (String(contentType).toUpperCase() != 'APPLICATION/JSON')
            return MESSAGES.ERROR_CONTENT_TYPE;                                 //415

        // Chama a função de validar os dados do idioma
        let falha = await verificarFalhas(idioma)
        if (falha.length) {
            return falha                                                        //400 referente a dados de input (idioma)
        }

        //Verificando existencia do idioma
        let validarId = await buscarIdiomaId(id);

        //Caso houve um erro na execução do model
        if (validarId.status_code != 200) {
            return validarId                                                    // 400 referente a id / 404 / 500 
        }
        /*-----------------------------------------------------------------------------*/

        //Adiciona o id do parâmetro no JSON de dados a ser encaminhado ao DAO
        idioma.id = Number(id);

        //Chama a função para inserir o novo idioma no DB
        let resultIdiomas = await idiomaDAO.setUpdateLanguages(idioma);

        if (resultIdiomas) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status;
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code;
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message;
            MESSAGES.DEFAULT_HEADER.items.idioma = idioma

            return MESSAGES.DEFAULT_HEADER                                      //200
        } else
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;                        //500

    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500
    }

}


// Exclui o registro de um idioma correspondente ao id
const excluirIdioma = async function (id) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        // TODO: Incluir essa validação de id em outros controllers
        if (isNaN(id)|| id <= 0 || id == '' || id == undefined || id == null){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += 'Id inválido';
            return  MESSAGES.ERROR_REQUIRED_FIELDS;
        }

        //Verificando existencia do Idioma
        let validarId = await buscarIdiomaId(id);

        //Caso houve um erro na execução do model
        if (validarId.status_code != 200) {
            return validarId                                                    // 400 referente a id / 404 / 500 
        }

        let resultIdioma = await idiomaDAO.setDeleteLanguages(id);
        if (resultIdioma) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status;
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code;
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message;

            return MESSAGES.DEFAULT_HEADER                                          //200 //TODO: alguns comentários em outros controllers estão em html
        }
        else
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;                            //500

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                           //500 
    }
}

// Função reutilizável para validação de dados de cadastro e atualização do idioma
const verificarFalhas = async function (idioma) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    let invalidInputs = [];

    if (idioma.nome == '' || idioma.nome == undefined || idioma.nome == null || idioma.nome.length > 40)
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
    listarIdiomas,
    buscarIdiomaId,
    inserirIdioma,
    atualizarIdioma,
    excluirIdioma
}