/**************************************************************************************************
 * Objetivo: Arquivo responsável pelos padrões de mensagens que o projeto irá realizar
 *           Sempre no formato JSON (Mensagens de erro, sucesso, etc)
 * Autor: Edvan Alves
 * Data: 07/10/2025
 * Versão: 1.0.10.25
 **************************************************************************************************/

//Armazenando a data da execução
const today = Date.now();

/*************************************** MENSAGENS PADRONIZADAS ***********************************/
const MESSAGE_HEADER = {
    development: 'Edvan Alves',
    api_description: 'API para manipulação de dados de filmes',
    status: Boolean,
    status_code: Number,
    request_date: today,
    items: {}
}


/*************************************** MENSAGENS DE SUCESSO *************************************/
const MESSAGE_REQUEST_SUCCESS = {
    status: true,
    status_code: 200,
    message: 'Requisição bem sucedida!'
}


/*************************************** MENSAGENS DE ERRO ****************************************/

module.exports = {
    MESSAGE_HEADER,
    MESSAGE_REQUEST_SUCCESS
}