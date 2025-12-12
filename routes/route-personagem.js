/**************************************************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de rotas de filmes x profissionais (personagem)
 * Autor: Edvan Alves
 * Data: 10/12/2025
 * Versão: 1.0.12.25
 **************************************************************************************************/

//Import das dependências
const express = require('express');
const router = express.Router();

const cors = require('cors');   //Reponsável pelas permissões da API
const bodyParser = require('body-parser'); // Responsável por gerenciar a chegada dos dados da API com o front-end

const controllerPersonagem = require('../controller/profissional/controller_personagem');

//Criando objeto especialista no formato JSON, para lidar com dados recebidos via POST E PUT
const bodyParserJSON = bodyParser.json();


// *********
// ENDPOINTS
// *********

//-------------------------------- ROTAS GÊNERO --------------------------------//
// Listar todos
router.get('/v1/locadora/personagem', cors(), async function (request, response) {
   // Chama a função para listar os personagens do DB
   let personagem = await controllerPersonagem.listarFilmesGeneros();
   response.status = personagem.status_code;
   response.json(personagem);
})

//Listar personagem por id
router.get('/v1/locadora/personagem/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idPersonagem = request.params.id;

   let personagem = await controllerPersonagem.buscarPersonagemId(idPersonagem);
   response.status = personagem.status_code;
   response.json(personagem);
})

// Listar filmes por id de profissional
router.get('/v1/locadora/personagembyprofissional/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idProfissional = request.params.id;

   let personagem = await controllerPersonagem.listarfilmesIdProfissional(idProfissional);
   response.status = personagem.status_code;
   response.json(personagem);
})

// Listar profissionais por id de filme
router.get('/v1/locadora/personagembymovie/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idFilme = request.params.id;

   let personagem = await controllerPersonagem.listarProfissionaisIdFilme(idFilme);
   response.status = personagem.status_code;
   response.json(personagem);
})

//Insere um novo personagem no DB
router.post('/v1/locadora/personagem/', cors(), bodyParserJSON, async function (request, response) {
   //Recebe os dados do body da requisição (Obrigatório no endpoint quando utilizando o bodyParser)
   let dadosBody = request.body;

   //Recebe o tipo de dados da requisição (JSON, XML, etc)
   let contentType = request.headers['content-type']

   //Chama a função da controller para inserir o novo personagem, encaminhando os dados e tipo de conteúdo
   let personagem = await controllerPersonagem.inserirPersonagem(dadosBody, contentType);
   response.status(personagem.status_code);
   response.json(personagem);
})

// Atualiza no DB o personagem correspondente ao id
router.put('/v1/locadora/personagem/:id', cors(), bodyParserJSON, async function (request, response) {
   //Recebe o ID do genero
   let idPersonagem = request.params.id;

   //Recebe os dados a serem atualizados
   let dadosBody = request.body;

   //Recebe o tipo de dados da requisição (JSON, XML, etc)
   let contentType = request.headers['content-type'];

   //Chamando função para atualizar o personagem, encaminhando os dados, id e content type
   let personagem = await controllerPersonagem.atualizarPersonagem(dadosBody, idPersonagem, contentType);

   response.status(genero.status_code);
   response.json(personagem);
})

// Para deletar um personagem
router.delete('/v1/locadora/personagem/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idPersonagem = request.params.id;

   // Chama a função para excluir o genero do DB
   let personagem = await controllerPersonagem.excluirPersonagem(idPersonagem);
   response.status = personagem.status_code;
   response.json(personagem);

})

module.exports = router