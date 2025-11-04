/**************************************************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de rotas de gêneros
 * Autor: Edvan Alves
 * Data: 01/11/2025
 * Versão: 1.0.11.25
 **************************************************************************************************/

//Import das dependências
const express = require('express');
const router = express.Router();

const cors = require('cors');   //Reponsável pelas permissões da API
const bodyParser = require('body-parser'); // Responsável por gerenciar a chegada dos dados da API com o front-end

const controllerGenero = require('../controller/genero/controller_genero.js');

//Criando objeto especialista no formato JSON, para lidar com dados recebidos via POST E PUT
const bodyParserJSON = bodyParser.json();


// *********
// ENDPOINTS
// *********

//-------------------------------- ROTAS GÊNERO --------------------------------//
router.get('/v1/locadora/genero', cors(), async function (request, response) {
   // Chama a função para listar os generos do DB
   let genero = await controllerGenero.listarGeneros();
   response.status = genero.status_code;
   response.json(genero);
})

router.get('/v1/locadora/genero/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idGenero = request.params.id;

   let genero = await controllerGenero.buscarGeneroId(idGenero);
   response.status = genero.status_code;
   response.json(genero);
})

//Insere um novo genero no DB
router.post('/v1/locadora/genero/', cors(), bodyParserJSON, async function (request, response) {
   //Recebe os dados do body da requisição (Obrigatório no endpoint quando utilizando o bodyParser)
   let dadosBody = request.body;

   //Recebe o tipo de dados da requisição (JSON, XML, etc)
   let contentType = request.headers['content-type']

   //Chama a função da controller para inserir o novo genero, encaminhando os dados e tipo de conteúdo
   let genero = await controllerGenero.inserirGenero(dadosBody, contentType);
   response.status(genero.status_code);
   response.json(genero);
})

// Atualiza no DB o genero correspondente ao id
router.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async function (request, response) {
   //Recebe o ID do genero
   let idGenero = request.params.id;

   //Recebe os dados a serem atualizados
   let dadosBody = request.body;

   //Recebe o tipo de dados da requisição (JSON, XML, etc)
   let contentType = request.headers['content-type'];

   //Chamando função para atualizar o genero, encaminhando os dados, id e content type
   let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType);

   response.status(genero.status_code);
   response.json(genero);
})

router.delete('/v1/locadora/genero/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idGenero = request.params.id;

   // Chama a função para excluir o genero do DB
   let genero = await controllerGenero.excluirGenero(idGenero);
   response.status = genero.status_code;
   response.json(genero);

})

module.exports = router