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
const DEFAULT_MESSAGES = require('../modulo/config_messages.js');

// Retorna uma lista com todos os filmes
const listarFilmes = async function () {
    //Criando um novo objeto para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    // Chama a função do DAO para retornar a lista de Filmes
    let resultFilmes = await filmeDAO.getSelectAllMovies();
    
    if (resultFilmes){
        if (resultFilmes.length > 0){
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status; //Isso aqui é genial
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
            MESSAGES.DEFAULT_HEADER.items.filmes = resultFilmes;
            return MESSAGES.DEFAULT_HEADER;
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