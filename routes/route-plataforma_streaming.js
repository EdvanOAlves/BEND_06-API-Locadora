/**************************************************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de rotas de plataformas de streaming
 * Autor: Edvan Alves
 * Data: 01/11/2025
 * Versão: 1.0.11.25
 **************************************************************************************************/

//Import das dependências
const express = require('express');        // Responsável pela API
const router = express.Router();

const cors = require('cors');              // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser');  // Responsável por gerenciar a chegada dos dados da API com o front


const controllerPlataforma = require('../controller/plataforma_streaming/controller_plataforma_streaming.js');

//Criando objeto especialista no formato JSON para recebimento de dados via POST e PUT
const bodyParserJSON = bodyParser.json();

// *********
// ENDPOINTS
// *********

router.get('/v1/locadora/plataforma', cors(), async function (request, response) {
   // Chama a função para listar as plataformas de streaming do DB
   let plataforma = await controllerPlataforma.listarPlataformas();
   response.status = plataforma.status_code;
   response.json(plataforma);
})

router.get('/v1/locadora/plataforma/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idPlataforma = request.params.id;

   let plataforma = await controllerPlataforma.buscarPlataformaId(idPlataforma);
   response.status = plataforma.status_code;
   response.json(plataforma);
})

//Insere uma nova plataforma no DB
router.post('/v1/locadora/plataforma/', cors(), bodyParserJSON, async function (request, response) {
   //Recebe os dados do body da requisição (Obrigatório no endpoint quando utilizando o bodyParser)
   let dadosBody = request.body;

   //Recebe o tipo de dados da requisição (JSON, XML, etc)
   let contentType = request.headers['content-type']

   //Chama a função da controller para inserir a nova plataforma, encaminhando os dados e tipo de conteúdo
   let plataforma = await controllerPlataforma.inserirPlataforma(dadosBody, contentType);
   response.status(plataforma.status_code);
   response.json(plataforma);
})

// Atualiza no DB a plataforma correspondente ao id
router.put('/v1/locadora/plataforma/:id', cors(), bodyParserJSON, async function (request, response) {
   //Recebe o ID da plataforma
   let idPlataforma = request.params.id;

   //Recebe os dados a serem atualizados
   let dadosBody = request.body;

   //Recebe o tipo de dados da requisição (JSON, XML, etc)
   let contentType = request.headers['content-type'];

   //Chamando função para atualizar a plataforma de streaming, encaminhando os dados, id e content type
   let plataforma = await controllerPlataforma.atualizarPlataforma(dadosBody, idPlataforma, contentType);

   response.status(plataforma.status_code);
   response.json(plataforma);
})

router.delete('/v1/locadora/plataforma/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idPlataforma = request.params.id;

   // Chama a função para excluir a plataforma de Streaming do DB
   let plataforma = await controllerPlataforma.excluirPlataforma(idPlataforma);
   response.status = plataforma.status_code;
   response.json(plataforma);
})

module.exports = router