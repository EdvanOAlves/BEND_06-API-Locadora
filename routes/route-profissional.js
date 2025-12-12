/**************************************************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de rotas de profissionais
 * Autor: Edvan Alves
 * Data: 10/12/2025
 * Versão: 1.0.12.25
 **************************************************************************************************/

//Import das dependências
const express = require('express');        // Responsável pela API
const router = express.Router();

const cors = require('cors');              // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser');  // Responsável por gerenciar a chegada dos dados da API com o front


const controllerProfissional = require('../controller/profissional/controller_profissional.js');

//Criando objeto especialista no formato JSON para recebimento de dados via POST e PUT
const bodyParserJSON = bodyParser.json();

// *********
// ENDPOINTS
// *********

router.get('/v1/locadora/profissional/', cors(), async function (request, response) {
   // Chama a função para listar os profissionais do DB
   let profissional = await controllerProfissional.listarProfissionais();
   response.status = profissional.status_code;
   response.json(profissional);
})

// Chama a função para buscar o profissional por Id
router.get('/v1/locadora/profissional/:id', cors(), async function (request, response) {

   // Recebe o ID encaminhado via parâmetro na requisição
   const idProfissional = request.params.id;

   // Chamando a função para realizar a consulta no DB
   let profissional = await controllerProfissional.buscarProfissionalId(idProfissional);
   response.status = profissional.status_code;
   response.json(profissional);
})
//Boa prática: Quando passamos primary Key é interessante colocar essa PK como parâmetro, itens de filtro são parâmetros de rota mesmo

//Insere um novo profissional no DB
router.post('/v1/locadora/profissional/', cors(), bodyParserJSON, async function (request, response) {
   //Recebe os dados do body da requisição (Obrigatório no endpoint quando utilizando o bodyParser)
   let dadosBody = request.body;

   //Recebe o tipo de dados da requisição (JSON, XML, etc)
   let contentType = request.headers['content-type']

   //Chama a função da controller para inserir o novo profissional, encaminhando os dados e tipo de conteúdo
   let profissional = await controllerProfissional.inserirProfissional(dadosBody, contentType);
   response.status(profissional.status_code);
   response.json(profissional);
})

// Atualiza no DB o profissional correspondente ao id
router.put('/v1/locadora/profissional/:id', cors(), bodyParserJSON, async function (request, response) {
   //Recebe o ID do profissional
   let idProfissional = request.params.id;

   //Recebe os dados a serem atualizado
   let dadosBody = request.body;

   //Recebe o tipo de dados da requisição (JSON, XML, etc)
   let contentType = request.headers['content-type'];

   //Chamando função para atualizar o profissional, encaminhando os dados, id e content type
   let profissional = await controllerProfissional.atualizarProfissional(dadosBody, idProfissional, contentType);

   response.status(profissional.status_code);
   response.json(profissional);
})

router.delete('/v1/locadora/profissional/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idprofissional = request.params.id;


   // Chama a função para excluir o profissional do DB
   let profissional = await controllerProfissional.excluirProfissional(idProfissional);
   response.status = profissional.status_code;
   response.json(profissional);

})

module.exports = router