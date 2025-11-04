/**************************************************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de rotas de classificações indicativas
 * Autor: Edvan Alves
 * Data: 01/11/2025
 * Versão: 1.0.11.25
 **************************************************************************************************/

//Import das dependências
const express = require('express');        // Responsável pela API
const router = express.Router();

const cors = require('cors');              // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser');  // Responsável por gerenciar a chegada dos dados da API com o front


const controllerClassificacao = require('../controller/classificacao_indicativa/controller_classificacao_indicativa.js');

//Criando objeto especialista no formato JSON para recebimento de dados via POST e PUT
const bodyParserJSON = bodyParser.json();

// *********
// ENDPOINTS
// *********

router.get('/v1/locadora/classificacao', cors(), async function (request, response) {
   // Chama a função para listar as classificações indicativas do DB
   let classificacao = await controllerClassificacao.listarClassificacoes();
   response.status = classificacao.status_code;
   response.json(classificacao);
})

router.get('/v1/locadora/classificacao/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idClassificacao = request.params.id;

   let classificacao = await controllerClassificacao.buscarClassificacaoId(idClassificacao);
   response.status = classificacao.status_code;
   response.json(classificacao);
})

//Insere uma nova classificação no DB
router.post('/v1/locadora/classificacao/', cors(), bodyParserJSON, async function (request, response) {
   //Recebe os dados do body da requisição (Obrigatório no endpoint quando utilizando o bodyParser)
   let dadosBody = request.body;

   //Recebe o tipo de dados da requisição (JSON, XML, etc)
   let contentType = request.headers['content-type']

   //Chama a função da controller para inserir a nova classificação, encaminhando os dados e tipo de conteúdo
   let classificacao = await controllerClassificacao.inserirClassificacao(dadosBody, contentType);
   response.status(classificacao.status_code);
   response.json(classificacao);
})

// Atualiza no DB a classificação correspondente ao id
router.put('/v1/locadora/classificacao/:id', cors(), bodyParserJSON, async function (request, response) {
   //Recebe o ID da classificacao
   let idClassificacao = request.params.id;

   //Recebe os dados a serem atualizados
   let dadosBody = request.body;

   //Recebe o tipo de dados da requisição (JSON, XML, etc)
   let contentType = request.headers['content-type'];

   //Chamando função para atualizar a classificação indicativa, encaminhando os dados, id e content type
   let classificacao = await controllerClassificacao.atualizarClassificacao(dadosBody, idClassificacao, contentType);

   response.status(classificacao.status_code);
   response.json(classificacao);
})

router.delete('/v1/locadora/classificacao/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idClassificacao = request.params.id;

   // Chama a função para excluir a classificação indicativa do DB
   let classificacao = await controllerClassificacao.excluirClassificacao(idClassificacao);
   response.status = classificacao.status_code;
   response.json(classificacao);
})

module.exports = router