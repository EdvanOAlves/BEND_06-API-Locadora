/**************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model
 * Autor: Edvan Alves
 * Data: 07/10/2025
 * Versão: 1.0.10.25
 **************************************************************************************************/

/**************************************************************************************************/
//COMANDOS UTILIZADOS


/**************************************************************************************************/
//BIBLIOTECAS UTILIZADAS
/**************************************************************************************************/

//Import da model do DAO de Filme
const filmeDAO = require('../../model/DAO/filme.js');

//Import do arquivo de mensagens
const MESSAGES = require('../modulo/config_messages.js');

// Retorna uma lista com todos os filmes
const listarFilmes = async function () {
    let resultFilmes = await filmeDAO.getSelectAllMovies();

    if (resultFilmes){
        if (resultFilmes.lenght > 0){
            MESSAGES.MESSAGE_HEADER.status = MESSAGES.MESSAGE_REQUEST_SUCCESS.status; //Isso aqui é genial
            MESSAGES.MESSAGE_HEADER.status_code = MESSAGES.MESSAGE_REQUEST_SUCCESS.status_code;
            MESSAGES.MESSAGE_HEADER.items.filmes = resultFilmes;
            return MESSAGES.MESSAGE_HEADER;
        }
    }

}

// Retorna um filme correspondente ao id inserido
const buscarFilmeId = async function (id) {

}

// Insere um registro de filme no banco de dados
const inserirFilme = async function(filme){

}

// Atualiza o registro de um filme correspondente ao id 
const atualizarFilme = async function(filme, id){

}

// Exclui o registro de um filme correspondente ao id
const excluirFilme = async function(id){

}

module.exports = {
    listarFilmes
}