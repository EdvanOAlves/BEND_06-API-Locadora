/**************************************************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de rotas de filmes x gêneros
 * Autor: Edvan Alves
 * Data: 10/12/2025
 * Versão: 1.0.12.25
 **************************************************************************************************/

//Import das dependências
const express = require('express');
const router = express.Router();

const cors = require('cors');   //Reponsável pelas permissões da API
const bodyParser = require('body-parser'); // Responsável por gerenciar a chegada dos dados da API com o front-end

const controllerFilmeGenero = require('../controller/filme/controller_filme_genero.js');

//Criando objeto especialista no formato JSON, para lidar com dados recebidos via POST E PUT
const bodyParserJSON = bodyParser.json();


// *********
// ENDPOINTS
// *********

//-------------------------------- ROTAS GÊNERO --------------------------------//
// Listar todos
router.get('/v1/locadora/filmegenero', cors(), async function (request, response) {
   // Chama a função para listar os filmes x generos do DB
   let filmeGenero = await controllerFilmeGenero.listarFilmesGeneros();
   response.status = filmeGenero.status_code;
   response.json(filmeGenero);
})

//Listar filme x genero por id
router.get('/v1/locadora/filmegenero/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idFilmeGenero = request.params.id;

   let filmeGenero = await controllerFilmeGenero.buscarFilmeGeneroId(idFilmeGenero);
   response.status = filmeGenero.status_code;
   response.json(filmeGenero);
})

// Listar filmes por id de genero
router.get('/v1/locadora/filmegenerobygenre/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idGenero = request.params.id;

   let filmeGenero = await controllerFilmeGenero.listarFilmesIdGenero(idGenero);
   response.status = filmeGenero.status_code;
   response.json(filmeGenero);
})

// Listar generos por id de filme
router.get('/v1/locadora/filmegenerobymovie/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idFilme = request.params.id;

   let filmeGenero = await controllerFilmeGenero.listarFilmesIdGenero(idFilme);
   response.status = filmeGenero.status_code;
   response.json(filmeGenero);
})

//Insere um novo filme x genero no DB
router.post('/v1/locadora/filmegenero/', cors(), bodyParserJSON, async function (request, response) {
   //Recebe os dados do body da requisição (Obrigatório no endpoint quando utilizando o bodyParser)
   let dadosBody = request.body;

   //Recebe o tipo de dados da requisição (JSON, XML, etc)
   let contentType = request.headers['content-type']

   //Chama a função da controller para inserir o novo genero, encaminhando os dados e tipo de conteúdo
   let filmeGenero = await controllerFilmeGenero.inserirFilmeGenero(dadosBody, contentType);
   response.status(filmeGenero.status_code);
   response.json(filmeGenero);
})

// Atualiza no DB o filme x genero correspondente ao id
router.put('/v1/locadora/filmegenero/:id', cors(), bodyParserJSON, async function (request, response) {
   //Recebe o ID do genero
   let idFilmeGenero = request.params.id;

   //Recebe os dados a serem atualizados
   let dadosBody = request.body;

   //Recebe o tipo de dados da requisição (JSON, XML, etc)
   let contentType = request.headers['content-type'];

   //Chamando função para atualizar o filmexgenero, encaminhando os dados, id e content type
   let filmeGenero = await controllerFilmeGenero.atualizarFilmeGenero(dadosBody, idFilmeGenero, contentType);

   response.status(filmeGenero.status_code);
   response.json(filmeGenero);
})

router.delete('/v1/locadora/filmegenero/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idFilmeGenero = request.params.id;

   // Chama a função para excluir o genero do DB
   let filmeGenero = await controllerFilmeGenero.excluirFilmeGenero(idFilmeGenero);
   response.status = filmeGenero.status_code;
   response.json(filmeGenero);

})

module.exports = router