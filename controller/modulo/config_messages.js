/**************************************************************************************************
 * Objetivo: Arquivo responsável pelos padrões de mensagens que o projeto irá realizar
 *           Sempre no formato JSON (Mensagens de erro, sucesso, etc)
 * Autor: Edvan Alves
 * Data: 07/10/2025
 * Versão: 1.0.10.25
 **************************************************************************************************/

//Armazenando a data da execução
const today = new Date();

/*************************************** MENSAGENS PADRONIZADAS ***********************************/
const DEFAULT_HEADER = {
    development: 'Edvan Alves',
    api_description: 'API para manipulação de dados de filmes',
    status: Boolean,
    status_code: Number,
    request_date: today.toLocaleString(),
    items: {}
}


/*************************************** MENSAGENS DE SUCESSO *************************************/
const SUCCESS_REQUEST = {
    status: true,
    status_code: 200,
    message: 'Requisição bem sucedida!'
}

const SUCCESS_UPDATED_ITEM = {
    status: true,
    status_code: 200,
    message: 'Item atualizado com sucesso!'
}

const SUCCESS_DELETED_ITEM = {
    status: true,
    status_code: 200,
    message: 'Item deletado com sucesso!'
}

const SUCCESS_CREATED_ITEM ={
    status: true,
    status_code: 201,
    message: 'Item criado com sucesso!'
}


/*************************************** MENSAGENS DE ERRO ****************************************/
const ERROR_REQUIRED_FIELDS = {
    status: false,
    status_code: 400,
    message: 'Não foi possível processar a requisição pois existem campos obrigatórios que devem ser encaminhados e atendidos conforme documentação.'
}

const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    message: 'Não foram encontrados dados de retorno.'
}

const ERROR_CONTENT_TYPE = {
    status: false,
    status_code: 415,
    message: 'Não foi possível processar a requisição, pois o tipo de dados enviado no corpo da requisição deve ser JSON.'
}

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição devido a erros internos no servidor (Controller).'
}
const ERROR_INTERNAL_SERVER_MODEL = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição devido a erros internos no servidor (Model).'
}

module.exports = {
    DEFAULT_HEADER,
    SUCCESS_REQUEST,
    SUCCESS_UPDATED_ITEM,
    SUCCESS_DELETED_ITEM,
    SUCCESS_CREATED_ITEM,
    ERROR_REQUIRED_FIELDS,
    ERROR_NOT_FOUND,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL

}