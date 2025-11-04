/**************************************************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de rotas de filmes
 * Autor: Edvan Alves
 * Data: 01/11/2025
 * Versão: 1.0.11.25
 **************************************************************************************************/

//Import das dependências
const express = require('express');        // Responsável pela API
const router = express.Router();

const cors = require('cors');              // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser');  // Responsável por gerenciar a chegada dos dados da API com o front


const controllerFilme = require('../controller/filme/controller_filme.js');

//Criando objeto especialista no formato JSON para recebimento de dados via POST e PUT
const bodyParserJSON = bodyParser.json();

// *********
// ENDPOINTS
// *********

router.get('/v1/locadora/filme/', cors(), async function (request, response) {
   // Chama a função para listar os filmes do DB
   let filme = await controllerFilme.listarFilmes();
   response.status = filme.status_code;
   response.json(filme);
})

// Chama a função para buscar o filme por Id
router.get('/v1/locadora/filme/:id', cors(), async function (request, response) {

   // Recebe o ID encaminhado via parâmetro na requisição
   const idFilme = request.params.id;

   // Chamando a função para realizar a consulta no DB
   let filme = await controllerFilme.buscarFilmeId(idFilme);
   response.status = filme.status_code;
   response.json(filme);
})
//Boa prática: Quando passamos primary Key é interessante colocar essa PK como parâmetro, itens de filtro são parâmetros de rota mesmo

//Insere um novo filme no DB
router.post('/v1/locadora/filme/', cors(), bodyParserJSON, async function (request, response) {
   //Recebe os dados do body da requisição (Obrigatório no endpoint quando utilizando o bodyParser)
   let dadosBody = request.body;

   //Recebe o tipo de dados da requisição (JSON, XML, etc)
   let contentType = request.headers['content-type']

   //Chama a função da controller para inserir o novo filme, encaminhando os dados e tipo de conteúdo
   let filme = await controllerFilme.inserirFilme(dadosBody, contentType);
   response.status(filme.status_code);
   response.json(filme);
})

// Atualiza no DB o filme correspondente ao id
router.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function (request, response) {
   //Recebe o ID do filme
   let idFilme = request.params.id;

   //Recebe os dados a serem atualizado
   let dadosBody = request.body;

   //Recebe o tipo de dados da requisição (JSON, XML, etc)
   let contentType = request.headers['content-type'];

   //Chamando função para atualizar o filme, encaminhando os dados, id e content type
   let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType);

   response.status(filme.status_code);
   response.json(filme);
})

router.delete('/v1/locadora/filme/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idFilme = request.params.id;


   // Chama a função para excluir o filme do DB
   let filme = await controllerFilme.excluirFilme(idFilme);
   response.status = filme.status_code;
   response.json(filme);

})

module.exports = router