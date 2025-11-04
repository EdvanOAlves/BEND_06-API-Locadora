/**************************************************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de rotas de formatos audiovisuais
 * Autor: Edvan Alves
 * Data: 01/11/2025
 * Versão: 1.0.11.25
 **************************************************************************************************/

//Import das dependências
const express = require('express');        // Responsável pela API
const router = express.Router();

const cors = require('cors');              // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser');  // Responsável por gerenciar a chegada dos dados da API com o front


const controllerFormato = require('../controller/formato_audiovisual/controller_formato.js');

//Criando objeto especialista no formato JSON para recebimento de dados via POST e PUT
const bodyParserJSON = bodyParser.json();

// *********
// ENDPOINTS
// *********

router.get('/v1/locadora/formato', cors(), async function (request, response) {
   // Chama a função para listar os formatos do DB
   let formato = await controllerFormato.listarFormatos();
   response.status = formato.status_code;
   response.json(formato);
})

router.get('/v1/locadora/formato/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idFormato = request.params.id;

   let formato = await controllerFormato.buscarFormatoId(idFormato);
   response.status = formato.status_code;
   response.json(formato);
})

//Insere um novo formato no DB
router.post('/v1/locadora/formato/', cors(), bodyParserJSON, async function (request, response) {
   //Recebe os dados do body da requisição (Obrigatório no endpoint quando utilizando o bodyParser)
   let dadosBody = request.body;

   //Recebe o tipo de dados da requisição (JSON, XML, etc)
   let contentType = request.headers['content-type']

   //Chama a função da controller para inserir o novo formato, encaminhando os dados e tipo de conteúdo
   let formato = await controllerFormato.inserirFormato(dadosBody, contentType);
   response.status(formato.status_code);
   response.json(formato);
})

// Atualiza no DB o formato correspondente ao id
router.put('/v1/locadora/formato/:id', cors(), bodyParserJSON, async function (request, response) {
   //Recebe o ID do formato
   let idFormato = request.params.id;

   //Recebe os dados a serem atualizados
   let dadosBody = request.body;

   //Recebe o tipo de dados da requisição (JSON, XML, etc)
   let contentType = request.headers['content-type'];

   //Chamando função para atualizar o formato, encaminhando os dados, id e content type
   let formato = await controllerFormato.atualizarFormato(dadosBody, idFormato, contentType);

   response.status(formato.status_code);
   response.json(formato);
})

router.delete('/v1/locadora/formato/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idFormato = request.params.id;

   // Chama a função para excluir o formato do DB
   let formato = await controllerFormato.excluirFormato(idFormato);
   response.status = formato.status_code;
   response.json(formato);
})


module.exports = router