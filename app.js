/**************************************************************************************************
 * Objetivo: Atividade exemplo de API com CRUD
 * Autor: Edvan Alves
 * Data: 01/10/2025
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