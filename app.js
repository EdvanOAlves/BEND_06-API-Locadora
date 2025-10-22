/**************************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API da locadora de Filmes
 * Autor: Edvan Alves
 * Data: 07/10/2025
 * Versão: 1.0.10.25
 **************************************************************************************************/

/**************************************************************************************************/
//COMANDOS UTILIZADOS

/*
   //Instalação de packages
   npm install express --save
   npm install cors --save
   npm install body-parser --save
   npm install prisma --save          ->Instalar o prisma(conexão com o Database)
   npm install @prisma/client --save  ->Instalar o cliente do Prisma(Executar scripts SQL no DB)
   
     //Comandos do prisma
        npx prisma init                     -> Prompt de comando para inicializar o prisma no projeto
        npx prisma migrate dev              -> Sincroniza o primsa e DB, precisa de um npx prisma migrate reset
        npx prisma migrate reset            -> Vai resetar o banco de dados direcionado no schema.prisma (Cuidado)

        npx prisma generate                 -> Sincroniza o prisma e o DB, geralmente utilizado para rodar o projeto em um pc novo
*/


/**************************************************************************************************/
//BIBLIOTECAS UTILIZADAS
/**************************************************************************************************/

//Import das dependências da API
const express = require('express');        // Responsável pela API
const cors = require('cors');              // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser');  // Responsável por gerenciar a chegada dos dados da API com o front

//Criando objeto especialista no formato JSON para recebimento de dados via POST e PUT
const bodyParserJSON = bodyParser.json();

//Import do arquivo de Funções
const dados = require('./controller/filme/controller_filme.js');

// Para definir a porta como do servidor atual ou colocamos uma porta local(8080)
const PORT = process.PORT || 8080
//process.PORT é essencial para nossa API rodar em servidor, ele que vai escolher a porta
//|| 8080 É nossa configuração padrão, caso não exista um servidor para decidir essa porta, importante para uso local


// Criando uma instância de uma classe do Express
const app = express();

//Configuração de permissões
app.use((request, response, next) => {
   response.header('Access-Controll-Allow-Origin', '*'); //Servidor de origem da API, pelo '*' é declarado que é acesso público
   response.header('Access-Controll-Allow-Methods', 'GET'); //Verbos permitidos na API, se for colocar o Post ficaria 'GET, POST'

   //Carrega as configurações no CORS da API
   app.use(cors());
   next()// Próximo, carregar os próximos endpoints
})

//Import das controllers
const controllerFilme = require('./controller/filme/controller_filme.js')
const controllerGenero = require('./controller/genero/controller_genero.js')

/**************************************************************************************************/
// ENDPOINTS
/**************************************************************************************************/



//-------------------------------- ROTAS FILMES --------------------------------//



app.get('/v1/locadora/filme', cors(), async function (request, response) {
   // Chama a função para listar os filmes do DB
   let filme = await controllerFilme.listarFilmes();
   response.status = filme.status_code;
   response.json(filme);
})

app.get('/v1/locadora/filme/:id', cors(), async function (request, response) {
   // Chama a função para buscar o filme por Id

   // Recebe o ID encaminhado via parâmetro na requisição
   const idFilme = request.params.id;

   // Chamando a função para realizar a consulta no DB
   let filme = await controllerFilme.buscarFilmeId(idFilme);
   response.status = filme.status_code;
   response.json(filme);
})
//Boa prática: Quando passamos primary Key é interessante colocar essa PK como parâmetro, itens de filtro são parâmetros de rota mesmo

//Insere um novo filme no DB
app.post('/v1/locadora/filme/', cors(), bodyParserJSON, async function (request, response) {
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
app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function (request, response) {
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

app.delete('/v1/locadora/filme/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idFilme = request.params.id;


   // Chama a função para excluir o filme do DB
   let filme = await controllerFilme.excluirFilme(idFilme);
   response.status = filme.status_code;
   response.json(filme);

})


//-------------------------------- ROTAS GÊNERO --------------------------------//
app.get('/v1/locadora/genero', cors(), async function (request, response) {
   // Chama a função para listar os generos do DB
   let genero = await controllerGenero.listarGeneros();
   response.status = genero.status_code;
   response.json(genero);
})

app.get('/v1/locadora/genero/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idGenero = request.params.id;

   let genero = await controllerGenero.buscarGeneroId(idGenero);
   response.status = genero.status_code;
   response.json(genero);
})

//Insere um novo genero no DB
app.post('/v1/locadora/genero/', cors(), bodyParserJSON, async function (request, response) {
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
app.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async function (request, response) {
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

app.delete('/v1/locadora/genero/:id', cors(), async function (request, response) {
   //Recebe o ID encaminhado via parâmetro na requisição
   const idGenero = request.params.id;

   // Chama a função para excluir o genero do DB
   let genero = await controllerGenero.excluirGenero(idGenero);
   response.status = genero.status_code;
   response.json(genero);

})



app.listen(PORT, function () {
   console.log('Hello world! \n API está operante, escutante e funcionante!')
   console.log('Para abrir localmente é só ir em http://localhost:8080/v1/locadora/filme')
})