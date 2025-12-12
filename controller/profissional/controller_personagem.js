/**************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model para o 
 *           CRUD na relação entre Filme e profissional por meio do Personagem
 * Autor: Edvan Alves
 * Data: 10/12/2025
 * Versão: 1.0.12.25
 **************************************************************************************************/

const personagemDAO = require('../../model/DAO/personagem.js');

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

// Retorna uma lista com todos os registros de personagens
const listarPersonagens = async function () {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        // Chama a função do DAO para retornar a lista de personagens
        let resultPersonagens = await personagemDAO.getSelectAllCharacters();

        if (!resultPersonagens) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;        //500
        }
        if (resultPersonagens.length < 0) {
            return MESSAGES.ERROR_NOT_FOUND;                    //404
        }

        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status; //Isso aqui é genial
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
        MESSAGES.DEFAULT_HEADER.items.personagens = resultPersonagens;
        return MESSAGES.DEFAULT_HEADER;                         //200

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;       //500
    }
}

// Retorna um registro de personagem correspondente ao id inserido
const buscarPersonagemId = async function (id) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        //Válidação de chegada do ID, barrando NaNs e campos vazios
        if (isNaN(id) || id == '' || id == null || id == undefined || id <= 0) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += 'Id inválido';
            return MESSAGES.ERROR_REQUIRED_FIELDS;                              //400   
        }

        //Executando busca por id
        let resultPersonagens = await personagemDAO.getSelectByIdCharacter(Number(id));

        //--------------Verificações da busca-----------//
        //Caso houve um erro na execução do model
        if (!resultPersonagens) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL                         //500
        }

        //Caso não exista um item com id correspondente ao inserido
        if (resultPersonagens <= 0) {
            return MESSAGES.ERROR_NOT_FOUND;                                    //404
        }

        //---------------------------------------------//

        //Montagem do Message
        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status;
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
        MESSAGES.DEFAULT_HEADER.items.personagem = resultPersonagens;

        return MESSAGES.DEFAULT_HEADER                                          //200

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500
    }
}

// Retorna retorna os filmes que um profissional participou
const listarfilmesIdProfissional = async function (idProfissional) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        //Válidação de chegada do ID, barrando NaNs e campos vazios
        if (isNaN(idProfissional) || idProfissional == '' || idProfissional == null || idProfissional == undefined || idProfissional <= 0) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += 'Id inválido';
            return MESSAGES.ERROR_REQUIRED_FIELDS;                              //400   
        }

        //Executando busca por id
        let resultPersonagens = await personagemDAO.getSelectMoviesByIdProfessional(Number(idFilme));

        //--------------Verificações da busca-----------//
        //Caso houve um erro na execução do model
        if (!resultPersonagens) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL                         //500
        }

        //Caso não exista um item com id correspondente ao inserido
        if (resultPersonagens <= 0) {
            return MESSAGES.ERROR_NOT_FOUND;                                    //404
        }

        //---------------------------------------------//

        //Montagem do Message
        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status;
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
        MESSAGES.DEFAULT_HEADER.items.personagens = resultPersonagens;

        return MESSAGES.DEFAULT_HEADER                                          //200

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500
    }
}
// Retorna retorna os profissionais que participaram de um filme
const listarProfissionaisIdFilme = async function (idFilme) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        //Válidação de chegada do ID, barrando NaNs e campos vazios
        if (isNaN(idFilme) || idFilme == '' || idFilme == null || idFilme == undefined || idFilme <= 0) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += 'Id inválido';
            return MESSAGES.ERROR_REQUIRED_FIELDS;                              //400   
        }

        //Executando busca por id
        let resultPersonagens = await personagemDAO.getSelectProfessionalsByIdMovies(Number(idFilme));

        //--------------Verificações da busca-----------//
        //Caso houve um erro na execução do model
        if (!resultPersonagens) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL                         //500
        }

        //Caso não exista um item com id correspondente ao inserido
        if (resultPersonagens <= 0) {
            return MESSAGES.ERROR_NOT_FOUND;                                    //404
        }

        //---------------------------------------------//

        //Montagem do Message
        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status;
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
        MESSAGES.DEFAULT_HEADER.items.personagens = resultPersonagens;

        return MESSAGES.DEFAULT_HEADER                                          //200

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500
    }
}

