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


/*************************************** MENSAGENS DE ERRO ****************************************/

const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    message: 'Não foram encontrados dados de retorno'
}

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição devido a erros internos no servidor (Controller)'
}
const ERROR_INTERNAL_SERVER_MODEL = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição devido a erros internos no servidor (Modelagem de dados)'
}

const ERROR_REQUIRED_FIELDS = {
    status: false,
    status_code: 400,
    message: 'Não foi possível processar a requisição pois existem campos obrigatórios que devem ser encaminhados e atendidos conforme documentação'
}



module.exports = {
    DEFAULT_HEADER,
    SUCCESS_REQUEST,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_REQUIRED_FIELDS

}