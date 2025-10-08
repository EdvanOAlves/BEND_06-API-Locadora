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





module.exports = {
    DEFAULT_HEADER,
    SUCCESS_REQUEST
}