// Insere um registro de personagem no banco de dados
const inserirPersonagem = async function (personagem, contentType) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        //Validação do tipo do conteúdo da requisição, nosso sistema só aceita JSON
        if (String(contentType).toUpperCase() != 'APPLICATION/JSON')
            return MESSAGES.ERROR_CONTENT_TYPE;                                 //415

        // Chama a função de validar os dados do personagem
        let falha = await verificarFalhas(personagem)
        if (falha) {
            return falha                                                        //400
        }

        //Chama a função para inserir o registro no DB
        let resultPersonagens = await personagemDAO.setInsertCharacter(personagem);
        if (!resultPersonagens) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;                        //500
        }

        //Preparo para retorno de caso 200
        //Chama a função para receber o ID gerado no BD
        let lastID = await personagemDAO.getSelectLastId();

        if (!lastID){
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL                         //500
        }

        personagem.id = lastID
        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status;
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code;
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message;
        MESSAGES.DEFAULT_HEADER.items.personagem = personagem

        return MESSAGES.DEFAULT_HEADER                                      //201

    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500
    }

}

// Atualiza o registro de um personagem correspondente ao id 
const atualizarPersonagem = async function (personagem, id, contentType) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        /*------------------------------VALIDAÇÕES------------------------------------*/
        //Validação do tipo do conteúdo da requisição, nosso sistema só aceita JSON
        if (String(contentType).toUpperCase() != 'APPLICATION/JSON')
            return MESSAGES.ERROR_CONTENT_TYPE;                                 //415

        // Chama a função de validar os dados do registro
        let falha = await verificarFalhas(personagem)
        if (falha.length) {
            return falha                                                        //400 referente a dados de input
        }

        //Verificando existencia do registro de relacionamento
        let validarId = await buscarPersonagemId(id);

        //Caso houve um erro na execução do model
        if (validarId.status_code != 200) {
            return validarId                                                    // 400 referente a id / 404 / 500 
        }
        /*-----------------------------------------------------------------------------*/

        //Adiciona o id do parâmetro no JSON de dados a ser encaminhado ao DAO
        personagem.id = Number(id);

        //Chama a função para inserir o novo registro de relacionamento no DB
        let resultPersonagens = await personagemDAO.setUpdateCharacter(personagem);
        if (resultPersonagens) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status;
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code;
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message;
            MESSAGES.DEFAULT_HEADER.items.personagem = personagem;

            return MESSAGES.DEFAULT_HEADER                                      //200
        } else
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;                        //500

    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;                       //500
    }

}

// Exclui o registro de um personagem correspondente ao id
const excluirPersonagem = async function (id) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    try {
        //Verificando existencia do Personagem
        let validarId = await buscarPersonagemId(id);

        //Caso houve um erro na execução do model
        if (validarId.status_code != 200) {
            return validarId                                                    // 400 referente a id / 404 / 500 
        }

        let resultPersonagens = await personagemDAO.setDeleteCharacter(id);
        if (resultPersonagens) {
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

// Função reutilizável para validação de dados de cadastro e atualização do registro
const verificarFalhas = async function (personagem) {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    let invalidInputs = [];
     if (personagem.nome == '' || personagem.nome == undefined || personagem.nome == null || personagem.nome.length > 100)
        invalidInputs.push('Nome');
     if (personagem.papel == '' || personagem.papel == undefined || personagem.papel == null || personagem.papel.length > 40)
        invalidInputs.push('Papel');
    if (personagem.filme_id == '' || personagem.filme_id == undefined || personagem.filme_id == null || isNaN(personagem.filme_id) || personagem.filme_id <= 0)
        invalidInputs.push('Filme_id');
    if (personagem.profissional_id == '' || personagem.profissional_id == undefined || personagem.profissional_id == null || isNaN(personagem.profissional_id) || personagem.profissional_id <= 0)
        invalidInputs.push('Profissional_id');

    //Retornando em caso de campos invalidos
    if (invalidInputs.length) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ` Campos incorretos: ${invalidInputs}`;
        return MESSAGES.ERROR_REQUIRED_FIELDS;                              //400
    }
    else
        return false;

}

module.exports = {
    listarPersonagens,
    buscarPersonagemId,
    listarfilmesIdProfissional,
    listarProfissionaisIdFilme,
    inserirPersonagem,
    atualizarPersonagem,
    excluirPersonagem
}