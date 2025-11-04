/**************************************************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de rotas de idiomas
 * Autor: Edvan Alves
 * Data: 01/11/2025
 * Versão: 1.0.11.25
 **************************************************************************************************/

//Import das dependências
const express = require('express');        // Responsável pela API
const router = express.Router();

const cors = require('cors');              // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser');  // Responsável por gerenciar a chegada dos dados da API com o front


const controllerIdioma = require('../controller/idioma/controller_idioma.js');

//Criando objeto especialista no formato JSON para recebimento de dados via POST e PUT
const bodyParserJSON = bodyParser.json();

// *********
// ENDPOINTS
// *********

router.get('/v1/locadora/idioma', cors(), async function (request, response) {
   // Chama a função para listar os idiomas do DB
   let idioma = await controllerIdioma.listarIdiomas();
   response.status = idioma.status_code;
   response.json(idioma);
})

router.get('/v1/locadora/idioma/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idIdioma = request.params.id;

   let idioma = await controllerIdioma.buscarIdiomaId(idIdioma);
   response.status = idioma.status_code;
   response.json(idioma);
})

//Insere um novo idioma no DB
router.post('/v1/locadora/idioma/', cors(), bodyParserJSON, async function (request, response) {
   //Recebe os dados do body da requisição (Obrigatório no endpoint quando utilizando o bodyParser)
   let dadosBody = request.body;

   //Recebe o tipo de dados da requisição (JSON, XML, etc)
   let contentType = request.headers['content-type']

   //Chama a função da controller para inserir o novo idioma, encaminhando os dados e tipo de conteúdo
   let idioma = await controllerIdioma.inserirIdioma(dadosBody, contentType);
   response.status(idioma.status_code);
   response.json(idioma);
})

// Atualiza no DB o idioma correspondente ao id
router.put('/v1/locadora/idioma/:id', cors(), bodyParserJSON, async function (request, response) {
   //Recebe o ID do idioma
   let idIdioma = request.params.id;

   //Recebe os dados a serem atualizados
   let dadosBody = request.body;

   //Recebe o tipo de dados da requisição (JSON, XML, etc)
   let contentType = request.headers['content-type'];

   //Chamando função para atualizar o idioma, encaminhando os dados, id e content type
   let idioma = await controllerIdioma.atualizarIdioma(dadosBody, idIdioma, contentType);

   response.status(idioma.status_code);
   response.json(idioma);
})

router.delete('/v1/locadora/idioma/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idIdioma = request.params.id;

   // Chama a função para excluir o idioma do DB
   let idioma = await controllerIdioma.excluirIdioma(idIdioma);
   response.status = idioma.status_code;
   response.json(idioma);
})

module.exports = router